import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import getSlug from '@lib/get-slug'
import { Logo, Container } from '@components/ui'
import s from './Footer.module.scss'
import { Page } from '@framework/types/page'

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
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accents-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
          <div>
            <span>&copy; 2021 "Алт Требъл" ЕООД. Всички права запазени</span>
          </div>
        </div>
      </Container>
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
