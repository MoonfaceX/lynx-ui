# @lynx-js/lynx-ui-sheet

`@lynx-js/lynx-ui-sheet` provides the `Sheet` primitives in lynx-ui.

## Introduction

`Sheet` is a bottom-sheet primitive built from `SheetRoot`, `SheetView`,
`SheetBackdrop`, `SheetContent`, and `SheetHandle`.

The examples in `apps/examples/Sheet` cover the main usage patterns:
uncontrolled opening through a ref, controlled visibility with `show` and
`onShowChange`, and multiple snap points driven by `snapTo`, `expand`, and
`collapse`.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-sheet
```

## Usage

```tsx
import { useRef } from '@lynx-js/react'
import {
  SheetBackdrop,
  SheetContent,
  SheetHandle,
  SheetRoot,
  SheetView,
} from '@lynx-js/lynx-ui-sheet'
import type { SheetRootRef } from '@lynx-js/lynx-ui-sheet'

export function BasicSheet() {
  const sheetRef = useRef<SheetRootRef>(null)

  return (
    <view>
      <view bindtap={() => sheetRef.current?.show()}>
        <text>Open Sheet</text>
      </view>

      <SheetRoot ref={sheetRef} snapPoints={['50%']} initialSnap={0}>
        <SheetView>
          <SheetBackdrop clickToClose={true} />
          <SheetContent>
            <SheetHandle />
            <view style={{ padding: '16px' }}>
              <text>Sheet content</text>
            </view>
          </SheetContent>
        </SheetView>
      </SheetRoot>
    </view>
  )
}
```

Use `show` and `onShowChange` when the parent owns visibility state. For
imperative control, the ref exposes methods such as `show`, `close`, `snapTo`,
`expand`, and `collapse`.

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
