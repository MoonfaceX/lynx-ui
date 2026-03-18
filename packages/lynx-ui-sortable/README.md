# @lynx-js/lynx-ui-sortable

`@lynx-js/lynx-ui-sortable` provides the `Sortable` primitives in lynx-ui.

## Introduction

`SortableRoot` renders a sortable data set, `SortableItem` wraps each rendered
node, and `SortableItemArea` can act as a dedicated drag handle when
`SortableItem` uses `as='DraggableRoot'`. The examples cover boundary
confinement, scroll-view integration, and temporarily disabling sorting.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-sortable
```

## Usage

```tsx
import { useState } from '@lynx-js/react'
import type { SortableData } from '@lynx-js/lynx-ui-sortable'
import {
  SortableItem,
  SortableItemArea,
  SortableRoot,
} from '@lynx-js/lynx-ui-sortable'

const initialData: SortableData<{ label: string }>[] = [
  { getSortingKey: () => 'item-1', dataItem: { label: 'Item 1' } },
  { getSortingKey: () => 'item-2', dataItem: { label: 'Item 2' } },
]

export function BasicSortable() {
  const [data, setData] = useState(initialData)

  return (
    <view id='sortableRoot' style={{ zIndex: '0' }}>
      <SortableRoot
        data={data}
        boundaryId='sortableRoot'
        onSortEnd={setData}
      >
        {(item) => (
          <SortableItem
            as='DraggableRoot'
            sortingKey={item.getSortingKey()}
          >
            <SortableItemArea>
              <text>{item.dataItem.label}</text>
            </SortableItemArea>
          </SortableItem>
        )}
      </SortableRoot>
    </view>
  )
}
```

Use a plain `SortableItem` when the whole item should drag, or combine
`onSortStart` with a surrounding scroll container as shown in
`WithScrollView`.

## Public exports

```ts
export { SortableRoot, SortableItem, SortableItemArea } from './Sortable'
export type {
  SortableItemProps,
  SortableRootProps,
  SortableData,
} from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
