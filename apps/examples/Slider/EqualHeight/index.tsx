// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { root, useState } from '@lynx-js/react'

import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@lynx-js/lynx-ui'

import './index.css'

function formatProgress(progress: number) {
  return `${Math.round(progress * 100)}%`
}

function App() {
  const [fullProgress, setFullProgress] = useState(0.4)
  const [warmProgress, setWarmProgress] = useState(0.65)
  const [pillProgress, setPillProgress] = useState(0.5)

  return (
    <view className='demo-container lunaris-dark luna-gradient-sky'>
      <view className='demo-canvas'>
        <view className='section'>
          <text className='section-title'>Equal Height</text>
          <text className='section-desc'>
            Range and thumb share the same height, creating a thick progress bar
            with an embedded thumb.
          </text>

          <view className='slider-card'>
            <view className='slider-meta'>
              <text className='slider-value'>
                {formatProgress(fullProgress)}
              </text>
              <text className='slider-status'>36px range + 36px thumb</text>
            </view>

            <SliderRoot
              className='slider-root'
              defaultProgress={0.4}
              onProgress={(progress) => {
                setFullProgress(progress)
              }}
            >
              <SliderTrack className='slider-track' />
              <SliderRange className='slider-range'>
                <SliderThumb className='slider-thumb-wrapper'>
                  <view className='slider-thumb-dot' />
                </SliderThumb>
              </SliderRange>
            </SliderRoot>
          </view>

          <view className='slider-card'>
            <view className='slider-meta'>
              <text className='slider-value'>
                {formatProgress(warmProgress)}
              </text>
              <text className='slider-status'>Warm gradient ring thumb</text>
            </view>

            <SliderRoot
              className='slider-root'
              defaultProgress={0.65}
              onProgress={(progress) => {
                setWarmProgress(progress)
              }}
            >
              <SliderTrack className='slider-track slider-track-warm' />
              <SliderRange className='slider-range slider-range-warm'>
                <SliderThumb className='slider-thumb-wrapper'>
                  <view className='slider-thumb-ring' />
                </SliderThumb>
              </SliderRange>
            </SliderRoot>
          </view>

          <view className='slider-card'>
            <view className='slider-meta'>
              <text className='slider-value'>
                {formatProgress(pillProgress)}
              </text>
              <text className='slider-status'>24px pill with bar thumb</text>
            </view>

            <SliderRoot
              className='slider-root'
              defaultProgress={0.5}
              onProgress={(progress) => {
                setPillProgress(progress)
              }}
            >
              <SliderTrack className='slider-track-pill' />
              <SliderRange className='slider-range-pill'>
                <SliderThumb className='slider-thumb-pill-wrapper'>
                  <view className='slider-thumb-bar' />
                </SliderThumb>
              </SliderRange>
            </SliderRoot>
          </view>
        </view>
      </view>
    </view>
  )
}

root.render(<App />)

export default App
