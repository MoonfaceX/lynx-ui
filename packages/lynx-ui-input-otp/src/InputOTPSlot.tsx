// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { memo } from '@lynx-js/react'

import { clsx } from 'clsx'

import { useInputOTPContext } from './InputOTPContext'
import type {
  InputOTPSlotProps,
  InputOTPSlotRenderProps,
  InputOTPSlot as InputOTPSlotType,
} from './types'

export const InputOTPSlot = memo(InputOTPSlotImpl) as InputOTPSlotType

function InputOTPSlotImpl(props: InputOTPSlotProps) {
  const {
    index,
    className,
    style,
    activeStyle,
    invalidStyle,
    digitClassName,
    digitStyle,
    caretClassName,
    caretStyle,
    children,
  } = props
  const context = useInputOTPContext()

  const {
    value,
    length,
    focused,
    disabled,
    invalid,
  } = context
  const char = value[index]
  const isFilled = char !== undefined
  const hasFakeCaret = focused
    && !disabled
    && value.length < length
    && index === value.length
  const slotState: InputOTPSlotRenderProps = {
    index,
    char,
    isActive: hasFakeCaret,
    isFilled,
    hasFakeCaret,
    disabled,
    invalid,
  }
  const renderedChildren = typeof children === 'function'
    ? children(slotState)
    : children

  return (
    <view
      className={clsx(className, {
        'ui-filled': isFilled,
        'ui-active': hasFakeCaret,
        'ui-disabled': disabled,
        'ui-invalid': invalid,
      })}
      style={{
        ...style,
        ...(hasFakeCaret ? activeStyle : undefined),
        ...(invalid ? invalidStyle : undefined),
      }}
    >
      {children === undefined
        ? (
          <>
            {char === undefined
              ? null
              : (
                <text className={digitClassName} style={digitStyle}>
                  {char}
                </text>
              )}
            {hasFakeCaret
              ? <view className={caretClassName} style={caretStyle} />
              : null}
          </>
        )
        : renderedChildren}
    </view>
  )
}
