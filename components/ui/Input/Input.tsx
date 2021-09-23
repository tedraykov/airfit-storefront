import cn from 'classnames'
import s from './Input.module.css'
import React, { InputHTMLAttributes, useState } from 'react'
import { Path, UseFormRegister, FieldError } from 'react-hook-form'
import Error from '@mui/icons-material/Error'
import Tooltip from '@mui/material/Tooltip'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onChange?: (...args: any[]) => any
  label?: Path<any>
  register?: UseFormRegister<any>
  required?: boolean
  error?: FieldError
}

const Input: React.FC<Props> = (props) => {
  const {
    className,
    children,
    onChange,
    register,
    label,
    required = false,
    error,
    ...rest
  } = props

  const [tooltipOpen, setTooltipOpen] = useState(false)

  const rootClassName = cn(
    s.root,
    {
      [s.error]: !!error,
    },
    className
  )

  const showTooltip = () => {
    if (!error) return
    setTooltipOpen(true)
  }

  const hideTooltip = () => {
    if (!error) return
    setTooltipOpen(false)
  }

  const handleValueChanged = (e: any) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  return (
    <label
      onFocus={showTooltip}
      onBlur={hideTooltip}
      htmlFor={label}
      className={rootClassName}
    >
      <input
        size={1}
        className={s.input}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        onChange={handleValueChanged}
        {...register?.(label ?? '', { required })}
        {...rest}
      />
      {error && (
        <Tooltip
          open={tooltipOpen}
          title={error.message ?? 'Грешка'}
          arrow
          placement="bottom-end"
        >
          <Error
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            color="error"
          />
        </Tooltip>
      )}
    </label>
  )
}

export default Input
