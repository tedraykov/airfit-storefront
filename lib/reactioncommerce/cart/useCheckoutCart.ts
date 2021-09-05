import useSWR from 'swr'
import { useCustomer } from '@framework/customer'
import request from 'graphql-request'
import { API_URL } from '@framework/const'
import getAnonymousCartQuery from '@framework/utils/queries/get-anonymous-cart'
import accountCartByAccountIdQuery from '@framework/utils/queries/account-cart-by-account-id'
import { getCartIdCookie } from '@framework/utils/get-cart-id-cookie'
import { getAnonymousCartToken } from '@framework/utils/anonymous-cart-token'
import { useEffect, useState } from 'react'
import updateFulfillmentOptionsForGroupMutation from '@framework/utils/mutations/updateFulfillmentOptionsForGroup'
import {
  AddressInput,
  Cart,
  SetShippingAddressOnCartPayload,
  UpdateFulfillmentOptionsForGroupPayload,
} from '@framework/schema'
import setShippingAddressOnCartMutation from '@framework/utils/mutations/setShippingAddressOnCart'
import { data } from 'autoprefixer'

const fetcher = (query: string, input: any) => request(API_URL, query, input)

const useCheckoutCart = () => {
  const { data: account } = useCustomer()

  const [query, setQuery] = useState(
    account ? accountCartByAccountIdQuery : getAnonymousCartQuery
  )
  const [queryInput, setQueryInput] = useState({
    shopId: process.env.NEXT_PUBLIC_REACTION_SHOP_ID,
    cartId: getCartIdCookie(),
    cartToken: getAnonymousCartToken(),
    accountId: account,
  })

  useEffect(() => {
    return () => {
      setQuery(account ? accountCartByAccountIdQuery : getAnonymousCartQuery)
      setQueryInput({
        shopId: process.env.NEXT_PUBLIC_REACTION_SHOP_ID,
        cartId: getCartIdCookie(),
        cartToken: getAnonymousCartToken(),
        accountId: account,
      })
    }
  }, [account])

  const {
    data: cart,
    error,
    mutate,
  } = useSWR(query, (query) => fetcher(query, queryInput))

  const handleUpdateFulfillmentOptionsForGroup = async (
    fulfillmentGroupId: string
  ) => {
    return await request(API_URL, updateFulfillmentOptionsForGroupMutation, {
      input: {
        fulfillmentGroupId,
        cartId: getCartIdCookie(),
        cartToken: getAnonymousCartToken(),
      },
    })
  }

  const setShippingAddress = async (address: Partial<AddressInput>) => {
    const {
      setShippingAddressOnCart: { cart: cartWithAddress },
    } = await request(API_URL, setShippingAddressOnCartMutation, {
      cartId: getCartIdCookie(),
      cartToken: getAnonymousCartToken(),
      address,
    })

    // Update fulfillment options for current cart
    const fulfillmentGroup = cartWithAddress.checkout?.fulfillmentGroups[0]
    const {
      updateFulfillmentOptionsForGroup: { cart: cartWithFulfilmentOptions },
    } = await handleUpdateFulfillmentOptionsForGroup(
      fulfillmentGroup?._id ?? ''
    )

    await mutate({ cart: cartWithFulfilmentOptions }, false)
  }

  return {
    cart,
    error,
    mutationQueries: {
      setShippingAddress,
    },
  }
}

export default useCheckoutCart
