// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { root, useRef, useState } from '@lynx-js/react'

import {
  Slider,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@lynx-js/lynx-ui'
import type { SliderRef } from '@lynx-js/lynx-ui'

import './index.css'

const PRESET_PROGRESS = [0, 0.25, 0.5, 0.75, 1]

function formatProgress(progress: number) {
  return `${Math.round(progress * 100)}%`
}

function App() {
  const primitiveSliderRef = useRef<SliderRef>(null)

  const [primitiveProgress, setPrimitiveProgress] = useState(0.32)
  const [primitiveDragging, setPrimitiveDragging] = useState(false)
  const [primitiveLastSeek, setPrimitiveLastSeek] = useState(0.32)
  const [facadeProgress, setFacadeProgress] = useState(0.68)

  return (
    <view className='demo-container lunaris-dark luna-gradient-sky'>
      <view className='demo-canvas'>
        <view className='section'>
          <text className='section-title'>Primitives</text>
          <text className='section-desc'>
            Compose the slider from `SliderRoot`, `SliderTrack`, `SliderRange`,
            and `SliderThumb`.
          </text>

          <view className='slider-card'>
            <view className='slider-meta'>
              <text className='slider-value'>
                {formatProgress(primitiveProgress)}
              </text>
              <text className='slider-status'>
                {primitiveDragging
                  ? 'Dragging...'
                  : `Last seek: ${formatProgress(primitiveLastSeek)}`}
              </text>
            </view>

            <SliderRoot
              ref={primitiveSliderRef}
              className='slider-root'
              defaultProgress={0.32}
              onDragging={(dragging: boolean) => {
                setPrimitiveDragging(dragging)
              }}
              onProgress={(progress: number) => {
                setPrimitiveProgress(progress)
              }}
              onSeek={(progress: number) => {
                console.info('primitive slider seek', progress)
                setPrimitiveLastSeek(progress)
              }}
            >
              <SliderTrack className='slider-track' />
              <SliderRange className='slider-range'>
                <SliderThumb className='slider-thumb-wrapper'>
                  <view className='slider-thumb-dot' />
                </SliderThumb>
              </SliderRange>
            </SliderRoot>

            <view className='preset-row'>
              {PRESET_PROGRESS.map((value) => (
                <view
                  key={`preset-${value}`}
                  className='preset-chip'
                  bindtap={() => {
                    primitiveSliderRef.current?.updateProgress(value)
                  }}
                >
                  <text className='preset-label'>
                    {formatProgress(value)}
                  </text>
                </view>
              ))}
            </view>
          </view>
        </view>

        <view className='section'>
          <text className='section-title'>Facade</text>
          <text className='section-desc'>
            The compatibility `Slider` API keeps a single-component surface
            while still exposing styling hooks for track, range, and thumb.
          </text>

          <view className='slider-card'>
            <view className='slider-meta'>
              <text className='slider-value'>
                {formatProgress(facadeProgress)}
              </text>
              <text className='slider-status'>Compatibility API</text>
            </view>

            <Slider
              className='slider-root'
              defaultProgress={0.68}
              onProgress={(progress: number) => {
                setFacadeProgress(progress)
              }}
              onSeek={(progress: number) => {
                console.info('facade slider seek', progress)
              }}
              trackBackgroundClassName='slider-track slider-track-muted'
              trackForegroundClassName='slider-range slider-range-sunset'
              thumbWrapperClassName='slider-thumb-wrapper'
              thumb={<view className='slider-thumb-pill' />}
            />
          </view>

          <view className='slider-card disabled-card'>
            <view className='slider-meta'>
              <text className='slider-value'>Disabled</text>
              <text className='slider-status'>
                Interaction is blocked while preserving the same layout.
              </text>
            </view>

            <Slider
              className='slider-root slider-root-disabled'
              defaultProgress={0.45}
              disabled
              trackBackgroundClassName='slider-track slider-track-muted'
              trackForegroundClassName='slider-range slider-range-muted'
              thumbWrapperClassName='slider-thumb-wrapper slider-thumb-wrapper-muted'
              thumb={
                <view className='slider-thumb-dot slider-thumb-dot-muted' />
              }
            />
          </view>
        </view>
      </view>
    </view>
  )
}

root.render(<App />)

export default App
