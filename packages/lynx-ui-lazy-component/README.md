# @lynx-js/lynx-ui-lazy-component

`@lynx-js/lynx-ui-lazy-component` provides the **LazyComponent** primitives in lynx-ui.

## Introduction

Exposure-driven lazy mounting utility component with optional unmount-on-exit behavior.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-lazy-component
```

## Usage

```tsx
import { LazyComponent } from '@lynx-js/lynx-ui-lazy-component'

export function BasicLazyComponent() {
  return (
    <LazyComponent
      scene='home'
      pid='hero_card'
      estimatedStyle={{ width: '100px', height: '100px' }}
    >
      <text>Rendered when exposed</text>
    </LazyComponent>
  )
}
```

## Public exports

```ts
export type { LazyComponentRef, LazyComponentProps }
export const LazyComponent = memo(
  forwardRef(LazyComponentImpl),
) as LazyComponentType
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
