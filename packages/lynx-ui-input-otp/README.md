# @lynx-js/lynx-ui-input-otp

A headless, configurable-length OTP and PIN input for ReactLynx. InputOTP owns
keyboard, focus, deletion, paste, filtering, and value state through one hidden
native input. Consumers compose the visible field with InputOTPSlot.

## Requirements

- **Lynx SDK**: >= 4.0

## Installation

```bash
pnpm add @lynx-js/lynx-ui
```

The standalone package is also available as
`@lynx-js/lynx-ui-input-otp`.

## Component structure

```tsx
<InputOTP length={4}>
  <InputOTPSlot index={0} />
  <InputOTPSlot index={1} />
  <InputOTPSlot index={2} />
  <InputOTPSlot index={3} />
</InputOTP>
```

- `InputOTP` owns the normalized controlled or uncontrolled value and the
  hidden native input.
- `InputOTPSlot` reads one character and its focused, filled, complete,
  disabled, and invalid states from context.

InputOTP and InputOTPSlot ship without visible styles. Use `className`,
`style`, injected `ui-*` variants, and render props to compose the
presentation.

[View examples](https://github.com/lynx-family/lynx-ui/tree/main/apps/examples/InputOTP)
