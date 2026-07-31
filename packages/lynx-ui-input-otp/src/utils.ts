// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import type { InputOTPInputType, InputOTPLength } from './types'

const inputPatterns: Record<InputOTPInputType, RegExp> = {
  alphabetic: /[^a-z]/gi,
  numeric: /\D/g,
  alphanumeric: /[^a-z0-9]/gi,
}

export const nativeInputFilters: Record<InputOTPInputType, string> = {
  alphabetic: '[A-Za-z]',
  numeric: '[0-9]',
  alphanumeric: '[A-Za-z0-9]',
}

export function normalizeInputOTPLength(length: number): InputOTPLength {
  return length === 4 ? 4 : 6
}

export function normalizeOTPValue(
  value: string,
  length: InputOTPLength,
  inputType: InputOTPInputType = 'numeric',
): string {
  return value.replace(inputPatterns[inputType], '').slice(0, length)
}
