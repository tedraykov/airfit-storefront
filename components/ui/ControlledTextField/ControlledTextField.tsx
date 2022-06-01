import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FilledInput from '@mui/material/FilledInput'
import { InputProps } from '@mui/material/Input'

type ControlledTextFieldProps = InputProps & {
  name: string
  defaultValue: string
  label: string
  control: Control<any>
  rules?: Object
  helperText?: string
}

const ControlledTextField: FC<ControlledTextFieldProps> = ({
  name,
  defaultValue,
  label,
  control,
  helperText,
  rules,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error, invalid } }) => {
        return (
          <FormControl fullWidth>
            <FormLabel error={invalid} htmlFor={name}>
              {label}
            </FormLabel>
            <FilledInput id={name} error={invalid} {...field} {...rest} />
            {invalid && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {error?.message || 'Грешка'}
              </FormHelperText>
            )}
            {!invalid && helperText && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {helperText}
              </FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}

export default ControlledTextField
