// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import * as fs from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootPath = join(__dirname, '../')
const packagePath = join(rootPath, 'packages')
const websiteDocsPath = join(__dirname, 'sharedDocs/packageDocs')

function findDocsDirs(baseDir: string, dirs: string[] = []) {
  const files = fs.readdirSync(baseDir, { withFileTypes: true })
  for (const file of files) {
    if (file.isDirectory()) {
      const dirPath = join(baseDir, file.name)
      if (file.name === 'node_modules' || file.name === 'dist') {
        continue
      }
      if (file.name === 'docs') {
        dirs.push(dirPath)
        break
      } else {
        findDocsDirs(dirPath, dirs)
      }
    }
  }
  return dirs
}

function copyDirectory(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function copyDocsToWebsite() {
  const docsDir = findDocsDirs(packagePath)
  for (const dir of docsDir) {
    const dirPaths = dir.split('/')
    const packageName = dirPaths[dirPaths.length - 2]
    const subDocPath = join(websiteDocsPath, packageName)
    copyDirectory(dir, subDocPath)
  }
}

copyDocsToWebsite()
