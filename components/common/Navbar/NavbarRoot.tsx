import { FC, useEffect, useState } from 'react'
import throttle from 'lodash.throttle'
import cn from 'classnames'
import s from './Navbar.module.css'
import useUI from '@hooks/useUI'

const NavbarRoot: FC = ({ children }) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const { isMobile } = useUI()

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled && setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [hasScrolled])

  return (
    <nav
      className={cn(s.root, {
        'md:shadow-magical': hasScrolled && !isMobile,
        'shadow-2xl': isMobile,
      })}
    >
      {children}
    </nav>
  )
}

export default NavbarRoot
