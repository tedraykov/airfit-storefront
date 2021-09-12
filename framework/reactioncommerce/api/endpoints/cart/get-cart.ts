import reconcileCarts from '@framework/api/utils/reconcile-cart'
import getViewerId from '@framework/customer/get-viewer-id'
import { normalizeCart } from '@framework/utils'
import {
  accountCartIsPresent,
  anonymousCartIsPresent,
  cartNeedsToBeReconciled,
  setDummyCartCookie,
  updateCookiesForAccountCart,
  updateCookiesForReconciledCart,
} from '@framework/api/endpoints/cart/utils'
import { getAnonymousCart } from '@framework/api/utils/get-anonymous-cart'
import { getAccountCart } from '@framework/api/utils/get-account-cart'
import { getCartIdCookie } from '@framework/utils/get-cart-id-cookie'
import { CartEndpoint } from '.'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  req: { cookies },
  res,
  config,
}) => {
  let normalizedCart
  if (cartNeedsToBeReconciled(cookies, config)) {
    const rawReconciledCart = await reconcileCarts(cookies, config)

    normalizedCart = normalizeCart(rawReconciledCart)

    updateCookiesForReconciledCart(normalizedCart?.id ?? '', res, config)
  } else if (anonymousCartIsPresent(cookies, config)) {
    const rawAnonymousCart = await getAnonymousCart(cookies, config)

    normalizedCart = normalizeCart(rawAnonymousCart)

    if (!normalizedCart) {
      setDummyCartCookie(res, config)
    }
  } else if (accountCartIsPresent(cookies, config)) {
    const accountId = await getViewerId(cookies, config)

    const rawAccountCart = await getAccountCart(accountId, cookies, config)

    normalizedCart = normalizeCart(rawAccountCart)

    if (!!normalizedCart && getCartIdCookie() !== normalizedCart.id) {
      updateCookiesForAccountCart(normalizedCart.id, res, config)
    }
  } else {
    setDummyCartCookie(res, config)
  }

  return res.status(200).json({ data: normalizedCart })
}

export default getCart
