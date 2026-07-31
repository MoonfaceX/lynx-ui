// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

interface CalculateKeyboardAwareScrollOffsetOptions {
  responderTop: number
  responderBottom: number
  scrollContentTop: number
  focusedBottom: number
  keyboardHeight: number
  focusedOffset: number
  screenOffset: number
}

export function calculateKeyboardAwareScrollOffset({
  responderTop,
  responderBottom,
  scrollContentTop,
  focusedBottom,
  keyboardHeight,
  focusedOffset,
  screenOffset,
}: CalculateKeyboardAwareScrollOffsetOptions): number {
  const currentScrollOffset = responderTop - scrollContentTop

  return currentScrollOffset
    + keyboardHeight
    + focusedBottom
    - responderBottom
    - focusedOffset
    + screenOffset
}
