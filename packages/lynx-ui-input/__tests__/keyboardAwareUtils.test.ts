// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { describe, expect, it } from 'vitest'

import { calculateKeyboardAwareScrollOffset } from '../src/keyboardAwareUtils'

describe('calculateKeyboardAwareScrollOffset', () => {
  it('preserves the current scroll offset while avoiding the keyboard', () => {
    expect(
      calculateKeyboardAwareScrollOffset({
        responderTop: 0,
        responderBottom: 894,
        scrollContentTop: -584,
        focusedBottom: 798,
        keyboardHeight: 336,
        focusedOffset: 0,
        screenOffset: 0,
      }),
    ).toBe(824)
  })

  it('accounts for responder position and configured offsets', () => {
    expect(
      calculateKeyboardAwareScrollOffset({
        responderTop: 20,
        responderBottom: 820,
        scrollContentTop: -280,
        focusedBottom: 760,
        keyboardHeight: 300,
        focusedOffset: 16,
        screenOffset: -24,
      }),
    ).toBe(500)
  })
})
