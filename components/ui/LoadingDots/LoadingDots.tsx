import { FC } from 'react'
import s from './LoadingDots.module.css'
import cn from 'classnames'

type LoadingDotsProps = {
  size?: 'medium' | 'small'
}

const LoadingDots: FC<LoadingDotsProps> = ({ size = 'medium' }) => {
  return (
    <span className={s.root}>
      <span
        className={cn(s.dot, {
          'h-2 w-2': size === 'medium',
          'h-1 w-1': size === 'small',
        })}
        key={`dot_1`}
      />
      <span
        className={cn(s.dot, {
          'h-2 w-2': size === 'medium',
          'h-1 w-1': size === 'small',
        })}
        key={`dot_2`}
      />
      <span
        className={cn(s.dot, {
          'h-2 w-2': size === 'medium',
          'h-1 w-1': size === 'small',
        })}
        key={`dot_3`}
      />
    </span>
  )
}

export default LoadingDots
