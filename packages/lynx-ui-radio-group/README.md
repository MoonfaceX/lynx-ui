# @lynx-js/lynx-ui-radio-group

`@lynx-js/lynx-ui-radio-group` provides the **RadioGroup** primitives in lynx-ui.

## Introduction

Headless radio group primitives for controlled option selection.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-radio-group
```

## Usage

```tsx
import { RadioGroupRoot, Radio, RadioIndicator } from '@lynx-js/lynx-ui-radio-group'

export function BasicRadioGroup() {
  return (
    <RadioGroupRoot value='a' onValueChange={() => {}}>
      <Radio value='a'><RadioIndicator />A</Radio>
      <Radio value='b'><RadioIndicator />B</Radio>
    </RadioGroupRoot>
  )
}
```

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
