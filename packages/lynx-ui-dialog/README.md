# @lynx-js/lynx-ui-dialog

`@lynx-js/lynx-ui-dialog` provides the **Dialog** primitives in lynx-ui.

## Introduction

Headless dialog primitives for trigger/content/backdrop composition and open-state control.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-dialog
```

## Usage

```tsx
import {
  DialogRoot,
  DialogTrigger,
  DialogBackdrop,
  DialogContent,
  DialogClose,
} from '@lynx-js/lynx-ui-dialog'

export function BasicDialog() {
  return (
    <DialogRoot>
      <DialogTrigger>Open</DialogTrigger>
      <DialogBackdrop />
      <DialogContent>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </DialogRoot>
  )
}
```

## Public exports

```ts
export {
  DialogView,
  DialogRoot,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogBackdrop,
} from './Dialog'
export type { PresenceAnimationStatus } from '@lynx-js/lynx-ui-presence'
export type {
  DialogBackdropProps,
  DialogContentProps,
  DialogRootProps,
  DialogTriggerProps,
  DialogCloseProps,
  DialogViewProps,
} from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
