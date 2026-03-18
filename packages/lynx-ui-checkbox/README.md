# @lynx-js/lynx-ui-checkbox

`@lynx-js/lynx-ui-checkbox` provides the `Checkbox` primitives in lynx-ui.

## Introduction

`Checkbox` supports uncontrolled and controlled usage, plus an
`indeterminate` state for "select all" patterns. The examples cover basic
selection, controlled updates, disabled items, and an indeterminate parent
checkbox that drives a group.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-checkbox
```

## Usage

```tsx
import { useState } from '@lynx-js/react'
import { Checkbox, CheckboxIndicator } from '@lynx-js/lynx-ui-checkbox'

export function BasicCheckbox() {
  const [checked, setChecked] = useState(false)

  return (
    <view>
      <Checkbox checked={checked} onChange={setChecked}>
        <CheckboxIndicator>
          <text>{checked ? '✓' : ''}</text>
        </CheckboxIndicator>
      </Checkbox>
      <text>{checked ? 'Checked' : 'Unchecked'}</text>
    </view>
  )
}
```

Set `indeterminate={true}` on the parent checkbox to match the "some children
selected" state shown in the `Indeterminate` example.

## Public exports

```ts
export { Checkbox } from './Checkbox'
export { CheckboxIndicator } from './CheckboxIndicator'
export type { CheckboxProps, CheckboxIndicatorProps } from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
