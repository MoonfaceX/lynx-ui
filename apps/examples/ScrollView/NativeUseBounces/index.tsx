// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { root, useState } from '@lynx-js/react'

import { ScrollView } from '@lynx-js/lynx-ui'
import type { ScrollEvent } from '@lynx-js/types'

import './index.css'

const VIEWPORT_HEIGHT = 420
const TRIGGER_DISTANCE = 48
const ITEMS = Array.from({ length: 12 }, (_, index) => index + 1)

interface Metrics {
  bounceCount: number
  lastBounce: 'none' | 'upper' | 'lower'
  maxLowerDistance: number
  maxUpperDistance: number
  minScrollTop: number
  scrollHeight: number
  scrollTop: number
}

function BounceItem(props: {
  direction: 'upper' | 'lower'
  label: string
}) {
  const { direction, label } = props
  return (
    <view className={`bounce-item bounce-item--${direction}`}>
      <text className='bounce-item__label'>{label}</text>
      <text className='bounce-item__hint'>Threshold: 48px</text>
    </view>
  )
}

function formatMetric(value: number) {
  return Number.isFinite(value) ? value.toFixed(1) : '--'
}

function App() {
  const [metrics, setMetrics] = useState<Metrics>({
    bounceCount: 0,
    lastBounce: 'none',
    maxLowerDistance: 0,
    maxUpperDistance: 0,
    minScrollTop: 0,
    scrollHeight: 0,
    scrollTop: 0,
  })

  const handleScroll = (event: ScrollEvent) => {
    const { scrollHeight, scrollTop } = event.detail
    const upperDistance = Math.max(0, -scrollTop)
    const lowerDistance = Math.max(0, scrollTop - scrollHeight)

    setMetrics(previous => ({
      ...previous,
      maxLowerDistance: Math.max(
        previous.maxLowerDistance,
        lowerDistance,
      ),
      maxUpperDistance: Math.max(
        previous.maxUpperDistance,
        upperDistance,
      ),
      minScrollTop: Math.min(previous.minScrollTop, scrollTop),
      scrollHeight,
      scrollTop,
    }))
  }

  return (
    <view className='demo-container lunaris-dark'>
      <view className='header'>
        <text className='title'>Native useBounces</text>
        <text className='description'>
          Pull beyond both edges and watch bindscroll metrics.
        </text>
        <view className='metrics'>
          <text className='metric'>
            {`scrollTop: ${formatMetric(metrics.scrollTop)}`}
          </text>
          <text className='metric'>
            {`min scrollTop: ${formatMetric(metrics.minScrollTop)}`}
          </text>
          <text className='metric'>
            {`max upper: ${formatMetric(metrics.maxUpperDistance)}`}
          </text>
          <text className='metric'>
            {`max lower: ${formatMetric(metrics.maxLowerDistance)}`}
          </text>
          <text className='metric'>
            {`scrollHeight: ${formatMetric(metrics.scrollHeight)}`}
          </text>
          <text className='metric metric--event'>
            {`bounce event: ${metrics.lastBounce} (${metrics.bounceCount})`}
          </text>
        </view>
      </view>

      <ScrollView
        enableNewArch={true}
        scrollOrientation='vertical'
        className='scroll-view'
        style={{
          width: '100%',
          height: `${VIEWPORT_HEIGHT}px`,
          borderRadius: '20px',
        }}
        onScroll={handleScroll}
        bounceableOptions={{
          enableBounces: true,
          alwaysBouncing: true,
          singleSidedBounce: 'both',
          startBounceTriggerDistance: TRIGGER_DISTANCE,
          endBounceTriggerDistance: TRIGGER_DISTANCE,
          upperBounceItem: (
            <BounceItem direction='upper' label='Native upper bounce' />
          ),
          lowerBounceItem: (
            <BounceItem direction='lower' label='Native lower bounce' />
          ),
          onScrollToBounces: ({ direction }) => {
            setMetrics(previous => ({
              ...previous,
              bounceCount: previous.bounceCount + 1,
              lastBounce: direction,
            }))
          },
        }}
      >
        <view className='scroll-content'>
          {ITEMS.map(item => (
            <view className='card' key={`native-bounce-card-${item}`}>
              <text className='card__index'>{`${item}`}</text>
              <view className='card__copy'>
                <text className='card__title'>Native ScrollView</text>
                <text className='card__subtitle'>
                  scroll-view-new-arch=true
                </text>
              </view>
            </view>
          ))}
        </view>
      </ScrollView>
    </view>
  )
}

root.render(<App />)

export default App
