# @lynx-js/lynx-ui-presence

`@lynx-js/lynx-ui-presence` provides mount and animation-state helpers in
lynx-ui.

## Introduction

`Presence` drives enter and exit lifecycle for overlay-style components such as
`dialog` and `popover`. It accepts a single `show` state, can keep nodes
mounted with `forceMount`, and exposes render-prop status fields like `open`,
`closed`, `entering`, and `leaving`.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-presence
```

## Usage

```tsx
import { Presence } from '@lynx-js/lynx-ui-presence'

export function BasicPresence({ show }: { show: boolean }) {
  return (
    <Presence show={show}>
      {({ entering, leaving }) => (
        <view>
          <text>
            {entering ? 'Entering' : leaving ? 'Leaving' : 'Visible'}
          </text>
        </view>
      )}
    </Presence>
  )
}
```

Use `forceMount` when hidden content still needs to stay mounted, or
`useVisibilityFromPresence` when other components need a derived visibility
signal.

## Public exports

```ts
export { Presence, PresenceContext, renderPresenceChildren } from './Presence'
export {
  PresenceState,
  resolveAnimationStatus,
  presenceClassVariants,
} from './utils'
export { usePresenceGroup } from './usePresenceGroup'
export { useVisibilityFromPresence } from './useVisibilityFromPresence'
export type * from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
