# @lynx-js/lynx-ui-dialog

`@lynx-js/lynx-ui-dialog` provides the `Dialog` primitives in lynx-ui.

## Introduction

`Dialog` is composed from `DialogRoot`, `DialogTrigger`, `DialogView`,
`DialogBackdrop`, `DialogContent`, and `DialogClose`. The examples cover
controlled and uncontrolled open state, force-mounted content, and animation
status via render props.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-dialog
```

## Usage

```tsx
import { useState } from '@lynx-js/react'
import {
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTrigger,
  DialogView,
} from '@lynx-js/lynx-ui-dialog'

export function BasicDialog() {
  const [show, setShow] = useState(false)

  return (
    <DialogRoot show={show} onShowChange={setShow}>
      <DialogTrigger>
        <text>Open Dialog</text>
      </DialogTrigger>

      <DialogView>
        <DialogBackdrop />
        <DialogContent>
          <text>Dialog content</text>
          <DialogClose>
            <text>Close</text>
          </DialogClose>
        </DialogContent>
      </DialogView>
    </DialogRoot>
  )
}
```

Use `defaultShow` for uncontrolled dialogs, and `forceMount` when the dialog
content should stay mounted even while hidden.

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
