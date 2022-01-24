import cn from 'classnames'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react'
import mergeRefs from 'react-merge-refs'
import s from './Button.module.css'
import { LoadingDots } from '@components/ui'
import ButtonUnstyled from '@mui/base/ButtonUnstyled'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'text' | 'contained' | 'outlined' | string
  size?: 'normal' | 'slim' | 'icon'
  color?: 'primary' | 'secondary' | string
  round?: boolean
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'contained',
    size = 'normal',
    color,
    round = false,
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)

  const rootClassName = cn(
    s.root,
    {
      // Variants
      [s.contained]: variant === 'contained',
      [s.text]: variant === 'text',
      [s.outlined]: variant === 'outlined',
      // Sizes
      [s.normal]: size === 'normal',
      [s.slim]: size === 'slim',
      [s.icon]: size === 'icon',
      // Colors
      [s.secondary]: color === 'secondary',
      // Other
      [s.loading]: loading,
      [s.disabled]: disabled,
      [s.round]: round,
      [s.active]: active,
    },
    className
  )

  return (
    <ButtonUnstyled
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {!loading && children}
      {loading && (
        <i className="pl-2 h-6 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </ButtonUnstyled>
  )
})

Button.displayName = 'Button'

export default Button
