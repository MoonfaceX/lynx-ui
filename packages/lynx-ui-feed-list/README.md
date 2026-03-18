# @lynx-js/lynx-ui-feed-list

`@lynx-js/lynx-ui-feed-list` provides the `FeedList` component in lynx-ui.

## Introduction

`FeedList` builds on top of `List` and adds pull-to-refresh, load-more
footers, and no-more-data handling. The `Basic` example shows the full flow:
refreshing, appending more items when the list reaches the bottom, and
switching to a no-more-data footer.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-feed-list
```

## Usage

```tsx
import { useRef, useState } from '@lynx-js/react'
import { FeedList } from '@lynx-js/lynx-ui-feed-list'
import type { FeedListRef } from '@lynx-js/lynx-ui-feed-list'

const initialItems = [
  { itemKey: 'A', label: 'A' },
  { itemKey: 'B', label: 'B' },
]

export function BasicFeedList() {
  const feedListRef = useRef<FeedListRef>(null)
  const [items, setItems] = useState(initialItems)

  return (
    <FeedList
      ref={feedListRef}
      listId='feedListBasic'
      listType='single'
      spanCount={1}
      scrollOrientation='vertical'
      refreshOptions={{
        enableRefresh: true,
        onStartRefresh: () => {
          setTimeout(() => {
            setItems([...initialItems].reverse())
            feedListRef.current?.finishRefresh()
          }, 1000)
        },
      }}
    >
      {items.map((item) => (
        <list-item key={item.itemKey} item-key={item.itemKey}>
          <text>{item.label}</text>
        </list-item>
      ))}
    </FeedList>
  )
}
```

Use `loadMoreFooter`, `noMoreDataFooter`, `finishRefresh`, and
`changeHasMoreStatus` to match the complete flow from the `Basic` example.

## Public exports

```ts
export type { FeedListRef, FeedListProps }
export type {
  BounceableBasicProps,
  RefreshProps,
} from '@lynx-js/lynx-ui-common'
export const FeedList = memo(forwardRef(FeedListImpl)) as FeedListType
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
