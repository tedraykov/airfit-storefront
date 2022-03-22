import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import useCustomer from '@framework/customer/use-customer'
import { Avatar } from '@components/common'
import { Heart, Bag } from '@components/icons'
import useUI from '@hooks/useUI'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.scss'
import { Button } from '@components/ui'
import useCart from '@hooks/cart/useCart'
import CircularProgress from '@mui/material/CircularProgress'

interface Props {
  className?: string
}

const UserNav: FC<Props> = ({ className }) => {
  const { cart, loading } = useCart()
  const { data: customer } = useCustomer()
  const { toggleSidebar, closeSidebarIfPresent, openModal, setSidebarView } =
    useUI()
  const itemsCount = cart?.totalItemQuantity ?? 0

  const toggleCart = () => {
    setSidebarView('CART_VIEW')
    toggleSidebar()
  }

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <Button
            variant="text"
            size="icon"
            color="transparent"
            className={s.item}
            onClick={toggleCart}
          >
            <Bag />
            {loading ? (
              <span className={s.bagCount}>
                <CircularProgress
                  disableShrink
                  color="inherit"
                  size={10}
                  thickness={6}
                />
              </span>
            ) : (
              itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>
            )}
          </Button>
          {process.env.COMMERCE_WISHLIST_ENABLED && (
            <li className={s.item}>
              <Link href="/wishlist">
                <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                  <Heart />
                </a>
              </Link>
            </li>
          )}
          <li className={cn(s.item, s.avatar)}>
            {customer ? (
              <DropdownMenu />
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
