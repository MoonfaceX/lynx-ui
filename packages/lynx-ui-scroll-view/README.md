# @lynx-js/lynx-ui-scroll-view

`@lynx-js/lynx-ui-scroll-view` provides the `ScrollView` component in lynx-ui.

## Introduction

`ScrollView` supports horizontal and vertical scrolling, optional lazy
rendering, bounce behavior, and scroll-propagation control. The examples show a
horizontal card rail and how flex children behave inside the scrollable
content area.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-scroll-view
```

## Usage

```tsx
import { ScrollView } from '@lynx-js/lynx-ui-scroll-view'

const items = ['L', 'Y', 'N', 'X']

export function BasicScrollView() {
  return (
    <ScrollView scrollOrientation='horizontal' style={{ height: '120px' }}>
      <view style={{ display: 'flex', flexDirection: 'row' }}>
        {items.map((item) => (
          <view key={item} style={{ width: '80px' }}>
            <text>{item}</text>
          </view>
        ))}
      </view>
    </ScrollView>
  )
}
```

Tune lazy rendering through `lazyOptions`, and use `bounceableOptions` when you
need bounce behavior outside the default iOS handling.

## Public exports

```ts
export type { ScrollViewProps, ScrollViewRef }
export const ScrollView = memo(forwardRef(ScrollViewImpl)) as ScrollViewType
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
