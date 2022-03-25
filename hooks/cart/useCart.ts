import { useCallback, useEffect, useMemo, useState } from 'react'
import { ApolloCache, useLazyQuery, useMutation } from '@apollo/client'

import anonymousCartQuery from '@graphql/queries/get-anonymous-cart'
import {
  AddCartItemsPayload,
  Address,
  AddressInput,
  ApplyDiscountCodeToCartPayload,
  Cart,
  CartItemInput,
  CreateCartPayload,
  MutationAddCartItemsArgs,
  MutationApplyDiscountCodeToCartArgs,
  MutationCreateCartArgs,
  MutationRemoveCartItemsArgs,
  MutationSelectFulfillmentOptionForGroupArgs,
  MutationSetEmailOnAnonymousCartArgs,
  MutationSetShippingAddressOnCartArgs,
  MutationUpdateCartItemsQuantityArgs,
  MutationUpdateFulfillmentOptionsForGroupArgs,
  RemoveCartItemsPayload,
  SelectFulfillmentOptionForGroupPayload,
  SetEmailOnAnonymousCartPayload,
  SetShippingAddressOnCartPayload,
  UpdateCartItemInput,
  UpdateCartItemsQuantityPayload,
  UpdateFulfillmentOptionsForGroupPayload,
} from '@framework/schema'
import useCartStore from '@hooks/cart/useCartStore'
import {
  addCartItemsMutation,
  createCartMutation,
  updateFulfillmentOptionsForGroupMutation,
  selectFulfillmentOptionForGroupMutation,
  updateCartItemsQuantityMutation,
  applyDiscountCodeToCartMutation,
  setEmailOnAnonymousCartMutation,
  setShippingAddressOnCartMutation,
  removeCartItemsMutation,
} from '@graphql/mutations'
import accountCartByAccountIdQuery from '@graphql/queries/account-cart-by-account-id'
import useShop from '@hooks/useShop'

export default function useCart() {
  const { shopId } = useShop()
  const { anonymousCartId, anonymousCartToken, setAnonymousCartCredentials } =
    useCartStore()
  const [cart, setCart] = useState<Cart>()
  const [loading, setLoading] = useState(true)

  const updateCartCache = (cache: ApolloCache<any>, cart: Cart | null) => {
    cache.writeQuery({
      query: cart?.account ? accountCartByAccountIdQuery : anonymousCartQuery,
      data: { cart },
    })
  }

  /*
   * GraphQL queries and mutations
   */
  const [
    getAnonymousCart,
    {
      data: anonymousCartData,
      loading: anonymousCartLoading,
      error: anonymousCartError,
    },
  ] = useLazyQuery<{ cart: Cart }>(anonymousCartQuery, {
    variables: {
      cartId: anonymousCartId,
      cartToken: anonymousCartToken,
    },
  })

  const [_createCart] = useMutation<
    { createCart: CreateCartPayload },
    MutationCreateCartArgs
  >(createCartMutation, {
    onCompleted: ({ createCart }) => {
      const { cart, token } = createCart
      if (cart && !cart?.account) {
        setAnonymousCartCredentials(cart!._id, token)
      }
    },
    update: (cache, { data }) => {
      updateCartCache(cache, data?.createCart?.cart || null)
    },
  })

  const [_addItem] = useMutation<
    { addCartItems: AddCartItemsPayload },
    MutationAddCartItemsArgs
  >(addCartItemsMutation, {
    update: (cache, { data }) => {
      updateCartCache(cache, data?.addCartItems?.cart || null)
    },
  })

  const [_removeItem] = useMutation<
    { removeCartItems: RemoveCartItemsPayload },
    MutationRemoveCartItemsArgs
  >(removeCartItemsMutation, {
    update: (cache, { data }) => {
      updateCartCache(cache, data?.removeCartItems?.cart || null)
    },
  })

  const [_updateItemQuantity] = useMutation<
    { updateCartItemsQuantity: UpdateCartItemsQuantityPayload },
    MutationUpdateCartItemsQuantityArgs
  >(updateCartItemsQuantityMutation, {
    update: (cache, { data }) => {
      updateCartCache(cache, data?.updateCartItemsQuantity?.cart || null)
    },
  })

  const [_setEmailOnAnonymousCart] = useMutation<
    { setEmailOnAnonymousCart: SetEmailOnAnonymousCartPayload },
    MutationSetEmailOnAnonymousCartArgs
  >(setEmailOnAnonymousCartMutation, {
    update: (cache, { data }) => {
      updateCartCache(cache, data?.setEmailOnAnonymousCart?.cart || null)
    },
  })

  const [_setShippingAddress] = useMutation<
    { setShippingAddressOnCart: SetShippingAddressOnCartPayload },
    MutationSetShippingAddressOnCartArgs
  >(setShippingAddressOnCartMutation, {
    update: (cache, { data }) => {
      updateCartCache(cache, data?.setShippingAddressOnCart?.cart || null)
    },
  })

  const [_updateFulfillmentOptionForGroup] = useMutation<
    {
      updateFulfillmentOptionsForGroup: UpdateFulfillmentOptionsForGroupPayload
    },
    MutationUpdateFulfillmentOptionsForGroupArgs
  >(updateFulfillmentOptionsForGroupMutation, {
    update: (cache, { data }) => {
      updateCartCache(
        cache,
        data?.updateFulfillmentOptionsForGroup?.cart || null
      )
    },
  })

  const [_selectFulfillmentOptionForGroup] = useMutation<
    { selectFulfillmentOptionForGroup: SelectFulfillmentOptionForGroupPayload },
    MutationSelectFulfillmentOptionForGroupArgs
  >(selectFulfillmentOptionForGroupMutation, {
    update: (cache, { data }) => {
      updateCartCache(
        cache,
        data?.selectFulfillmentOptionForGroup?.cart || null
      )
    },
  })

  const [_applyDiscountCode] = useMutation<
    { applyDiscountCodeToCart: ApplyDiscountCodeToCartPayload },
    MutationApplyDiscountCodeToCartArgs
  >(applyDiscountCodeToCartMutation, {
    update: (cache, { data }) => {
      updateCartCache(cache, data?.applyDiscountCodeToCart?.cart || null)
    },
  })

  useEffect(() => {
    if (anonymousCartData && !anonymousCartLoading) {
      setCart(anonymousCartData.cart)
      return setLoading(false)
    }
    if (anonymousCartError && !anonymousCartLoading) {
      setLoading(false)
    }
  }, [anonymousCartData, anonymousCartLoading, anonymousCartError])

  useEffect(() => {
    if (!anonymousCartId && !anonymousCartToken) {
      setLoading(false)
    }
  }, [])

  // Get the cart when anonymousCartId is available
  useEffect(() => {
    if (anonymousCartId && anonymousCartToken) {
      getAnonymousCart().then()
    }
  }, [anonymousCartId, anonymousCartToken])

  const isEmpty = useMemo(() => !cart || cart.totalItemQuantity === 0, [cart])

  const addItem = useCallback(
    async (item: CartItemInput) => {
      if (cart && cart._id) {
        return _addItem({
          variables: {
            input: {
              cartId: anonymousCartId || '',
              cartToken: anonymousCartToken,
              items: [item],
              clientMutationId: null,
            },
          },
        })
      }
      return _createCart({
        variables: {
          input: {
            items: [item],
            shopId: shopId!,
            clientMutationId: null,
          },
        },
      })
    },
    [_addItem, _createCart, anonymousCartId, anonymousCartToken, cart, shopId]
  )

  const removeItem = useCallback(
    (itemId: string) => {
      return _removeItem({
        variables: {
          input: {
            cartId: anonymousCartId || '',
            cartToken: anonymousCartToken,
            cartItemIds: [itemId],
            clientMutationId: null,
          },
        },
      })
    },
    [_removeItem, anonymousCartId, anonymousCartToken]
  )

  const updateItem = useCallback(
    async (item: UpdateCartItemInput) => {
      if (item.quantity! < 1) {
        return removeItem(item.cartItemId)
      }

      return _updateItemQuantity({
        variables: {
          input: {
            cartId: anonymousCartId || '',
            cartToken: anonymousCartToken,
            items: [item],
            clientMutationId: null,
          },
        },
      })
    },
    [_updateItemQuantity, anonymousCartId, anonymousCartToken, removeItem]
  )

  const getShippingAddress = useCallback((): Address | null => {
    return cart?.checkout?.fulfillmentGroups[0]?.data?.shippingAddress || null
  }, [cart])

  const getEmail = useCallback((): string | null => {
    return cart?.email ?? null
  }, [cart])

  const setEmailOnAnonymousCart = useCallback(
    (email: string) => {
      return _setEmailOnAnonymousCart({
        variables: {
          input: {
            cartId: anonymousCartId || '',
            cartToken: anonymousCartToken || '',
            email,
            clientMutationId: null,
          },
        },
      })
    },
    [_setEmailOnAnonymousCart, anonymousCartId, anonymousCartToken]
  )

  const setShippingAddress = useCallback(
    async (address: AddressInput) => {
      const { data, errors } = await _setShippingAddress({
        variables: {
          input: {
            cartId: anonymousCartId || '',
            cartToken: anonymousCartToken || '',
            address,
            addressId: null,
            clientMutationId: null,
          },
        },
      })

      const filfillmentGroups =
        data?.setShippingAddressOnCart.cart?.checkout?.fulfillmentGroups
      if (!filfillmentGroups) return { errors }

      const promises = filfillmentGroups.map((fg) =>
        _updateFulfillmentOptionForGroup({
          variables: {
            input: {
              fulfillmentGroupId: fg?._id || '',
              cartId: anonymousCartId || '',
              cartToken: anonymousCartToken || '',
              clientMutationId: null,
            },
          },
        })
      )

      const updatedFgs = await Promise.all(promises)
      return updatedFgs[updatedFgs.length - 1]
    },
    [
      _setShippingAddress,
      _updateFulfillmentOptionForGroup,
      anonymousCartId,
      anonymousCartToken,
    ]
  )

  const setFulfillmentMethod = useCallback(
    async (fulfillmentGroupId: string, fulfillmentMethodId: string) => {
      return _selectFulfillmentOptionForGroup({
        variables: {
          input: {
            cartId: anonymousCartId || '',
            cartToken: anonymousCartToken || '',
            clientMutationId: null,
            fulfillmentGroupId,
            fulfillmentMethodId,
          },
        },
      })
    },
    [_selectFulfillmentOptionForGroup, anonymousCartId, anonymousCartToken]
  )

  const applyDiscountCode = useCallback(
    async (discountCode: string) => {
      return _applyDiscountCode({
        variables: {
          input: {
            cartId: anonymousCartId || '',
            token: anonymousCartToken || '',
            shopId: shopId!,
            discountCode,
          },
        },
      })
    },
    [_applyDiscountCode, anonymousCartId, anonymousCartToken, shopId]
  )

  return {
    cart,
    loading,
    isEmpty,
    addItem,
    removeItem,
    updateItem,
    applyDiscountCode,
    getShippingAddress,
    getEmail,
    setEmailOnAnonymousCart,
    setShippingAddress,
    setFulfillmentMethod,
  }
}
