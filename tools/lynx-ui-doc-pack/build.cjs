const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const rootDir = path.resolve(__dirname, '..', '..')
const websitePackagePath = path.join(rootDir, 'website', 'package.json')
const websiteDir = path.join(rootDir, 'website')
const pnpmWorkspacePath = path.join(rootDir, 'pnpm-workspace.yaml')
const distDir = path.join(__dirname, 'dist')
const distPackagePath = path.join(distDir, 'package.json')
const websiteExamplesDir = path.join(
  websiteDir,
  'docs',
  'public',
  'lynx-examples',
)
const websiteDocsDir = path.join(websiteDir, 'docs')
const websiteSharedDocsDir = path.join(websiteDir, 'sharedDocs')
const websiteSrcDir = path.join(websiteDir, 'src')
const websiteThemeDir = path.join(websiteDir, 'theme')

const stripQuotes = value => value.replace(/^['"]|['"]$/g, '')

const ensureDir = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

const removeDir = dirPath => {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true })
    } catch (error) {
      void error
      execSync('sleep 1')
      try {
        fs.rmSync(dirPath, { recursive: true, force: true })
      } catch (retryError) {
        void retryError
      }
    }
  }
}

const copyDir = (from, to) => {
  ensureDir(to)
  const entries = fs.readdirSync(from, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(from, entry.name)
    const destPath = path.join(to, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

const copyFile = (from, to) => {
  ensureDir(path.dirname(to))
  fs.copyFileSync(from, to)
}

const moveDir = (from, to) => {
  if (!fs.existsSync(from)) return
  if (fs.existsSync(to)) removeDir(to)
  ensureDir(path.dirname(to))
  try {
    fs.renameSync(from, to)
  } catch {
    copyDir(from, to)
    removeDir(from)
  }
}

const prepareWebsiteSharedDocs = () => {
  const prepackScriptPath = path.join(websiteDir, 'prepackScript.ts')
  if (!fs.existsSync(prepackScriptPath)) return
  execSync('pnpm tsx prepackScript.ts', { cwd: websiteDir, stdio: 'inherit' })
}

const generateLynxExamples = () => {
  removeDir(websiteExamplesDir)
  execSync('pnpm run prepare:lynx-example', {
    cwd: websiteDir,
    stdio: 'inherit',
  })
}

const syncWebsiteToDist = () => {
  if (fs.existsSync(websiteDocsDir)) {
    copyDir(websiteDocsDir, path.join(distDir, 'docs'))
  }
  if (fs.existsSync(websiteSharedDocsDir)) {
    copyDir(websiteSharedDocsDir, path.join(distDir, 'sharedDocs'))
  }
  if (fs.existsSync(websiteSrcDir)) {
    copyDir(websiteSrcDir, path.join(distDir, 'src'))
  }
  if (fs.existsSync(websiteThemeDir)) {
    copyDir(websiteThemeDir, path.join(distDir, 'theme'))
  }

  const websiteRootFiles = [
    'components.json',
    'global.d.ts',
    'i18n.json',
    'postcss.config.cjs',
    'replaceLinksMap.js',
    'route.json',
    'rspress.config.ts',
    'tailwind.config.js',
    'tsconfig.json',
  ]

  for (const fileName of websiteRootFiles) {
    const srcPath = path.join(websiteDir, fileName)
    if (fs.existsSync(srcPath)) {
      copyFile(srcPath, path.join(distDir, fileName))
    }
  }
}

const parseCatalogs = yamlText => {
  const lines = yamlText.split(/\r?\n/)
  const catalog = {}
  const catalogs = {}
  let section = null
  let currentCatalog = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    if (trimmed === 'catalog:') {
      section = 'catalog'
      currentCatalog = null
      continue
    }

    if (trimmed === 'catalogs:') {
      section = 'catalogs'
      currentCatalog = null
      continue
    }

    if (section === 'catalog') {
      if (!line.startsWith('  ')) continue
      const rest = line.slice(2)
      const colonIndex = rest.indexOf(':')
      if (colonIndex === -1) continue
      const name = stripQuotes(rest.slice(0, colonIndex).trim())
      const version = stripQuotes(rest.slice(colonIndex + 1).trim())
      if (!name || !version) continue
      catalog[name] = version
      continue
    }

    if (section === 'catalogs') {
      if (line.startsWith('  ') && !line.startsWith('    ')) {
        const rest = line.slice(2).trim()
        if (rest.endsWith(':')) {
          currentCatalog = rest.slice(0, -1).trim()
          if (currentCatalog) catalogs[currentCatalog] = {}
        }
        continue
      }

      if (line.startsWith('    ') && currentCatalog) {
        const rest = line.slice(4)
        const colonIndex = rest.indexOf(':')
        if (colonIndex === -1) continue
        const name = stripQuotes(rest.slice(0, colonIndex).trim())
        const version = stripQuotes(rest.slice(colonIndex + 1).trim())
        if (!name || !version) continue
        catalogs[currentCatalog][name] = version
      }
    }
  }

  return { catalog, catalogs }
}

const resolveCatalogValue = (name, value, catalogsInfo) => {
  if (!value.startsWith('catalog:')) return value

  const suffix = value.slice('catalog:'.length)
  const { catalog, catalogs } = catalogsInfo

  if (!suffix) {
    if (catalog[name]) return catalog[name]
    throw new Error(`Missing catalog version for ${name}`)
  }

  if (catalogs[suffix]?.[name]) return catalogs[suffix][name]
  if (catalog[name]) return catalog[name]
  throw new Error(`Missing catalog version for ${name} in ${suffix}`)
}

const websitePackage = JSON.parse(fs.readFileSync(websitePackagePath, 'utf-8'))
const catalogsInfo = parseCatalogs(
  fs.readFileSync(pnpmWorkspacePath, 'utf-8'),
)

const dependencies = { ...(websitePackage.dependencies || {}) }
for (const [name, version] of Object.entries(dependencies)) {
  dependencies[name] = resolveCatalogValue(name, version, catalogsInfo)
}

for (const [name, version] of Object.entries(dependencies)) {
  if (version.startsWith('catalog:')) {
    throw new Error(`Unresolved catalog entry for ${name}`)
  }
}

removeDir(distDir)
ensureDir(distDir)

prepareWebsiteSharedDocs()
generateLynxExamples()
syncWebsiteToDist()

moveDir(path.join(distDir, 'public'), path.join(distDir, 'docs', 'public'))

const outputPackage = {
  name: '@lynx-js/lynx-ui-doc',
  version: websitePackage.version || '0.0.0',
  description: 'Open source documentation content for Lynx UI',
  dependencies,
  license: websitePackage.license || 'ISC',
}

fs.writeFileSync(
  distPackagePath,
  `${JSON.stringify(outputPackage, null, 2)}\n`,
)
