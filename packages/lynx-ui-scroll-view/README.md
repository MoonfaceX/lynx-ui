# @lynx-js/lynx-ui-scroll-view

`@lynx-js/lynx-ui-scroll-view` provides the **ScrollView** primitives in lynx-ui.

## Introduction

Scroll view primitive with optional lazy rendering and bounce handling.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-scroll-view
```

## Usage

```tsx
import { ScrollView } from '@lynx-js/lynx-ui-scroll-view'

export function BasicScrollView() {
  return (
    <ScrollView scrollOrientation='vertical' style={{ height: '100%' }}>
      <text>Scrollable content</text>
    </ScrollView>
  )
}
```

## Public exports

```ts
export type { ScrollViewProps, ScrollViewRef }
export const ScrollView = memo(forwardRef(ScrollViewImpl)) as ScrollViewType
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
