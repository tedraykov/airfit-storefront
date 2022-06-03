import { Control, Controller } from 'react-hook-form'
import React from 'react'
import Autocomplete from '@components/ui/Autocomplete'
import { AutocompleteProps } from '@components/ui/Autocomplete/Autocomplete'

type ControlledAutocompleteProps<T extends Object> = {
  name: string
  defaultValue?: string
  label: string
  control: Control<any>
  rules?: Object
} & AutocompleteProps<T>

function ControlledAutocomplete<T extends Object>({
  name,
  defaultValue = '',
  control,
  rules,
  ...autocompleteProps
}: ControlledAutocompleteProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({
        field: { ref, onChange, ...field },
        fieldState: { error, invalid },
      }) => {
        return (
          <Autocomplete
            error={error?.message}
            onChange={(value) => {
              console.log(value)
              onChange(value)
            }}
            {...field}
            {...autocompleteProps}
          />
        )
      }}
    />
  )
}

export default ControlledAutocomplete
