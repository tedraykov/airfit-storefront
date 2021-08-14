import { createCartMutation } from '@framework/utils/mutations'
import reconcileCarts from '@framework/api/utils/reconcile-cart'
import { ReactionCommerceConfig } from '@framework/api'
import {
  cartNeedsToBeReconciled,
  updateCookiesForAnonymousCart,
  updateCookiesForReconciledCart,
} from '@framework/api/endpoints/cart/utils'
import { updateCart } from '@framework/api/utils/update-cart'
import { CartEndpoint } from '@framework/api/endpoints/cart/index'
import { CartItemBody } from '@framework/types/cart'

const handleMissingCartId = (res: any) => {
  return res.status(400).json({
    data: null,
    errors: [{ message: 'Missing cartId cookie' }],
  })
}

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  req: { cookies },
  res,
  body: { item },
  config,
}) => {
  console.log('Adding item endpoint called')
  let cartId = cookies[config.cartIdCookie]

  if (!cartId) {
    return handleMissingCartId(res)
  }

  if (!item) {
    return handleMissingItem(res)
  }

  if (!item.quantity) item.quantity = 1

  if (cartId === config.dummyEmptyCartId) {
    console.log('Creating new cart')
    return createNewCart(item, res, config)
  }

  if (cartNeedsToBeReconciled(cookies, config)) {
    console.log('Reconcile add item')
    return reconcileAnonymousCart(res, cookies, config)
  }

  const updatedCart = await updateCart(item, cookies, config)

  return res.status(200).json(updatedCart.data)
}

async function createNewCart(
  item: CartItemBody,
  res: any,
  config: ReactionCommerceConfig
) {
  const createdCart = await config.fetch(createCartMutation, {
    variables: {
      input: {
        shopId: config.shopId,
        items: [
          {
            productConfiguration: {
              productId: item.productId,
              productVariantId: item.variantId,
            },
            quantity: item.quantity,
            price: item.pricing,
          },
        ],
      },
    },
  })

  updateCookiesForAnonymousCart(createdCart, res, config)

  return res.status(200).json(createdCart.data)
}

const reconcileAnonymousCart = async (
  res: any,
  cookies: { [p: string]: string },
  config: ReactionCommerceConfig
) => {
  const { _id: cartId } = await reconcileCarts(cookies, config)

  updateCookiesForReconciledCart(res, config, cartId)
}

const handleMissingItem = (res: any) =>
  res.status(400).json({
    data: null,
    errors: [{ message: 'Missing item' }],
  })

export default addItem
