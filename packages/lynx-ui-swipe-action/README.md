# @lynx-js/lynx-ui-swipe-action

`@lynx-js/lynx-ui-swipe-action` provides the **SwipeAction** primitives in lynx-ui.

## Introduction

Swipe action container for exposing contextual actions via horizontal gestures.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-swipe-action
```

## Usage

```tsx
import { SwipeAction } from '@lynx-js/lynx-ui-swipe-action'

export function BasicSwipeAction() {
  return (
    <SwipeAction
      displayArea={
        <view>
          <text>Item</text>
        </view>
      }
      actionArea={
        <view>
          <text>Delete</text>
        </view>
      }
    />
  )
}
```

## Public exports

```ts
export type { SwipeActionProps, SwipeActionRef }
export const SwipeAction = memo(forwardRef(SwipeActionImpl)) as swipeActionType
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
