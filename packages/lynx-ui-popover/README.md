# @lynx-js/lynx-ui-popover

`@lynx-js/lynx-ui-popover` provides the `Popover` primitives in lynx-ui.

## Introduction

`Popover` anchors floating content to a trigger or custom anchor. The examples
cover basic positioning, controlled visibility with `show` and
`onVisibleChange`, optional backdrops, custom arrows, extra anchors, and usage
inside scrollable containers.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-popover
```

## Usage

```tsx
import {
  PopoverContent,
  PopoverPositioner,
  PopoverRoot,
  PopoverTrigger,
} from '@lynx-js/lynx-ui-popover'

export function BasicPopover() {
  return (
    <PopoverRoot>
      <PopoverTrigger>
        <text>Show Popover</text>

        <PopoverPositioner
          placement='bottom-end'
          placementOffset={12}
        >
          <PopoverContent>
            <text>Popover content</text>
          </PopoverContent>
        </PopoverPositioner>
      </PopoverTrigger>
    </PopoverRoot>
  )
}
```

Add `PopoverBackdrop` for outside-click dismissal, or switch to a controlled
`PopoverRoot` when the parent owns visibility state.

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
