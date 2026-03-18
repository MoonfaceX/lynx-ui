# @lynx-js/lynx-ui-overlay

`@lynx-js/lynx-ui-overlay` provides the `OverlayView` component in lynx-ui.

## Introduction

`OverlayView` renders content above the normal UI tree and is used internally
by components such as `dialog`, `popover`, and `sheet`. Use it directly when
you need to manage overlay layering yourself or place content in a native
container.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-overlay
```

## Usage

```tsx
import { OverlayView } from '@lynx-js/lynx-ui-overlay'

export function BasicOverlay() {
  return (
    <OverlayView>
      <view>
        <text>Overlay content</text>
      </view>
    </OverlayView>
  )
}
```

Set `container` and `overlayLevel` only when the overlay should be rendered in
a specific native container.

## Public exports

```ts
export { OverlayView } from './OverlayView'
export type { OverlayViewProps, OverlayViewRef } from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
