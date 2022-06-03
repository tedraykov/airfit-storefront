import cn from 'classnames'
import { FC, ReactNode } from 'react'
import s from './FeatureBar.module.css'

interface FeatureBarProps {
  className?: string
  title: string | ReactNode
  description?: string | ReactNode
  hide?: boolean
  action?: ReactNode
}

const FeatureBar: FC<FeatureBarProps> = ({
  title,
  description,
  className,
  action,
  hide,
}) => {
  const rootClassName = cn(
    s.root,
    {
      transform: true,
      'translate-y-0 opacity-100': !hide,
      'translate-y-full opacity-0': hide,
    },
    className
  )

  if (hide) return null

  return (
    <div className={rootClassName}>
      <span className="block md:inline">{title}</span>
      <span className="block mb-6 md:inline md:mb-0 md:ml-2">
        {description}
      </span>
      {action && action}
    </div>
  )
}

export default FeatureBar
