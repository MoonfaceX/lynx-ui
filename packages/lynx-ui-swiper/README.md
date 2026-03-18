# @lynx-js/lynx-ui-swiper

`@lynx-js/lynx-ui-swiper` provides the **Swiper** primitives in lynx-ui.

## Introduction

Swiper/carousel primitives with item composition and imperative controls.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-swiper
```

## Usage

```tsx
import { Swiper, SwiperItem } from '@lynx-js/lynx-ui-swiper'

export function BasicSwiper() {
  return (
    <Swiper>
      <SwiperItem>Slide 1</SwiperItem>
      <SwiperItem>Slide 2</SwiperItem>
    </Swiper>
  )
}
```

## Public exports

```ts
export { Swiper } from './Swiper'
export { SwiperItem } from './SwiperItem'
export type { SwiperItemProps } from './SwiperItem'
export type { SwiperProps, SwiperRef } from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
