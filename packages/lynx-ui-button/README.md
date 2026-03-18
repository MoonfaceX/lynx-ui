# @lynx-js/lynx-ui-button

`@lynx-js/lynx-ui-button` provides the **Button** primitives in lynx-ui.

## Introduction

Headless button primitive for tap/click interactions and disabled state handling.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-button
```

## Usage

```tsx
import { Button } from '@lynx-js/lynx-ui-button'

export function BasicButton() {
  return <Button onTap={() => {}}>Save</Button>
}
```

## Public exports

```ts
export { Button, ButtonContext } from './Button'
export type { ButtonProps } from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
