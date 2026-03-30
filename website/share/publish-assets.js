// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

// 打包 docs/public/assets 为 zip 文件
// 返回 zip 文件的 url
const assetsDir = path.join(__dirname, '../docs/public/assets')
const zipFile = path.join(__dirname, '../docs/public/assets.zip')
const filename = path.basename(zipFile)
const downloadUrlFile = path.join(__dirname, './download-url.txt')

const tosAccess = process.env.TOS_ACCESS
const tosUploadBaseUrl = process.env.TOS_UPLOAD_BASE_URL
const tosSaveBaseUrl = process.env.TOS_SAVE_BASE_URL

if (!tosAccess) {
  throw new Error('TOS_ACCESS is not set')
}
console.log('tosUploadBaseUrl', tosUploadBaseUrl)
console.log('tosSaveBaseUrl', tosSaveBaseUrl)
if (!tosUploadBaseUrl || !tosSaveBaseUrl) {
  throw new Error('TOS_UPLOAD_BASE_URL or TOS_SAVE_BASE_URL is not set')
}

const uploadStaticSource = async (name, filepath) => {
  console.log('start uploadStaticSource', name)
  const tosUrl = `${tosUploadBaseUrl}/lynx-ui-doc/${name}`
  const saveToUrl = `${tosSaveBaseUrl}/lynx-ui-doc/${name}`
  const response = await fetch(tosUrl, {
    method: 'PUT',
    body: await fs.promises.readFile(filepath),
    headers: {
      'X-Tos-Access': tosAccess,
    },
  })
  if (!response.ok) {
    let responseBody
    try {
      responseBody = await response.json()
    } catch (e) {
      // 如果不是 JSON，获取文本
      responseBody = await response.text()
    }
    console.log('responseBody', responseBody)
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  console.log('end uploadStaticSource', response)

  return saveToUrl
}

function zipWithSpawn(sourceDir, outputFile) {
  return new Promise((resolve, reject) => {
    const zip = spawn('zip', ['-r', outputFile, '.'], {
      cwd: sourceDir,
    })

    zip.stdout.on('data', (data) => {
      console.log(`输出: ${data}`)
    })

    zip.stderr.on('data', (data) => {
      console.error(`错误: ${data}`)
    })

    // 添加 error 事件处理
    zip.on('error', (err) => {
      console.error('进程错误:', err)
      reject(new Error(`zip 进程错误: ${err.message}`))
    })

    // 添加 exit 事件处理
    zip.on('exit', (code, signal) => {
      console.log(`进程退出，代码: ${code}, 信号: ${signal}`)
      if (signal) {
        reject(new Error(`进程被信号终止: ${signal}`))
      }
    })
    zip.on('close', (code) => {
      console.log(`进程关闭，代码: ${code}`)
      if (code === 0) {
        resolve(undefined)
      } else {
        reject(new Error(`zip 进程退出，代码 ${code}`))
      }
    })
  })
}

async function checkFileExists(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'X-Tos-Access': tosAccess,
      },
    })

    // 检查状态码
    if (response.status === 404) {
      console.log('文件不存在:', url)
      return false
    }

    if (!response.ok) {
      console.error('请求失败:', {
        status: response.status,
        statusText: response.statusText,
      })
      return false
    }

    console.log('文件存在:', url)
    return true
  } catch (error) {
    console.error('检查文件失败:', error)
    return false
  }
}

const handleZipFile = async () => {
  // 如果 zip 文件存在，则删除
  if (fs.existsSync(zipFile)) {
    fs.rmSync(zipFile, { recursive: true, force: true })
  }
  // 打包 docs/public/assets 为 zip 文件
  await zipWithSpawn(assetsDir, zipFile)

  // 使用版本号和文件大小作为文件名
  // 如果已经有同名的文件，则不用重新上传

  const stats = await fs.promises.stat(zipFile)
  const name = `${process.env.npm_package_version}-${stats.size}-${filename}`
  const saveToUrl = `${tosSaveBaseUrl}/lynx-ui-doc/${name}`
  const exists = await checkFileExists(saveToUrl)
  if (exists) {
    console.log('文件已存在:', saveToUrl)
  } else {
    console.log('文件不存在:', saveToUrl)
    await uploadStaticSource(name, zipFile)
  }

  await fs.promises.writeFile(downloadUrlFile, saveToUrl)

  // 删除 docs/public/ zip 文件
  fs.rmSync(zipFile, { recursive: true, force: true })
  console.log('end handleZipFile', saveToUrl)
}

handleZipFile()
