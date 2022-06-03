import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import React, { FC } from 'react'
import useUI from '@hooks/useUI'
import { Footer, Navbar } from '@components/common'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Button, LoadingDots, Modal } from '@components/ui'
import CartSidebarView from '@components/cart/CartSidebarView'

import LoginView from '@components/auth/LoginView'
import Drawer from '@mui/material/Drawer'
import { NavigationTree } from '@graphql/schema'
import { Entry } from 'contentful'
import { IPageFields } from '@lib/contentful/schema'

const SignUpView = dynamic(() => import('@components/auth/SignUpView'), {
  loading: () => (
    <div className="w-80 h-80 flex items-center text-center justify-center p-3">
      <LoadingDots />
    </div>
  ),
  ssr: false,
})

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  {
    loading: () => (
      <div className="w-80 h-80 flex items-center text-center justify-center p-3">
        <LoadingDots />
      </div>
    ),
    ssr: false,
  }
)

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  loading: () => (
    <div className="w-80 h-80 flex items-center text-center justify-center p-3">
      <LoadingDots />
    </div>
  ),
  ssr: false,
})

interface Props {
  pageProps: {
    pages?: Entry<IPageFields>[]
    categories: NavigationTree
  }
}

const ModalView: FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignUpView />}
      {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
    </Modal>
  )
}

const ModalUI: FC = () => {
  const { displayModal, closeModal, modalView } = useUI()
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null
}

const SidebarView: FC<{ sidebarView: string }> = ({ sidebarView }) => {
  return <>{sidebarView === 'CART_VIEW' && <CartSidebarView />}</>
}

const SidebarUI: FC = () => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI()

  return (
    <Drawer anchor="right" open={displaySidebar} onClose={closeSidebar}>
      <SidebarView sidebarView={sidebarView} />
    </Drawer>
  )
}

const Layout: FC<Props> = ({
  children,
  pageProps: { categories, ...pageProps },
}) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  const navBarLinks = [
    {
      href: '/',
      label: 'ВСИЧКИ',
    },
  ]

  ;(categories as NavigationTree)?.items.forEach((c) => {
    navBarLinks.push({
      label: c.navigationItem.data.contentForLanguage,
      href: `/search${c.navigationItem.data.url}`,
    })
  })

  return (
    <div className={cn(s.root)}>
      <Navbar links={navBarLinks} />
      <main className="flex-1 md:pt-[70px]">{children}</main>
      <Footer pages={pageProps.pages} />
      <ModalUI />
      <SidebarUI />
      <FeatureBar
        title="Този сайт използва бисквитки за да подобри използването на сайта. Приемайки, се съгласявате с нашите общи условия."
        hide={acceptedCookies}
        action={
          <Button className="mx-5" onClick={onAcceptCookies}>
            Приеми бисквитки
          </Button>
        }
      />
    </div>
  )
}

export const StrippedLayout: FC<Props> = ({ children, pageProps: {} }) => {
  return <div className={cn(s.root)}>{children}</div>
}

export default Layout
