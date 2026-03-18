# @lynx-js/lynx-ui-lazy-component

`@lynx-js/lynx-ui-lazy-component` provides the `LazyComponent` component in lynx-ui.

## Introduction

`LazyComponent` delays mounting its children until the placeholder node is exposed.
The `Basic` example uses it to defer rendering a large block of content, so the
layout can keep its reserved space before the child tree mounts.

`estimatedStyle` is required to reserve that space before exposure, and no
external styling dependency is required in order to use it. In
scrollable content, you can also widen the exposure area with `top`, `bottom`,
`left`, and `right`. The `VisibilityMargin` example uses `bottom='200px'` to
preload items before they enter the viewport.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-lazy-component
```

## Usage

```tsx
import { LazyComponent } from '@lynx-js/lynx-ui-lazy-component'

function HeavyContent() {
  return (
    <view style={{ width: '100%', height: '100%' }}>
      {Array.from({ length: 1000 }).map((_, index) => (
        <view
          key={index}
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: '#d6d8dd',
          }}
        />
      ))}
    </view>
  )
}

export function BasicLazyComponent() {
  return (
    <view style={{ width: '100%', height: '240px' }}>
      <LazyComponent
        scene='scene'
        pid='pid'
        estimatedStyle={{ width: '100%', height: '100%' }}
      >
        <HeavyContent />
      </LazyComponent>
    </view>
  )
}
```

`scene` and `pid` identify the exposure target. Keep them unique within the
page.

Use `bottom='0px'` to mount only when the item becomes visible, or increase it
to preload earlier:

```tsx
import { LazyComponent } from '@lynx-js/lynx-ui-lazy-component'

function FeedItem() {
  return (
    <view
      style={{
        width: '100%',
        height: '300px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#d6d8dd',
        backgroundColor: '#f5f6f8',
      }}
    />
  )
}

export function VisibilityMarginLazyComponent() {
  return (
    <LazyComponent
      scene='feed'
      pid='item_1'
      bottom='200px'
      estimatedStyle={{ width: '100%', height: '300px' }}
    >
      <FeedItem />
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
