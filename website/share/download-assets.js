// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const assetsDir = path.join(__dirname, '../docs/public/assets')
const zipFile = path.join(__dirname, '../docs/public/assets.zip')

const downloadUrlFile = path.join(__dirname, './download-url.txt')

const downloadAssets = async (url) => {
  console.log('start downloadAssets', url)
  if (!url) {
    throw new Error('url is empty')
  }
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const zip = await response.arrayBuffer()
  console.log('end downloadAssets', zip)
  fs.writeFileSync(zipFile, Buffer.from(zip))
}

function unzip(zipFile, outputDir) {
  return new Promise((resolve, reject) => {
    console.log('start unzip', zipFile, outputDir)
    const unzip = spawn('unzip', ['-o', zipFile, '-d', outputDir])

    unzip.stdout.on('data', (data) => {
      console.log(`输出: ${data}`)
    })

    unzip.stderr.on('data', (data) => {
      console.error(`错误: ${data}`)
    })

    unzip.on('error', (err) => {
      console.error('进程错误:', err)
      reject(new Error(`zip 进程错误: ${err.message}`))
    })
    unzip.on('exit', (code, signal) => {
      console.log(`进程退出，代码: ${code}, 信号: ${signal}`)
      if (signal) {
        reject(new Error(`进程被信号终止: ${signal}`))
      }
    })
    unzip.on('close', (code) => {
      if (code === 0) {
        resolve(undefined)
      } else {
        reject(new Error(`unzip 进程退出，代码 ${code}`))
      }
    })
  })
}

const handleDownloadAssets = async () => {
  // 先判断是否存在文件夹 如果存在不安装直接跳过
  if (process.env.COVER_ASSETS === 'yes' && fs.existsSync(assetsDir)) {
    console.log('assetsDir exists, skip download')
    return
  }
  const url = await fs.promises.readFile(downloadUrlFile, 'utf-8')
  await downloadAssets(url)
  await unzip(zipFile, assetsDir)
  fs.rmSync(zipFile, { recursive: true, force: true })
  console.log('end handleDownloadAssets')
}

handleDownloadAssets()
