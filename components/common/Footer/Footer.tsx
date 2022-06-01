import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { Logo } from '@components/ui'
import s from './Footer.module.scss'
import Instagram from '@mui/icons-material/Instagram'
import Facebook from '@mui/icons-material/Facebook'
import Phone from '@components/icons/Phone'
import Mail from '@components/icons/Mail'
import { Entry } from 'contentful'
import { IPageFields } from '@lib/contentful/schema'

interface Props {
  className?: string
  children?: any
  pages?: Entry<IPageFields>[]
}

const links = [
  {
    title: 'Начало',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages = [] }) => {
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <div className="mx-auto px-4 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8
            border-b border-accents-3 py-12 text-primary
            transition-colors duration-150
          `}
        >
          <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <div className="grid md:grid-cols-3 md:grid-flow-col">
              <div className="flex flex-col gap-4">
                {links.map((link, key) => (
                  <Link href={link.url} key={`link-${key}`}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {link.title}
                    </a>
                  </Link>
                ))}
                {pages.map(({ fields }) => (
                  <Link href={`/article/${fields.slug}`} key={fields.slug}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {fields.title}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="h-[1px] w-full bg-accents-3 my-6 md:h-0" />
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <Phone />
                  <span className="pt-0.5">089 053 1968</span>
                </div>
                <div className="flex gap-3">
                  <Mail />
                  <span className="pt-0.5">info@airfit.bg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6 pb-10 flex flex-col-reverse items-center md:flex-row justify-between text-accent-6 text-sm">
          <span className="text-center">
            &copy; 2021 "Алт Требъл" ЕООД. Всички права запазени
          </span>
          <div className="flex space-x-4 pb-4">
            <Link href="https://www.instagram.com/airfitbg" passHref={true}>
              <a>
                <Instagram className="text-4xl md:text-3xl" />
              </a>
            </Link>
            <Link href="https://www.facebook.com/airfitbg" passHref={true}>
              <a>
                <Facebook className="text-4xl md:text-3xl" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
