// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { describe, expect, it } from 'vitest'

import { normalizeInputOTPLength, normalizeOTPValue } from '../utils'

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

  it('limits four-character values', () => {
    expect(normalizeOTPValue('123456', 4)).toBe('1234')
  })

  it('limits six-character values', () => {
    expect(normalizeOTPValue('123456789', 6)).toBe('123456')
  })
})

describe('normalizeInputOTPLength', () => {
  it('supports four and six slots with a safe six-slot fallback', () => {
    expect(normalizeInputOTPLength(4)).toBe(4)
    expect(normalizeInputOTPLength(6)).toBe(6)
    expect(normalizeInputOTPLength(5)).toBe(6)
  })
})
