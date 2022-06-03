import cn from 'classnames'
import s from './Input.module.css'
import React, { forwardRef, InputHTMLAttributes } from 'react'
import { Path, UseFormRegister, FieldError } from 'react-hook-form'
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onChange?: (...args: any[]) => any
  label?: Path<any>
  register?: UseFormRegister<any>
  required?: boolean
  error?: FieldError
}

const InputElement = () => {
  return <input type="text" />
}
type InputProps = {
  className: string
} & InputUnstyledProps
const Input = forwardRef(function Input(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <InputUnstyled
      components={{
        Input: InputElement,
      }}
      {...props}
      ref={ref}
    />
  )
})

export default Input
