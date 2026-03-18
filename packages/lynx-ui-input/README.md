# @lynx-js/lynx-ui-input

`@lynx-js/lynx-ui-input` provides the **Input** primitives in lynx-ui.

## Introduction

Input primitives including Input, TextArea, and keyboard-aware helpers.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-input
```

## Usage

```tsx
import { Input, TextArea } from '@lynx-js/lynx-ui-input'

export function BasicInput() {
  return (
    <view>
      <Input placeholder='Title' />
      <TextArea placeholder='Description' />
    </view>
  )
}
```

## Public exports

```ts
export { Input } from './Input'
export { TextArea } from './TextArea'
export { KeyboardAwareRoot } from './KeyboardAwareRoot'
export { KeyboardAwareTrigger } from './KeyboardAwareTrigger'
export { KeyboardAwareResponder } from './KeyboardAwareResponder'
export {
  KeyboardAwareRootContext,
  KeyboardAwareTriggerContext,
} from './KeyboardAwareContext'
export type {
  InputProps,
  InputRef,
  TextAreaProps,
  TextAreaRef,
  KeyboardAwareTriggerProps,
  KeyboardAwareResponderProps,
  KeyboardAwareRootProps,
} from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
