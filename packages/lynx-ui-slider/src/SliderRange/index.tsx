// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { memo } from '@lynx-js/react'

import { useSliderContext } from '../context'
import type { SliderRangeProps } from '../types'
import { resolveClassName } from '../utils'

export const SliderRange = memo(function SliderRange(props: SliderRangeProps) {
  const { progressRef, currentProgress } = useSliderContext()
  const { children, className, class: classAttr, style, ...rest } = props
  const resolvedClass = resolveClassName(className, classAttr)

  return (
    <view
      ref={progressRef}
      {...rest}
      style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        height: '100%',
        overflow: 'visible',
        width: `${currentProgress.current * 100}%`,
      }}
    >
      <view class={resolvedClass} style={style} />
      {children}
    </view>
  )
})
