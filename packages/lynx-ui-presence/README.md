# @lynx-js/lynx-ui-presence

`@lynx-js/lynx-ui-presence` provides the **Presence** primitives in lynx-ui.

## Introduction

Presence and animation-state helpers for mounting transitions and enter/exit orchestration.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-presence
```

## Usage

```tsx
import { Presence } from '@lynx-js/lynx-ui-presence'

export function BasicPresence({ visible, children }) {
  return <Presence present={visible}>{children}</Presence>
}
```

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
