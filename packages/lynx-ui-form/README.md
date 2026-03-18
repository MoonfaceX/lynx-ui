# @lynx-js/lynx-ui-form

`@lynx-js/lynx-ui-form` provides the **Form** primitives in lynx-ui.

## Introduction

Headless form primitives for root, field registration, and submit button coordination.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-form
```

## Usage

```tsx
import { FormRoot, FormField, FormSubmitButton } from '@lynx-js/lynx-ui-form'

export function BasicForm() {
  return (
    <FormRoot>
      <FormField name='email'>{() => <input />}</FormField>
      <FormSubmitButton>Submit</FormSubmitButton>
    </FormRoot>
  )
}
```

## Public exports

```ts
export { FormRoot, FormSubmitButton, FormField } from './Form'
export { FormContext } from './FormContext'
export type {
  FormRootProps,
  FormSubmitButtonProps,
  FormFieldProps,
} from './types'
```

> The export list above is generated from `src/index.ts` or `src/index.tsx` in this package.

## License

Apache-2.0
