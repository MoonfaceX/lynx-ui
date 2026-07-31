// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { root, useState } from '@lynx-js/react'

import { InputOTP, InputOTPSlot } from '@lynx-js/lynx-ui'
import type { InputOTPInputType, InputOTPLength } from '@lynx-js/lynx-ui'

import '../styles.css'
import './index.css'

interface SlotSetProps {
  length: InputOTPLength
  masked?: boolean
}

function SlotSet({ length, masked = false }: SlotSetProps) {
  return Array.from({ length }, (_, index) => (
    <InputOTPSlot
      key={index}
      caretClassName='otp-caret'
      className='otp-slot'
      digitClassName='otp-digit'
      index={index}
    >
      {masked
        ? ({ isFilled }) =>
          isFilled ? <text className='otp-digit'>•</text> : null
        : undefined}
    </InputOTPSlot>
  ))
}

interface TypeRowProps {
  defaultValue: string
  inputType: InputOTPInputType
  label: string
}

function TypeRow({
  defaultValue,
  inputType,
  label,
}: TypeRowProps) {
  return (
    <view className='type-row'>
      <text className='row-label'>{label}</text>
      <InputOTP
        className='otp-field otp-field--compact'
        defaultValue={defaultValue}
        inputType={inputType}
        length={4}
      >
        <SlotSet length={4} />
      </InputOTP>
    </view>
  )
}

function App() {
  const [value, setValue] = useState('65')
  const [completeValue, setCompleteValue] = useState('')

  return (
    <scroll-view scroll-y className='cap-page lunaris-dark'>
      <view className='cap-content'>
        <text className='cap-title'>InputOTP capabilities</text>
        <text className='cap-description'>
          Headless composition for verification codes and PINs.
        </text>

        <view className='cap-section'>
          <view className='section-heading'>
            <text className='section-title'>Controlled numeric value</text>
            <text className='section-meta'>
              {completeValue ? `Complete: ${completeValue}` : `Value: ${value}`}
            </text>
          </view>
          <InputOTP
            className='otp-field'
            inputType='numeric'
            length={6}
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue)
              setCompleteValue('')
            }}
            onComplete={setCompleteValue}
          >
            <SlotSet length={6} />
          </InputOTP>
        </view>

        <view className='cap-section'>
          <text className='section-title'>Accepted character sets</text>
          <TypeRow
            defaultValue='AB-cd1'
            inputType='alphabetic'
            label='Alphabetic'
          />
          <TypeRow
            defaultValue='6a51.4'
            inputType='numeric'
            label='Numeric'
          />
          <TypeRow
            defaultValue='A1-b2'
            inputType='alphanumeric'
            label='Alphanumeric'
          />
        </view>

        <view className='cap-section'>
          <text className='section-title'>Disabled and invalid states</text>
          <view className='state-grid'>
            <view className='state-column'>
              <text className='row-label'>Disabled</text>
              <InputOTP
                disabled
                className='otp-field otp-field--compact'
                defaultValue='6514'
                length={4}
              >
                <SlotSet length={4} />
              </InputOTP>
            </view>
            <view className='state-column'>
              <text className='row-label error-text'>Invalid</text>
              <InputOTP
                invalid
                className='otp-field otp-field--compact'
                defaultValue='6174'
                length={4}
              >
                <SlotSet length={4} />
              </InputOTP>
            </view>
          </view>
        </view>

        <view className='cap-section'>
          <text className='section-title'>Masking and separators</text>
          <view className='type-row'>
            <text className='row-label'>Masked</text>
            <InputOTP
              className='otp-field otp-field--compact'
              defaultValue='6514'
              length={4}
            >
              <SlotSet length={4} masked />
            </InputOTP>
          </view>
          <view className='type-row'>
            <text className='row-label'>Grouped</text>
            <InputOTP
              className='otp-field otp-field--grouped'
              defaultValue='651468'
              length={6}
            >
              <InputOTPSlot
                caretClassName='otp-caret'
                className='otp-slot'
                digitClassName='otp-digit'
                index={0}
              />
              <InputOTPSlot
                caretClassName='otp-caret'
                className='otp-slot'
                digitClassName='otp-digit'
                index={1}
              />
              <text className='separator'>−</text>
              <InputOTPSlot
                caretClassName='otp-caret'
                className='otp-slot'
                digitClassName='otp-digit'
                index={2}
              />
              <InputOTPSlot
                caretClassName='otp-caret'
                className='otp-slot'
                digitClassName='otp-digit'
                index={3}
              />
              <text className='separator'>−</text>
              <InputOTPSlot
                caretClassName='otp-caret'
                className='otp-slot'
                digitClassName='otp-digit'
                index={4}
              />
              <InputOTPSlot
                caretClassName='otp-caret'
                className='otp-slot'
                digitClassName='otp-digit'
                index={5}
              />
            </InputOTP>
          </view>
        </view>
      </view>
    </scroll-view>
  )
}

root.render(<App />)

export default App
