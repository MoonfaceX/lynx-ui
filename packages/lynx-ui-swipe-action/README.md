# @lynx-js/lynx-ui-swipe-action

`@lynx-js/lynx-ui-swipe-action` provides the `SwipeAction` component in
lynx-ui.

## Introduction

`SwipeAction` reveals an action area with horizontal gestures or imperative ref
methods. The examples show single-item usage, integration inside a scroll view,
and programmatic toggling through `showActionArea` and `closeActionArea`.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-swipe-action
```

## Usage

```tsx
import { useRef } from '@lynx-js/react'
import { SwipeAction } from '@lynx-js/lynx-ui-swipe-action'
import type { SwipeActionRef } from '@lynx-js/lynx-ui-swipe-action'

export function BasicSwipeAction() {
  const swipeActionRef = useRef<SwipeActionRef>(null)

  return (
    <view>
      <SwipeAction
        ref={swipeActionRef}
        swipeActionId='item-1'
        enableSwipe={true}
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
        onAction={(id) => console.info('action', id)}
      />

      <view bindtap={() => swipeActionRef.current?.showActionArea(true)}>
        <text>Show actions</text>
      </view>
    </view>
  )
}
```

Use `onSwipeStart` and `onSwipeEnd` to react to gesture state, or set
`estimatedActionAreaSize` when the action area lives inside a reused list item.

## Public exports

```ts
export type { SwipeActionProps, SwipeActionRef }
export const SwipeAction = memo(forwardRef(SwipeActionImpl)) as swipeActionType
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
