# @lynx-js/lynx-ui-overlay

`@lynx-js/lynx-ui-overlay` provides the **Overlay** primitives in lynx-ui.

## Introduction

Overlay view primitive for layering content above the base UI tree.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-overlay
```

## Usage

```tsx
import { OverlayView } from '@lynx-js/lynx-ui-overlay'

export function BasicOverlay() {
  return <OverlayView>Overlay content</OverlayView>
}
```

## Public exports

```ts
export { OverlayView } from './OverlayView'
export type { OverlayViewProps, OverlayViewRef } from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
