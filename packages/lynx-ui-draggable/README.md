# @lynx-js/lynx-ui-draggable

`@lynx-js/lynx-ui-draggable` provides the **Draggable** primitives in lynx-ui.

## Introduction

Drag-and-drop primitives and hook for movable elements with optional draggable boundaries.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-draggable
```

## Usage

```tsx
import { DraggableRoot, DraggableArea, Draggable } from '@lynx-js/lynx-ui-draggable'

export function BasicDraggable() {
  return (
    <DraggableRoot>
      <DraggableArea>
        <Draggable>Drag me</Draggable>
      </DraggableArea>
    </DraggableRoot>
  )
}
```

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
