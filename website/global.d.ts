// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

declare module '*.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.PNG' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

declare module '*.svg?react' {
  import React from 'react'
  const Component: React.ComponentType<React.SVGProps<SVGSVGElement>>
  export default Component
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      LYNXUIONLY?: string
    }
  }
}
