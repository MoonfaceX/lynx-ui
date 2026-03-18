# @lynx-js/lynx-ui-radio-group

`@lynx-js/lynx-ui-radio-group` provides the `RadioGroup` primitives in
lynx-ui.

## Introduction

`RadioGroupRoot` owns the selected value, while each `Radio` registers an
option and `RadioIndicator` renders the selected marker. The examples cover
controlled selection and disabled states.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-radio-group
```

## Usage

```tsx
import { useState } from '@lynx-js/react'
import {
  Radio,
  RadioGroupRoot,
  RadioIndicator,
} from '@lynx-js/lynx-ui-radio-group'

export function BasicRadioGroup() {
  const [value, setValue] = useState('light')

  return (
    <RadioGroupRoot value={value} onValueChange={setValue}>
      <Radio value='light'>
        <RadioIndicator>
          <text>•</text>
        </RadioIndicator>
        <text>Light</text>
      </Radio>
      <Radio value='dark'>
        <RadioIndicator>
          <text>•</text>
        </RadioIndicator>
        <text>Dark</text>
      </Radio>
    </RadioGroupRoot>
  )
}
```

Set `defaultValue` for uncontrolled usage, or mark the whole group or
individual radios as `disabled`.

## Public exports

```ts
export { RadioIndicator, Radio, RadioGroupRoot } from './RadioGroup'
export type {
  RadioGroupRootProps,
  RadioIndicatorProps,
  RadioProps,
} from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
