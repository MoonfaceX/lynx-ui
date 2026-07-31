// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { createContext, useContext } from '@lynx-js/react'

import type { InputOTPRenderProps } from './types'

export const InputOTPContext = createContext<InputOTPRenderProps | null>(null)

export function useInputOTPContext(): InputOTPRenderProps {
  const context = useContext(InputOTPContext)

  if (!context) {
    throw new Error('InputOTPSlot must be used within InputOTP.')
  }

  return context
}
