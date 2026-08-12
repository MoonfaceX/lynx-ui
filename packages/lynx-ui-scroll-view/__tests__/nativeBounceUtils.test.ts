// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { describe, expect, it } from 'vitest'

import { getNativeBounceMetricsMT } from '../src/hooks/nativeBounceUtils'

describe('native bounce metrics', () => {
  it('keeps the upper bounce distance while the native offset is negative', () => {
    expect(getNativeBounceMetricsMT(-16.7, 1216, 640, true, true)).toEqual({
      maxScrollOffset: 576,
      upperDistance: 16.7,
      lowerDistance: 0,
    })
  })

  it('keeps the lower bounce distance past the maximum scroll offset', () => {
    expect(getNativeBounceMetricsMT(610, 1216, 640, true, true)).toEqual({
      maxScrollOffset: 576,
      upperDistance: 0,
      lowerDistance: 34,
    })
  })

  it('returns no bounce distance inside the scrollable range', () => {
    expect(getNativeBounceMetricsMT(240, 1216, 640, true, true)).toEqual({
      maxScrollOffset: 576,
      upperDistance: 0,
      lowerDistance: 0,
    })
  })

  it('respects disabled bounce directions', () => {
    expect(getNativeBounceMetricsMT(-20, 1216, 640, false, true)).toEqual({
      maxScrollOffset: 576,
      upperDistance: 0,
      lowerDistance: 0,
    })
    expect(getNativeBounceMetricsMT(600, 1216, 640, true, false)).toEqual({
      maxScrollOffset: 576,
      upperDistance: 0,
      lowerDistance: 0,
    })
  })
})
