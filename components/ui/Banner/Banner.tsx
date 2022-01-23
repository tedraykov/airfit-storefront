import { FC } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import s from './Banner.module.scss'
import banner from '/public/banner.webp'

interface BannerProps {
  className?: string
}

const Banner: FC<BannerProps> = ({ className }) => {
  const rootClassName = cn(s.root, {}, className)

  return (
    <div className={rootClassName}>
      <div className={s.content}>
        <header className="w-52 sm:w-full sm:max-w-sm mb-20 md:mb-0 px-6 z-20">
          <p className="text-accents-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Спортно оборудване за дома
          </p>
        </header>
        <span className={s.landingBannerBgText}>
          Спортно <br />
          оборудване за дома
        </span>
      </div>
      <Image
        className="absolute opacity-20"
        src={banner}
        placeholder="blur"
        layout="fill"
        objectFit="cover"
      />
    </div>
  )
}

export default Banner
