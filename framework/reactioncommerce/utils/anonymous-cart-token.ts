import Cookies from 'js-cookie'
import { REACTION_ANONYMOUS_CART_TOKEN_COOKIE } from '../const'

export const getAnonymousCartToken = (id?: string) => {
  return id ?? Cookies.get(REACTION_ANONYMOUS_CART_TOKEN_COOKIE)
}

export const setAnonymousCartToken = (anonymousToken?: string) => {
  if (!anonymousToken) {
    Cookies.remove(REACTION_ANONYMOUS_CART_TOKEN_COOKIE)
  } else {
    Cookies.set(REACTION_ANONYMOUS_CART_TOKEN_COOKIE, anonymousToken)
  }
}
