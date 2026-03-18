# @lynx-js/lynx-ui-sheet

`@lynx-js/lynx-ui-sheet` provides the **Sheet** primitives in lynx-ui.

## Introduction

Bottom sheet primitives for backdrop/content/handle composition and snap control.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-sheet
```

## Usage

```tsx
import {
  SheetRoot,
  SheetBackdrop,
  SheetContent,
  SheetHandle,
} from '@lynx-js/lynx-ui-sheet'

export function BasicSheet() {
  return (
    <SheetRoot>
      <SheetBackdrop />
      <SheetContent>
        <SheetHandle />
      </SheetContent>
    </SheetRoot>
  )
}
```

## Public exports

```ts
export { SheetRoot } from './SheetRoot'
export type { SheetRootRef } from './SheetRoot'
export { SheetBackdrop } from './SheetBackdrop'
export { SheetContent } from './SheetContent'
export { SheetHandle } from './SheetHandle'
export { SheetView } from './SheetView'
export { useSnap } from './hooks'
export type {
  SheetBackdropProps,
  SheetContentProps,
  SheetRootProps,
  SheetViewProps,
  SheetHandleProps,
  SheetTransition,
} from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
