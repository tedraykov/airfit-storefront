import React from 'react'
import { CartContext } from '@context/CartContext'

export default function useCartStore() {
  const context = React.useContext(CartContext)
  if (context === undefined) {
    throw new Error(`useCartStore must be used within a CartProvider`)
  }
  return context
}
