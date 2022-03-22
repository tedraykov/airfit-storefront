import { REACTION_CART_ID_COOKIE } from '@config/index'

export const getCartId = (id?: string) => {
  return id ?? localStorage.getItem(REACTION_CART_ID_COOKIE)
}

export const setCartIdCookie = (id: string | null): void => {
  !id
    ? localStorage.removeItem(REACTION_CART_ID_COOKIE)
    : localStorage.setItem(REACTION_CART_ID_COOKIE, id)
}
