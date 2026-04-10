# lynx-ui-slider SKILL

`lynx-ui-slider` is a primitives-first slider package for ReactLynx. It provides composable building blocks (`SliderRoot`, `SliderTrack`, `SliderRange`, `SliderThumb`) and a compatibility facade (`Slider`).

## 1. Core Capabilities

- **Primitives Composition**: Build slider UI with `SliderRoot` + `SliderTrack` + `SliderRange` + `SliderThumb`.
- **Compatibility Facade**: Use `<Slider />` when migrating from a single-component API.
- **Imperative API**: Access `updateProgress` and `getProgress` through `SliderRef`.
- **Interaction Lifecycle**: Exposes `onDragging`, `onProgress`, and `onSeek` callbacks.
- **Headless Styling**: Supports styling via `className`/`class` and `style` props.

## 2. AI Coding Guide

### Minimal Usable Example

```tsx
import { Slider } from '@lynx-js/lynx-ui'

function BasicSlider() {
  return (
    <Slider.Root
      defaultProgress={0.3}
      onSeek={(value) => console.log(value)}
    >
      <Slider.Track />
      <Slider.Range>
        <Slider.Thumb>
          <view />
        </Slider.Thumb>
      </Slider.Range>
    </Slider.Root>
  )
}
```

### Recommended Prompt Formula

> **State mode** + **Visual structure** + **Interaction callbacks** + **Styling hooks**

**Example Prompt:**

- "Create a controlled slider with custom thumb UI and `onSeek` callback for commit events."
- "Build a headless slider with a 4px track and custom class names for each primitive."
- "Migrate legacy `<Slider />` usage to primitive composition while keeping the same behavior."

## 3. Use Cases & Best Practices

### Primitive Composition (Recommended)

```tsx
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from '@lynx-js/lynx-ui'

function ComposedSlider() {
  return (
    <SliderRoot defaultProgress={0.6}>
      <SliderTrack className='my-slider-track' />
      <SliderRange>
        <SliderThumb className='my-slider-thumb'>
          <view />
        </SliderThumb>
      </SliderRange>
    </SliderRoot>
  )
}
```

> If you customize track/thumb sizes, make sure your CSS keeps thumb centering rules in sync:
> `marginTop = (thumbHeight - trackHeight) / 2` and `right = -thumbWidth / 2`.

### Compatibility Facade

```tsx
import { Slider } from '@lynx-js/lynx-ui'

function LegacyStyleSlider() {
  return (
    <Slider
      defaultProgress={0.5}
      onProgress={(value, source) => {
        console.log(value, source)
      }}
    />
  )
}
```

## 4. FAQ

**Q: Should I use `SliderRoot` or `Slider`?**

A: Prefer primitives (`SliderRoot`...) for new code. Use `Slider` facade when you need faster migration from older single-component patterns.

**Q: What is the difference between `onProgress` and `onSeek`?**

A: `onProgress` fires on every progress change (including dragging). `onSeek` fires once at interaction end.

**Q: Can I set value outside `[0, 1]`?**

A: Input values are clamped to `[0, 1]` internally.

**Q: I changed thumb/track size in CSS and now thumb is not centered. Why?**

A: Thumb and track have an implicit centering relationship. If you change one size, also update the matching offsets in CSS:

- vertical alignment offset: `(thumbHeight - trackHeight) / 2`
- horizontal anchor offset: `-thumbWidth / 2`

## 5. Sub Components

- **`SliderRoot`**: Owns measurement, drag/seek behavior, and imperative API.
- **`SliderTrack`**: Background track.
- **`SliderRange`**: Foreground range container with width bound to progress.
- **`SliderThumb`**: Foreground progress bar + draggable thumb visual node.
- **`Slider`**: Compatibility facade composed from the primitives above.
