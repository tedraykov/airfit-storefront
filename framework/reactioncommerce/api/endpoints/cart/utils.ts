import { ReactionCommerceConfig } from '@framework/api'
import getCartCookie from '@framework/api/utils/get-cart-cookie'

export const cartNeedsToBeReconciled = (
  cookies: { [p: string]: string },
  config: ReactionCommerceConfig
): boolean =>
  !!cookies[config.cartIdCookie] &&
  !!cookies[config.anonymousCartTokenCookie ?? ''] &&
  !!cookies[config.customerCookie]

export const anonymousCartIsPresent = (
  cookies: { [p: string]: string },
  config: ReactionCommerceConfig
): boolean =>
  !!cookies[config.cartIdCookie] &&
  !!cookies[config.anonymousCartTokenCookie ?? '']

export const accountCartIsPresent = (
  cookies: { [p: string]: string },
  config: ReactionCommerceConfig
): boolean =>
  !!cookies[config.customerCookie] &&
  !cookies[config.anonymousCartTokenCookie ?? '']

export const updateCookiesForAnonymousCart = (
  createdCart: any,
  res: any,
  config: ReactionCommerceConfig
) => {
  return res.setHeader('Set-Cookie', [
    getCartCookie(
      config.anonymousCartTokenCookie ?? '',
      createdCart.data.createCart.token,
      60 * 60 * 168
    ),
    getCartCookie(
      config.cartIdCookie,
      createdCart.data.createCart.cart._id,
      60 * 60 * 168
    ),
  ])
}

/**
 * Clear the anonymous cart token cookie and update cart ID cookie
 */
export const updateCookiesForReconciledCart = (
  cartId: string,
  res: any,
  config: ReactionCommerceConfig
): void => {
  res.setHeader('Set-Cookie', [
    getCartCookie(config.anonymousCartTokenCookie ?? ''),
    getCartCookie(config.cartIdCookie, cartId, 60 * 60 * 168),
  ])
}

export const updateCookiesForAccountCart = (
  cartId: string,
  res: any,
  config: ReactionCommerceConfig
) => {
  res.setHeader('Set-Cookie', [
    getCartCookie(config.cartIdCookie, cartId, 60 * 60 * 168),
    getCartCookie(config.anonymousCartTokenCookie ?? ''),
  ])
}

/**
 * If there's no cart for now, store a dummy cart ID to keep
 * Next Commerce happy
 */
export const setDummyCartCookie = (
  res: any,
  config: ReactionCommerceConfig
): void =>
  res.setHeader('Set-Cookie', [
    getCartCookie(config.cartIdCookie, config.dummyEmptyCartId, 60 * 60 * 168),
    getCartCookie(config.anonymousCartTokenCookie ?? ''),
  ])
