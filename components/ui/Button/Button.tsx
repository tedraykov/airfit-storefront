import cn from 'classnames'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { LoadingDots } from '@components/ui'
import ButtonUnstyled from '@mui/base/ButtonUnstyled'
import { ButtonUnstyledOwnProps } from '@mui/base/ButtonUnstyled/ButtonUnstyled.types'

export type ButtonProps = {
  href?: string
  className?: string
  variant?: 'text' | 'contained' | 'outlined' | string
  size?: 'normal' | 'slim' | 'icon'
  color?: 'primary' | 'secondary' | string
  round?: boolean
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  loading?: boolean
  disabled?: boolean
} & ButtonUnstyledOwnProps

const Button: React.FC<ButtonProps> = forwardRef(
  (
    {
      className,
      variant = 'contained',
      size = 'normal',
      color,
      round = false,
      children,
      active,
      loading = false,
      disabled = false,
      ...rest
    },
    buttonRef
  ) => {
    const rootClassName = twMerge(
      `
    cursor-pointer inline-flex rounded leading-6
    transition ease-in-out duration-150
    font-semibold text-center justify-center uppercase
    border border-transparent items-center
    focus:shadow-outline-normal focus:outline-none
    `,
      cn({
        // Variants
        // - Contained
        [`bg-secondary text-accents-1
        hover:bg-accents-0 hover:text-primary
        hover:border hover:border-secondary`]: variant === 'contained',
        // - Text
        [`text-primary bg-transparent border-none
        hover:bg-hover`]: variant === 'text',
        // - Outlined
        [`border border-accents-4
        hover:bg-hover hover:border-secondary`]: variant === 'outlined',
        // Sizes
        [`px-10 py-4`]: size === 'normal',
        [`px-4 py-2 transform-none normal-case`]: size === 'slim',
        [`px-2 py-2 hover:text-accents-7`]: size === 'icon',
        // Colors
        // - Secondary
        [`text-secondary border-primary
        hover:border-primary`]: color === 'secondary',
        // Other
        [`text-accents-1`]: color === 'secondary' && size === 'icon',
        [`bg-accents-1 text-accents-3 border-accents-2 cursor-not-allowed`]:
          loading,
        [`text-accents-4 border-accents-2 bg-accents-1 cursor-not-allowed
        grayscale hover:grayscale
        hover:text-accents-4 hover:border-accents-2 hover:bg-accents-1
        hover:cursor-not-allowed`]: disabled,
        [`rounded-full`]: round,
        [`bg-accents-1 border-secondary`]: active,
      }),
      className
    )

    return (
      <ButtonUnstyled
        aria-pressed={active}
        data-variant={variant}
        ref={buttonRef}
        className={rootClassName}
        disabled={disabled || loading}
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
  }
)

Button.displayName = 'Button'

export default Button
