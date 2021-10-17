import React, { FC } from 'react'
import Container from '@mui/material/Container'
import s from './Hero.module.css'

interface Props {
  className?: string
  headline: string
  description: string
}

const Hero: FC<Props> = ({ headline, description }) => {
  return (
    <div className="bg-black">
      <Container maxWidth="xl">
        <div className={s.root}>
          <h1 className="text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            {headline}
          </h1>
          <div className="flex flex-col justify-between">
            <p className="mt-5 text-xl leading-7 text-accent-2 text-white">
              {description}
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
