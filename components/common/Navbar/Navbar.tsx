import { FC, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Button, Container, Logo } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import Search from '@components/icons/Search'
import cn from 'classnames'
import Collapse from '@mui/material/Collapse'
import DrawerIcon from '@components/icons/Drawer'
import MobileDrawer from '@components/common/NavDrawer'
import useUI from '@hooks/useUI'

export interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const { isTablet } = useUI()
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [showTabletSearch, setShowTabletSearch] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setMobileDrawerOpen((prev) => !prev)
  }

  const toggleSearch = () => {
    if (isTablet) {
      return setShowTabletSearch(!showTabletSearch)
    }
    setShowMobileSearch(!showMobileSearch)
  }

  return (
    <NavbarRoot>
      <Container>
        <Collapse in={showMobileSearch}>
          <div className={cn(s.mobileSearch)}>
            <Searchbar id="mobile-search" className="mt-4 overflow-hidden" />
          </div>
        </Collapse>
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
              <Button variant="transparent" size="icon" onClick={toggleSearch}>
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <UserNav />
            <div className="lg:hidden">
              <Button variant="transparent" size="icon" onClick={toggleDrawer}>
                <DrawerIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <Collapse in={showTabletSearch}>
          <div className={cn(s.mobileSearch)}>
            <Searchbar id="tablet-search" className="mb-4 overflow-hidden" />
          </div>
        </Collapse>
      </Container>
      <MobileDrawer
        open={mobileDrawerOpen}
        links={links}
        onClose={() => setMobileDrawerOpen(false)}
      />
    </NavbarRoot>
  )
}

export default Navbar
