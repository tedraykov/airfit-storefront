import { HookFetcherFn } from '@commerce/utils/types'
import { Cart } from '@commerce/types'
import { checkoutCreate } from '.'
import { FetchCartInput } from '@commerce/cart/use-cart'

const fetcher: HookFetcherFn<Cart | null, FetchCartInput> = async ({
  options,
  input: { cartId: checkoutId },
  fetch,
}) => {
  let checkout

  if (checkoutId) {
    const data = await fetch({
      ...options,
      variables: {
        checkoutId,
      },
    })
    checkout = data.node
  }

  if (checkout?.completedAt || !checkoutId) {
    checkout = await checkoutCreate(fetch)
  }

  // TODO: Fix this type
  return checkout
}

export default fetcher
