import cn from 'classnames'
import React from 'react'
import s from './Swatch.module.scss'
import { Check } from '@components/icons'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'

interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  color?: string
  label?: string | null
}

const Swatch: React.FC<Omit<ButtonProps, 'size'> & SwatchProps> = React.memo(
  ({ active, className, color, label = null, ...props }) => {
    if (label) {
      label = label?.toLowerCase()
    }

    const swatchClassName = cn(
      s.swatch,
      {
        [s.color]: color,
        [s.active]: active,
        [s.dark]: color ? isDark(color) : false,
        [s.textLabel]: !color && label && label.length > 3,
      },
      className
    )

    return (
      <Button
        aria-label="Variant Swatch"
        variant="outlined"
        round
        className={swatchClassName}
        {...(label && color && { title: label })}
        style={color ? { backgroundColor: color } : {}}
        {...props}
      >
        {color && active && (
          <span>
            <Check />
          </span>
        )}
        {label}
      </Button>
    )
  }
)

export default Swatch
