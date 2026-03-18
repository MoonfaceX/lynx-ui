# @lynx-js/lynx-ui-input

`@lynx-js/lynx-ui-input` provides input primitives and keyboard-aware helpers
in lynx-ui.

## Introduction

The `Basic` example covers uncontrolled and controlled `Input`, plus
multi-line `TextArea`. The keyboard-aware examples show how
`KeyboardAwareRoot`, `KeyboardAwareResponder`, and `KeyboardAwareTrigger` keep
focused fields visible in regular layouts and inside `ScrollView`.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-input
```

## Usage

```tsx
import { useState } from '@lynx-js/react'
import { Input, TextArea } from '@lynx-js/lynx-ui-input'

export function BasicInput() {
  const [value, setValue] = useState('controlledValue')

  return (
    <view>
      <Input placeholder='Type here' />
      <Input
        value={value}
        onInput={setValue}
        placeholder='Controlled'
      />
      <TextArea placeholder='Write something...' />
    </view>
  )
}
```

For long forms or scrollers, wrap the layout with `KeyboardAwareRoot` and
`KeyboardAwareResponder`, then place each field inside `KeyboardAwareTrigger`.

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
