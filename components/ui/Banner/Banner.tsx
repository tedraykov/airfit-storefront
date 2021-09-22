import { FC, useRef } from 'react'
import cn from 'classnames'
import s from './Banner.module.scss'
import { Text } from '@components/ui'

interface BannerProps {
  className?: string
}

const Banner: FC<BannerProps> = ({ className }) => {
  const rootClassName = cn(s.root, {}, className)

  return (
    <div className={rootClassName}>
      <LandingBanner />
    </div>
  )
}

const LandingBanner: FC = () => {
  const bannerRef = useRef(null)

  return (
    <div ref={bannerRef} className="flex flex-col flex-1 justify-end">
      <header className="w-52 ml-6 mb-20 z-20">
        <Text variant="bannerHeading" className="text-accents-0 text-4xl">
          Спортно оборудване за дома
        </Text>
      </header>
      <span className={s.landingBannerBgText}>
        Спортно <br />
        оборудване за дома
      </span>
      <img
        src="https://images.ctfassets.net/9q0u06dganwf/43gGqEpAVRj2qTVvhWLMRw/7190f60980b78b60c44d43ca4ba894f7/image.webp"
        alt="Dumbbell banner"
        className={s.landingBannerImg}
      />
    </div>
  )
}

export default Banner
