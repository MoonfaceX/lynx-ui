# @lynx-js/lynx-ui-common

`@lynx-js/lynx-ui-common` provides shared hooks, helpers, and reactive
utilities for lynx-ui packages.

## Introduction

This package is the shared foundation for components such as `list`,
`scroll-view`, `dialog`, and `sheet`. It includes common event and prop types,
utility hooks, and the reactive value helpers used for main-thread state.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-common
```

## Usage

```tsx
import { runOnMainThread } from '@lynx-js/react'
import {
  useReactiveValue,
  useReactiveValueChange,
  updateReactiveValue,
} from '@lynx-js/lynx-ui-common'

export function ReactiveCounter() {
  const counterRef = useReactiveValue(0, { label: 'counter' })

  useReactiveValueChange(counterRef, (value) => {
    console.info('counter changed', value)
  })

  const increment = runOnMainThread(() => {
    'main thread'
    if (!counterRef.current) return
    updateReactiveValue(counterRef, counterRef.current.value + 1)
  })

  return (
    <view bindtap={increment}>
      <text>Increment counter</text>
    </view>
  )
}
```

Call `updateReactiveValue` from a main-thread function. The hook returns a
main-thread ref rather than a plain JS value.

## Public exports

```ts
export * from './hooks'
export * from './utils'
export * from './const'
export type * from './types'
export type {
  ReactiveValueOptions,
  ReactiveValueAPI,
  ReactiveValueType,
  Subscriber,
  Unsubscribe,
} from './reactive'
export {
  useReactiveValue,
  useReactiveValueEvent,
  updateReactiveValue,
  useReactiveValueChange,
} from './reactive'
export { useMainThreadImperativeHandle } from '@lynx-js/react-use'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
