# @lynx-js/lynx-ui-form

`@lynx-js/lynx-ui-form` provides the `Form` primitives in lynx-ui.

## Introduction

`FormRoot` owns the form values, `FormField` binds individual fields to Lynx UI
components such as `Input`, `TextArea`, `Checkbox`, `Switch`, and
`RadioGroupRoot`, and `FormSubmitButton` submits the collected values. The
examples cover both a standard form flow and a keyboard-aware form inside a
scrollable layout.

## Installation

```bash
pnpm add @lynx-js/lynx-ui-form
```

## Usage

```tsx
import { CheckboxIndicator } from '@lynx-js/lynx-ui-checkbox'
import { FormField, FormRoot, FormSubmitButton } from '@lynx-js/lynx-ui-form'
import { Radio, RadioIndicator } from '@lynx-js/lynx-ui-radio-group'

export function BasicForm() {
  return (
    <FormRoot
      initialValues={{ workspaceType: '', workspaceName: 'My Workspace' }}
      onChanged={(values) => console.info(values)}
    >
      <FormField as='RadioGroupRoot' name='workspaceType'>
        <Radio value='team'>
          <RadioIndicator />
          <text>Team</text>
        </Radio>
        <Radio value='personal'>
          <RadioIndicator />
          <text>Personal</text>
        </Radio>
      </FormField>

      <FormField
        as='Input'
        name='workspaceName'
        placeholder='Workspace name'
      />

      <FormField as='Checkbox' name='agreement'>
        <CheckboxIndicator />
        <text>I agree to the terms</text>
      </FormField>

      <FormSubmitButton onSubmit={(values) => console.info(values)}>
        <text>Submit</text>
      </FormSubmitButton>
    </FormRoot>
  )
}
```

Wrap the form with `KeyboardAwareRoot`, `KeyboardAwareResponder`, and
`KeyboardAwareTrigger` when the focused field should stay visible inside a long
scroll, as shown in the `KeyboardAware` example.

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
