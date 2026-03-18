# @lynx-js/lynx-ui-switch

`@lynx-js/lynx-ui-switch` provides the **Switch** primitives in lynx-ui.

## Introduction

Headless switch primitives with track/thumb composition and render props.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-switch
```

## Usage

```tsx
import { Switch, SwitchTrack, SwitchThumb } from '@lynx-js/lynx-ui-switch'

export function BasicSwitch() {
  return (
    <Switch checked={true} onCheckedChange={() => {}}>
      <SwitchTrack>
        <SwitchThumb />
      </SwitchTrack>
    </Switch>
  )
}
```

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
