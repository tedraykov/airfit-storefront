import Cookies from 'js-cookie'
import { REACTION_CART_ID_COOKIE } from '../const'

export const getCartIdCookie = (id?: string) => {
  return id ?? Cookies.get(REACTION_CART_ID_COOKIE)
}

export const setCartIdCookie = (id: string | null): void => {
  if (!id) {
    Cookies.remove(REACTION_CART_ID_COOKIE)
  } else {
    Cookies.set(REACTION_CART_ID_COOKIE, id)
  }
}
