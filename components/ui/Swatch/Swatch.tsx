import cn from 'classnames'
import { FC, memo } from 'react'
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

const Swatch: FC<Omit<ButtonProps, 'size'> & SwatchProps> = memo(
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

Swatch.displayName = 'Swatch'

export default Swatch
