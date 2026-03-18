# @lynx-js/lynx-ui-feed-list

`@lynx-js/lynx-ui-feed-list` provides the **FeedList** primitives in lynx-ui.

## Introduction

List wrapper that combines list virtualization with pull-to-refresh and bounce behavior options.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-feed-list
```

## Usage

```tsx
import { FeedList } from '@lynx-js/lynx-ui-feed-list'

export function BasicFeedList({ children }) {
  return (
    <FeedList refreshOptions={{ enableRefresh: true }} bounceableOptions={{ enableBounces: true }}>
      {children}
    </FeedList>
  )
}
```

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
