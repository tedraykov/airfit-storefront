import { FC, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Container, Logo } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import Search from '@components/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import cn from 'classnames'
import { Collapse } from '@material-ui/core'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <NavbarRoot>
      <Container>
        <div className={s.nav}>
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className={s.navMenu}>
              <Link href="/search">
                <a className={s.link}>ВСИЧКИ</a>
              </Link>
              {links?.map((l) => (
                <Link href={l.href} key={l.href}>
                  <a className={s.link}>{l.label}</a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>

          <div className="flex items-center justify-end flex-1">
            <div className="mr-3 lg:hidden">
              <IconButton
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <Search className="h-5 w-5" />
              </IconButton>
            </div>
            <UserNav />
          </div>
        </div>
        <Collapse in={showMobileSearch}>
          <div className={cn(s.mobileSearch)}>
            <Searchbar id="mobile-search" className="mb-4 overflow-hidden" />
          </div>
        </Collapse>
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
