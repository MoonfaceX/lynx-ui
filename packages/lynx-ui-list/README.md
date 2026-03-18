# @lynx-js/lynx-ui-list

`@lynx-js/lynx-ui-list` provides the `List` component in lynx-ui.

## Introduction

`List` is the virtualized list primitive used by higher-level components such
as `FeedList`. The `Basic` example shows item rendering together with
imperative APIs like `scrollTo`, `autoScroll`, and `getVisibleCells`.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-list
```

## Usage

```tsx
import { useRef } from '@lynx-js/react'
import { List } from '@lynx-js/lynx-ui-list'
import type { ListRef } from '@lynx-js/lynx-ui-list'

const items = Array.from({ length: 16 }, (_, index) => ({
  id: String(index),
  label: String(index),
}))

export function BasicList() {
  const listRef = useRef<ListRef>(null)

  return (
    <view>
      <List
        listId='ListBasic'
        ref={listRef}
        listType='single'
        spanCount={1}
        scrollOrientation='vertical'
        useRefactorList={true}
        bounces={false}
      >
        {items.map((item) => (
          <list-item key={item.id} item-key={item.id}>
            <text>{item.label}</text>
          </list-item>
        ))}
      </List>

      <view bindtap={() => listRef.current?.scrollTo(true, 'middle', 7, 0)}>
        <text>Scroll to item 7</text>
      </view>
    </view>
  )
}
```

The same ref can also call `autoScroll` and `getVisibleCells`, matching the
controls shown in the `Basic` example.

## Public exports

```ts
export type { ListRef, ListProps }
export const List = memo(forwardRef(ListImpl)) as ListType
export const ListEventMapping: Record<string, string> = {
  onLayoutComplete: 'bindlayoutcomplete',
  onScrollStateChange: 'bindscrollstatechange',
  onSnapToItem: 'bindsnap',
}
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
