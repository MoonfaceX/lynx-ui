#!/usr/bin/env node
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

/**
 * Replace paths in documents using a mapping list
 * This script uses a mapping list (instead of regular expressions) to replace paths in documents
 * It supports both Markdown (.md, .mdx) and JSON files
 * It also supports JSON files with trailing commas in both objects and arrays
 * Examples of supported JSON formats with trailing commas:
 * - Arrays: ["a", "b", "c",]
 * - Objects: {"a": 1, "b": 2, "c": 3,}
 */

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

/**
 * Path mapping configuration
 * Key: Path prefix to be replaced
 * Value: Target URL after replacement
 *
 * More mappings can be added as needed
 */
const PATH_MAPPINGS = {
  '/api/lynx-api/gesture/index.html':
    'https://lynx.bytedance.net/v3/api/lynx-api/gesture/index.html',

  '/api/lynx-api/gesture/fundamentals/installation.html':
    'https://lynx.bytedance.net/v3/api/lynx-api/gesture/fundamentals/installation.html',

  '/api/lynx-api/main-thread.html':
    'https://lynx.bytedance.net/v3/api/lynx-api/main-thread.html',
}

/**
 * Recursively traverse directory to find all .mdx, .md, and .json files
 * @param {string} dir Directory path
 * @returns {Promise<string[]>} List of file paths
 */
async function findFiles(dir) {
  const files = []
  const entries = await readdir(dir)

  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stats = await stat(fullPath)

    if (stats.isDirectory()) {
      const subFiles = await findFiles(fullPath)
      files.push(...subFiles)
    } else if (
      entry.endsWith('.mdx')
      || entry.endsWith('.md')
      || entry.endsWith('.json')
    ) {
      files.push(fullPath)
    }
  }

  return files
}

/**
 * Normalize a path to handle various formats (relative, absolute)
 * @param {string} urlPath The path to normalize
 * @returns {string} Normalized path
 */
function normalizePath(urlPath) {
  // Remove leading ./ or ../ and ensure it starts with /
  return urlPath.replace(/^(\.\/|\.\.\/)*/g, '').replace(/^\/?/, '/')
}

/**
 * Check if a path should be replaced based on the mappings
 * @param {string} urlPath The path to check
 * @returns {string|null} The replacement URL or null if no match
 */
function getReplacementUrl(urlPath) {
  // Skip if it's already a complete URL
  if (urlPath.startsWith('http://') || urlPath.startsWith('https://')) {
    return null
  }

  // Normalize the path for consistent comparison
  const normalizedPath = normalizePath(urlPath)

  // Check against each mapping
  for (const [sourcePath, targetUrl] of Object.entries(PATH_MAPPINGS)) {
    const normalizedSourcePath = normalizePath(sourcePath)

    // Direct match or starts with the source path
    if (
      normalizedPath === normalizedSourcePath
      || normalizedPath.startsWith(normalizedSourcePath)
      // Handle the case where the source path has a trailing slash but the URL doesn't
      || (normalizedSourcePath.endsWith('/')
        && normalizedPath === normalizedSourcePath.slice(0, -1))
      // Handle specific paths that should be replaced
    ) {
      return targetUrl
    }
  }

  return null
}

/**
 * Replace links in a Markdown file
 * @param {string} filePath File path
 * @returns {Promise<boolean>} Whether any replacements were made
 */
async function replaceLinksInMarkdownFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8')
    let newContent = content
    let replaced = false

    // Process each line of content
    const lines = content.split('\n')
    const newLines = lines.map((line) => {
      let modifiedLine = line

      // Check if this line contains a Markdown link
      if (modifiedLine.includes('](') && modifiedLine.includes(')')) {
        // Find potential link positions
        let startIndex = 0

        while (startIndex < modifiedLine.length) {
          // Find the start of the link
          const linkStartIndex = modifiedLine.indexOf('](', startIndex)
          if (linkStartIndex === -1) break

          // Find the end of the link
          const linkEndIndex = modifiedLine.indexOf(')', linkStartIndex)
          if (linkEndIndex === -1) break

          // Extract the link URL
          const linkUrl = modifiedLine.substring(
            linkStartIndex + 2,
            linkEndIndex,
          )

          // Check if the link should be replaced
          const replacementUrl = getReplacementUrl(linkUrl)
          if (replacementUrl) {
            // Replace the link
            const beforeLink = modifiedLine.substring(0, linkStartIndex + 2)
            const afterLink = modifiedLine.substring(linkEndIndex)
            modifiedLine = beforeLink + replacementUrl + afterLink
            replaced = true

            // Recalculate startIndex due to string length change after replacement
            startIndex = linkStartIndex + 2 + replacementUrl.length
          } else {
            // Move to the next potential link position
            startIndex = linkEndIndex + 1
          }
        }
      }
      return modifiedLine
    })

    if (replaced) {
      newContent = newLines.join('\n')
      await writeFile(filePath, newContent, 'utf8')
      return true
    }

    return false
  } catch (error) {
    console.error(`Error processing Markdown file ${filePath}:`, error)
    return false
  }
}

/**
 * Process a value in a JSON object and replace links if needed
 * @param {any} value The value to process
 * @returns {[any, boolean]} The processed value and whether it was replaced
 */
function processJsonValue(value) {
  // If it's a string and it's in the "link" or "name" field, check if it needs replacement
  if (typeof value === 'string') {
    const replacementUrl = getReplacementUrl(value)
    if (replacementUrl) {
      return [replacementUrl, true]
    }
  } else if (Array.isArray(value)) {
    // If it's an array, process each item
    let replaced = false
    const newArray = value.map((item) => {
      const [newItem, wasReplaced] = processJsonValue(item)
      if (wasReplaced) replaced = true
      return newItem
    })
    return [newArray, replaced]
  } else if (value !== null && typeof value === 'object') {
    // If it's an object, process recursively
    return processJsonObject(value)
  }

  // No replacement needed
  return [value, false]
}

/**
 * Process a JSON object and replace links in "link" and "name" fields
 * @param {object} obj The JSON object to process
 * @returns {[object, boolean]} The processed object and whether any replacements were made
 */
function processJsonObject(obj) {
  let replaced = false
  const newObj = { ...obj }

  for (const [key, value] of Object.entries(obj)) {
    // Check if this is a "link" or "name" field that might contain a path
    if ((key === 'link' || key === 'name') && typeof value === 'string') {
      const replacementUrl = getReplacementUrl(value)
      if (replacementUrl) {
        newObj[key] = replacementUrl
        replaced = true
        continue
      }
    }

    // Otherwise, process the value recursively
    const [newValue, wasReplaced] = processJsonValue(value)
    if (wasReplaced) {
      newObj[key] = newValue
      replaced = true
    }
  }

  return [newObj, replaced]
}

/**
 * Preprocess JSON content to handle trailing commas
 * @param {string} content JSON content as string
 * @returns {string} Preprocessed JSON content
 */
function preprocessJsonContent(content) {
  // Enhanced regex to handle trailing commas in objects
  // This works for both inline objects like {"a":1, "b":2,} and multiline objects
  let preprocessed = content.replace(/,(\s*})/g, '$1')

  // Enhanced regex to handle trailing commas in arrays
  // This works for both inline arrays like ["a", "b", "c",] and multiline arrays
  preprocessed = preprocessed.replace(/,(\s*\])/g, '$1')

  return preprocessed
}

/**
 * Parse JSON with support for trailing commas
 * @param {string} content JSON content as string
 * @returns {object|null} Parsed JSON object or null if parsing failed
 */
function parseJsonWithTrailingCommas(content) {
  // First try with preprocessing to handle trailing commas
  try {
    const preprocessed = preprocessJsonContent(content)
    return JSON.parse(preprocessed)
  } catch (error) {
    console.warn(
      'Failed to parse JSON with preprocessing, trying fallback method...',
    )

    // If preprocessing fails, try a more lenient approach using Function constructor
    // This is a fallback method that's less secure but more forgiving
    try {
      // Use Function constructor to evaluate the JSON (more permissive)
      // Note: This approach has security implications if processing untrusted input
      return Function(`"use strict"; return (${content})`)()
    } catch (fallbackError) {
      console.error('All JSON parsing methods failed:', fallbackError)
      return null
    }
  }
}

/**
 * Replace links in a JSON file
 * @param {string} filePath File path
 * @returns {Promise<boolean>} Whether any replacements were made
 */
async function replaceLinksInJsonFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8')
    let jsonData
    let hadTrailingCommas = false

    try {
      // Try standard JSON parsing first
      jsonData = JSON.parse(content)
    } catch (parseError) {
      console.warn(
        `Standard JSON parsing failed for ${filePath}, trying with trailing comma support...`,
      )

      // If standard parsing fails, try with trailing comma support
      jsonData = parseJsonWithTrailingCommas(content)
      hadTrailingCommas = true

      if (jsonData === null) {
        console.error(
          `Error parsing JSON file ${filePath} even with trailing comma support.`,
        )
        return false
      }
    }

    // Process the JSON data
    const [newJsonData, replaced] = processJsonValue(jsonData)

    // Write the updated JSON back to the file if links were replaced OR if trailing commas were removed
    if (replaced || hadTrailingCommas) {
      const newContent = JSON.stringify(newJsonData, null, 2)
      await writeFile(filePath, newContent, 'utf8')

      if (hadTrailingCommas && !replaced) {
        console.log(`Removed trailing commas in: ${filePath}`)
      }

      return true
    }

    return false
  } catch (error) {
    console.error(`Error processing JSON file ${filePath}:`, error)
    return false
  }
}

/**
 * Replace links in a file based on its type
 * @param {string} filePath File path
 * @returns {Promise<boolean>} Whether any replacements were made
 */
async function replaceLinksInFile(filePath) {
  if (filePath.endsWith('.json')) {
    return replaceLinksInJsonFile(filePath)
  } else {
    return replaceLinksInMarkdownFile(filePath)
  }
}

/**
 * Main function
 */
async function main() {
  try {
    // Define directories to search
    const directories = [
      path.resolve(__dirname, '../packages'),
      path.resolve(__dirname, 'docs'),
      path.resolve(__dirname, '../website/docs'),
      path.resolve(__dirname), // Add current directory
    ]

    let totalFiles = 0
    let replacedFiles = 0
    let cleanedJsonFiles = 0

    // Display current configured mappings
    console.log('Current path mappings:')
    for (const [source, target] of Object.entries(PATH_MAPPINGS)) {
      console.log(`  ${source} -> ${target}`)
    }

    for (const dir of directories) {
      if (fs.existsSync(dir)) {
        console.log(`Searching directory: ${dir}`)
        const files = await findFiles(dir)
        totalFiles += files.length

        for (const file of files) {
          const replaced = await replaceLinksInFile(file)
          if (replaced) {
            replacedFiles++
            if (file.endsWith('.json')) {
              cleanedJsonFiles++
            }
          }
        }
      } else {
        console.log(`Directory does not exist, skipping: ${dir}`)
      }
    }

    console.log(
      `Process completed! Processed ${totalFiles} files, replaced links in ${replacedFiles} files (including ${cleanedJsonFiles} JSON files with trailing commas cleaned).`,
    )
  } catch (error) {
    console.error('Error during execution:', error)
    process.exit(1)
  }
}

// Execute main function
main()
