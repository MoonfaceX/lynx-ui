# @lynx-js/lynx-ui-button

`@lynx-js/lynx-ui-button` provides the `Button` component in lynx-ui.

## Introduction

`Button` is a headless press primitive. The `Basic` example uses a render prop
to react to the pressed state, while `Disabled` and `PropagateTapEvent` show
disabled handling and how button clicks interact with outer tap handlers.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-button
```

## Usage

```tsx
import { Button } from '@lynx-js/lynx-ui-button'

export function BasicButton() {
  return (
    <Button onClick={() => console.info('clicked')}>
      {({ active, disabled }) => (
        <view>
          <text>
            {disabled ? 'Disabled' : active ? 'Pressed' : 'Button'}
          </text>
        </view>
      )}
    </Button>
  )
}
```

Pass a plain `ReactNode` when you only need a button, or use the render-prop
form when the pressed and disabled states should affect your UI.

## Public exports

```ts
export { Button, ButtonContext } from './Button'
export type { ButtonProps } from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
