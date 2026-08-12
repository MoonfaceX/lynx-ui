// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// Older ReactLynx versions incorrectly tree-shake files that only contain
// main thread functions, so this file must also contain a BTS function.
export function nativeBounceUtilsDummyBTS(): void {
  // Intentionally empty
}

export function getNativeBounceMetricsMT(
  offset: number,
  scrollSize: number,
  viewportSize: number,
  enableUpper: boolean,
  enableLower: boolean,
) {
  'main thread'
  const maxScrollOffset = Math.max(0, scrollSize - viewportSize)

  return {
    maxScrollOffset,
    upperDistance: enableUpper ? Math.max(0, -offset) : 0,
    lowerDistance: enableLower
      ? Math.max(0, offset - maxScrollOffset)
      : 0,
  }
}
