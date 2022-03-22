import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import getSlug from '@lib/get-slug'
import { Logo } from '@components/ui'
import s from './Footer.module.scss'
import { Page } from '@framework/types/page'
import Instagram from '@mui/icons-material/Instagram'
import Facebook from '@mui/icons-material/Facebook'
import Phone from '@components/icons/Phone'
import Mail from '@components/icons/Mail'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Начало',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const sitePages = usePages(pages).sitePages.map((sitePage) => ({
    ...sitePage,
    url: '/article' + sitePage.url,
  }))
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <div className="mx-auto px-4 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accents-3 py-12 text-primary transition-colors duration-150">
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
                {[...links, ...sitePages].map((page) => (
                  <span key={page.url}>
                    <Link href={page.url!}>
                      <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                        {page.name}
                      </a>
                    </Link>
                  </span>
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

function usePages(pages?: Page[]) {
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      return sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
