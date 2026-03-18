# @lynx-js/lynx-ui-draggable

`@lynx-js/lynx-ui-draggable` provides the `Draggable` primitives in lynx-ui.

## Introduction

`Draggable` can make an entire node movable, while `DraggableRoot` with
`DraggableArea` lets you restrict dragging to a handle. The examples also show
bounded dragging with `minTranslateX`, `maxTranslateX`, `minTranslateY`, and
`maxTranslateY`.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-draggable
```

## Usage

```tsx
import { DraggableArea, DraggableRoot } from '@lynx-js/lynx-ui-draggable'

export function BasicDraggable() {
  return (
    <DraggableRoot resetOnEnd={true} trigger='immediate'>
      <DraggableArea>
        <text>Drag here</text>
      </DraggableArea>
    </DraggableRoot>
  )
}
```

Use `Draggable` directly when the whole node is draggable. Add translation
limits when you need the bounded behavior from the `WithBounds` example.

## Public exports

```ts
export { Draggable, DraggableRoot, DraggableArea } from './Draggable'
export { useDraggable } from './useDraggable'
export type {
  DraggableProps,
  DraggableAreaProps,
  DraggableRef,
} from './types/index.docs'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
