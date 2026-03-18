# @lynx-js/lynx-ui-sortable

`@lynx-js/lynx-ui-sortable` provides the **Sortable** primitives in lynx-ui.

## Introduction

Sortable list primitives for drag-to-reorder interactions.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-sortable
```

## Usage

```tsx
import { SortableRoot, SortableItem } from '@lynx-js/lynx-ui-sortable'

export function BasicSortable() {
  return (
    <SortableRoot>
      <SortableItem id='item-1'>Item 1</SortableItem>
      <SortableItem id='item-2'>Item 2</SortableItem>
    </SortableRoot>
  )
}
```

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
