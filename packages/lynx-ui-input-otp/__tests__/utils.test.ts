// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { describe, expect, it } from 'vitest'

import { normalizeInputOTPLength, normalizeOTPValue } from '../src/utils'

describe('normalizeOTPValue', () => {
  it('keeps only ASCII digits by default', () => {
    expect(normalizeOTPValue('a6-5 1.4b', 6)).toBe('6514')
  })

  it('supports alphabetic input', () => {
    expect(normalizeOTPValue('A1-b_Çz', 6, 'alphabetic')).toBe('Abz')
  })

  it('supports alphanumeric input', () => {
    expect(normalizeOTPValue('A1-b_2Çz', 6, 'alphanumeric')).toBe('A1b2z')
  })

  it('limits values to the configured length', () => {
    expect(normalizeOTPValue('123456', 5)).toBe('12345')
    expect(normalizeOTPValue('123456789', 8)).toBe('12345678')
  })
})

describe('normalizeInputOTPLength', () => {
  it('supports any positive integer', () => {
    expect(normalizeInputOTPLength(1)).toBe(1)
    expect(normalizeInputOTPLength(4)).toBe(4)
    expect(normalizeInputOTPLength(5)).toBe(5)
    expect(normalizeInputOTPLength(8)).toBe(8)
  })

  it('falls back to six slots for invalid values', () => {
    expect(normalizeInputOTPLength(0)).toBe(6)
    expect(normalizeInputOTPLength(-1)).toBe(6)
    expect(normalizeInputOTPLength(1.5)).toBe(6)
    expect(normalizeInputOTPLength(Number.NaN)).toBe(6)
    expect(normalizeInputOTPLength(Number.POSITIVE_INFINITY)).toBe(6)
  })
})
