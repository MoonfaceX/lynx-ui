# @lynx-js/lynx-ui-common

`@lynx-js/lynx-ui-common` provides the **Common** primitives in lynx-ui.

## Introduction

Shared hooks, constants, event helpers, and reactive utilities used across lynx-ui packages.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-common
```

## Usage

```tsx
import { useReactiveValue, updateReactiveValue } from '@lynx-js/lynx-ui-common'

const counter = useReactiveValue('counter', 0)
updateReactiveValue('counter', value => value + 1)
```

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
