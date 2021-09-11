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
import request from 'graphql-request'
import { API_URL } from '@framework/const'
import updateFulfillmentOptionsForGroupMutation from '@framework/utils/mutations/updateFulfillmentOptionsForGroup'
import { getAnonymousCartToken } from '@framework/utils/anonymous-cart-token'
import { CartData } from '@framework/types/cart'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  req: { cookies },
  res,
  config,
}) => {
  console.log('Get cart endpoint called')
  let normalizedCart

  if (cartNeedsToBeReconciled(cookies, config)) {
    console.log('Reconciling cart')
    const rawReconciledCart = await reconcileCarts(cookies, config)

    normalizedCart = normalizeCart(rawReconciledCart)

    updateCookiesForReconciledCart(normalizedCart?.id ?? '', res, config)
  } else if (anonymousCartIsPresent(cookies, config)) {
    const rawAnonymousCart = await getAnonymousCart(cookies, config)

    normalizedCart = normalizeCart(rawAnonymousCart)
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

  const handleUpdateFulfillmentOptionsForGroup = async (
    fulfillmentGroupId: string
  ) => {
    return await config.fetch(updateFulfillmentOptionsForGroupMutation, {
      variables: {
        input: {
          fulfillmentGroupId,
          cartId: getCartIdCookie(),
          cartToken: getAnonymousCartToken(),
        },
      },
    })
  }

  return res.status(200).json({ data: normalizedCart ?? null })
}

export default getCart
