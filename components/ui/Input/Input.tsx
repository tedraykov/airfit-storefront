import cn from 'classnames'
import s from './Input.module.css'
import React, { InputHTMLAttributes, useState } from 'react'
import { Path, UseFormRegister, FieldError } from 'react-hook-form'
import Error from '@material-ui/icons/Error'
import Tooltip from '@material-ui/core/Tooltip'

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
    required,
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
        {...register?.(label ?? '')}
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
