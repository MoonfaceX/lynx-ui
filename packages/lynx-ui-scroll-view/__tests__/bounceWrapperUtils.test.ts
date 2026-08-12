// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { describe, expect, it } from 'vitest'

import { getBounceWrapperStyle } from '../src/bounceWrapperUtils'

describe('bounce wrapper style', () => {
  it('copies the scroll view radius to the vertical clipping wrapper', () => {
    expect(getBounceWrapperStyle({
      width: '100%',
      height: '420px',
      borderRadius: '20px',
      backgroundColor: 'red',
    }, false)).toMatchObject({
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      width: '100%',
      height: '420px',
      borderRadius: '20px',
    })
  })

  it('copies individual radii to the horizontal clipping wrapper', () => {
    expect(getBounceWrapperStyle({
      width: '320px',
      height: '100%',
      borderStartStartRadius: '12px',
      borderEndEndRadius: '18px',
    }, true)).toMatchObject({
      overflow: 'hidden',
      width: '320px',
      height: '100%',
      borderStartStartRadius: '12px',
      borderEndEndRadius: '18px',
    })
  })
})
