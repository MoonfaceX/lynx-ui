// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

export { HomeLayout } from './lynx-ui'

// Extend ImportMeta to include SSG-MD
declare global {
  interface ImportMetaEnv {
    SSG_MD?: boolean
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export * from '@rspress/core/theme-original'
