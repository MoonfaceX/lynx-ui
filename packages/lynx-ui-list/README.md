# @lynx-js/lynx-ui-list

`@lynx-js/lynx-ui-list` provides the **List** primitives in lynx-ui.

## Introduction

Virtualized list primitive with orientation, events, and imperative list controls.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-list
```

## Usage

```tsx
import { List } from '@lynx-js/lynx-ui-list'

export function BasicList({ data }) {
  return (
    <List scrollOrientation='vertical'>
      {data.map(item => (
        <list-item item-key={item.id} key={item.id}>{item.label}</list-item>
      ))}
    </List>
  )
}
```

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
