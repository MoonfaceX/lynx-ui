// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { memo } from '@lynx-js/react'

import type { SliderTrackProps } from '../types'
import { resolveClassName } from '../utils'

export const SliderTrack = memo(function SliderTrack(props: SliderTrackProps) {
  const { className, class: classAttr, style, ...rest } = props
  const resolvedClass = resolveClassName(className, classAttr)

  return <view {...rest} class={resolvedClass} style={style} />
})
