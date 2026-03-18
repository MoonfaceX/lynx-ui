# @lynx-js/lynx-ui-switch

`@lynx-js/lynx-ui-switch` provides the `Switch` primitives in lynx-ui.

## Introduction

`Switch` is composed from `Switch`, `SwitchTrack`, and `SwitchThumb`. The
examples cover uncontrolled and controlled state, disabled behavior, and
different visual themes built on top of the same headless structure.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-switch
```

## Usage

```tsx
import { useState } from '@lynx-js/react'
import { Switch, SwitchThumb, SwitchTrack } from '@lynx-js/lynx-ui-switch'

export function BasicSwitch() {
  const [checked, setChecked] = useState(true)

  return (
    <Switch checked={checked} onChange={setChecked}>
      <SwitchTrack />
      <SwitchThumb />
    </Switch>
  )
}
```

Set `defaultChecked` for uncontrolled usage, or pass `disabled` to prevent
interaction while keeping the current visual state.

## Public exports

```ts
export { Switch, SwitchThumb, SwitchTrack } from './switch'
export type {
  SwitchProps,
  SwitchThumbProps,
  SwitchTrackProps,
  SwitchRenderProps,
} from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
