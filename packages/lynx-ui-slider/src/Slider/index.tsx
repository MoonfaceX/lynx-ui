// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { forwardRef, memo } from '@lynx-js/react'
import type { ForwardedRef } from '@lynx-js/react'

import { SliderRange } from '../SliderRange'
import { SliderRoot } from '../SliderRoot'
import { SliderThumb } from '../SliderThumb'
import { SliderTrack } from '../SliderTrack'
import type { SliderProps, SliderRef, Slider as SliderType } from '../types'
import { resolveClassName } from '../utils'

export const Slider = memo(forwardRef(SliderImpl)) as SliderType

function SliderImpl(props: SliderProps, ref: ForwardedRef<SliderRef>) {
  const {
    thumb,
    trackBackgroundClassName,
    trackBackgroundClass,
    trackForegroundClassName,
    trackForegroundClass,
    thumbWrapperClassName,
    thumbWrapperClass,
    ...rootProps
  } = props

  const resolvedTrackBgClass = resolveClassName(
    trackBackgroundClassName,
    trackBackgroundClass,
  )
  const resolvedTrackFgClass = resolveClassName(
    trackForegroundClassName,
    trackForegroundClass,
  )
  const resolvedThumbWrapperClass = resolveClassName(
    thumbWrapperClassName,
    thumbWrapperClass,
  )

  return (
    <SliderRoot ref={ref} {...rootProps}>
      <SliderTrack className={resolvedTrackBgClass} />
      <SliderRange className={resolvedTrackFgClass}>
        <SliderThumb className={resolvedThumbWrapperClass}>
          {thumb}
        </SliderThumb>
      </SliderRange>
    </SliderRoot>
  )
}
