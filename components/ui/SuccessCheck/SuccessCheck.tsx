import { FC } from 'react'
import s from './SuccessCheck.module.scss'
import cn from 'classnames'

export const SuccessCheck: FC = () => {
  return (
    <div className={s.successCheckmark}>
      <div className={s.checkIcon}>
        <span className={cn(s.iconLine, s.lineTip)}/>
        <span className={cn(s.iconLine, s.lineLong)}/>
        <div className={s.iconCircle}/>
        <div className={s.iconFix}/>
      </div>
    </div>
  )
}
