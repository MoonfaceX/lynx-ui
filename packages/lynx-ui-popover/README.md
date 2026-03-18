# @lynx-js/lynx-ui-popover

`@lynx-js/lynx-ui-popover` provides the **Popover** primitives in lynx-ui.

## Introduction

Composable popover primitives with anchor, trigger, backdrop, positioner, and arrow support.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-popover
```

## Usage

```tsx
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverBackdrop,
  PopoverPositioner,
  PopoverContent,
  PopoverArrow,
} from '@lynx-js/lynx-ui-popover'

export function BasicPopover() {
  return (
    <PopoverRoot>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverBackdrop />
      <PopoverPositioner>
        <PopoverContent>
          <PopoverArrow />
          Content
        </PopoverContent>
      </PopoverPositioner>
    </PopoverRoot>
  )
}
```

## Public exports

```ts
export { PopoverContext, useElementInfoReducer } from './useElementInfoReducer'
export {
  PopoverArrow,
  PopoverAnchor,
  PopoverBackdrop,
  PopoverTrigger,
  PopoverContent,
  PopoverPositioner,
  PopoverRoot,
} from './Popover'
export type { PresenceAnimationStatus } from '@lynx-js/lynx-ui-presence'
export type {
  PopoverOverlayProps,
  PopoverArrowProps,
  PopoverAnchorProps,
  PopoverBackdropProps,
  PopoverContentProps,
  PopoverPositionerProps,
  PopoverRootProps,
  PopoverTriggerProps,
} from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
