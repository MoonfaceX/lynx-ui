# @lynx-js/lynx-ui-swiper

`@lynx-js/lynx-ui-swiper` provides the `Swiper` primitives in lynx-ui.

## Introduction

`Swiper` renders items from a data array through a render function and wraps
each slide with `SwiperItem`. The examples cover imperative navigation,
different alignments and gaps, indicators, looping, bounce items, and lazy
slide content through `LazyComponent`.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-swiper
```

## Usage

```tsx
import { useRef, useState } from '@lynx-js/react'
import { Swiper, SwiperItem } from '@lynx-js/lynx-ui-swiper'
import type { SwiperRef } from '@lynx-js/lynx-ui-swiper'

const items = [1, 2, 3, 4]

export function BasicSwiper() {
  const [current, setCurrent] = useState(0)
  const swiperRef = useRef<SwiperRef>(null)

  return (
    <view>
      <Swiper
        ref={swiperRef}
        data={items}
        itemWidth={250}
        itemHeight={200}
        initialIndex={0}
        onChange={setCurrent}
        mode='normal'
        modeConfig={{ align: 'center', spaceBetween: 16 }}
      >
        {({ item, index, realIndex }) => (
          <SwiperItem index={index} key={realIndex} realIndex={realIndex}>
            <text>{item}</text>
          </SwiperItem>
        )}
      </Swiper>

      <view bindtap={() => swiperRef.current?.swipeNext()}>
        <text>Current slide: {current}</text>
      </view>
    </view>
  )
}
```

Combine `Swiper` with `LazyComponent` when off-screen slides should mount on
demand, matching the `Lazy` example.

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
