# @lynx-js/lynx-ui-checkbox

`@lynx-js/lynx-ui-checkbox` provides the **Checkbox** primitives in lynx-ui.

## Introduction

Composable checkbox primitives with indicator support for checked and indeterminate states.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-checkbox
```

## Usage

```tsx
import { Checkbox, CheckboxIndicator } from '@lynx-js/lynx-ui-checkbox'

export function BasicCheckbox() {
  return (
    <Checkbox checked={true} onCheckedChange={() => {}}>
      <CheckboxIndicator>✓</CheckboxIndicator>
    </Checkbox>
  )
}
```

## Public exports

```ts
export { Checkbox } from './Checkbox'
export { CheckboxIndicator } from './CheckboxIndicator'
export type { CheckboxProps, CheckboxIndicatorProps } from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
