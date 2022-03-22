import { REACTION_ANONYMOUS_CART_TOKEN_COOKIE } from '@config/index'

export const getAnonymousCartToken = (id?: string) => {
  return id ?? localStorage.getItem(REACTION_ANONYMOUS_CART_TOKEN_COOKIE)
}

export const setAnonymousCartToken = (anonymousToken?: string) => {
  !anonymousToken
    ? localStorage.removeItem(REACTION_ANONYMOUS_CART_TOKEN_COOKIE)
    : localStorage.setItem(REACTION_ANONYMOUS_CART_TOKEN_COOKIE, anonymousToken)
}
