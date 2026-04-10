// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

export const clamp01 = (value: number): number => {
  if (!Number.isFinite(value)) return 0
  return Math.min(Math.max(value, 0), 1)
}

export const getTouchX = (event: unknown): number => {
  const detail =
    typeof event === 'object' && event !== null && 'detail' in event
      ? event.detail
      : undefined
  const x = typeof detail === 'object' && detail !== null && 'x' in detail
    ? detail.x
    : undefined
  return Number(x)
}

export const resolveClassName = (
  className?: string,
  classAttr?: string,
): string | undefined => className ?? classAttr
