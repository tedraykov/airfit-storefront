import {
  Address,
  AddressInput,
  CartItem,
  MutationPlaceOrderArgs,
  Order,
  OrderFulfillmentGroupInput,
  OrderFulfillmentGroupItemInput,
  OrderInput,
  PaymentInput,
  PlaceOrderPayload,
} from '@graphql/schema'
import { useCallback, useEffect, useState } from 'react'
import paymentMethods from '@utils/paymentMethods'
import useCart from '@hooks/cart/useCart'
import useShop from '@hooks/useShop'
import { useMutation } from '@apollo/client'
import placeOrderMutation from '@graphql/mutations/place-order-mutation'

export type SetShippingAddressProps = { email: string } & AddressInput

export const useCheckout = () => {
  const {
    cart,
    setEmailOnAnonymousCart,
    setShippingAddress,
    setFulfillmentMethod,
  } = useCart()

  const { getPaymentMethods } = useShop()

  const [_placeOrder] = useMutation<
    { placeOrder: PlaceOrderPayload },
    MutationPlaceOrderArgs
  >(placeOrderMutation)

  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<
    string[] | undefined
  >(undefined)
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(
    undefined
  )
  const [order, setOrder] = useState<Order | undefined>()

  useEffect(() => {
    if (cart && !availablePaymentMethods) {
      getPaymentMethods().then((availablePayments) => {
        setAvailablePaymentMethods(availablePayments)
      })
    }
  }, [cart, getPaymentMethods])

  const getPaymentsMethods = () => {
    return paymentMethods
  }

  const setShippingAddressOnCart = async ({
    email,
    ...address
  }: SetShippingAddressProps) => {
    await setEmailOnAnonymousCart(email)
    const { data } = await setShippingAddress(address)

    if (data?.updateFulfillmentOptionsForGroup?.cart) {
      const { cart } = data.updateFulfillmentOptionsForGroup
      await setFulfillmentMethod(
        cart?.checkout?.fulfillmentGroups[0]?._id || '',
        cart?.checkout?.fulfillmentGroups[0]?.availableFulfillmentOptions[0]
          ?.fulfillmentMethod?._id || ''
      )
    }
  }

  const selectPaymentMethod = (paymentMethod: string) => {
    setPaymentMethod(paymentMethod)
  }

  const buildAddress = (address: Address) => {
    const { __typename, ...addressInput } = address
    const { metafields, ...addressInputAttributes } = addressInput
    return {
      metafields: metafields?.map((metafield) => {
        const { __typename, ...metafieldInput } = metafield!
        return metafieldInput
      }),
      ...addressInputAttributes,
    } as unknown as AddressInput
  }

  const buildOrderItems = (items: CartItem[]) => {
    return items.map((item) => {
      return {
        addedAt: item.addedAt,
        price: item.price.amount,
        productConfiguration: {
          productId: item.productConfiguration.productId,
          productVariantId: item.productConfiguration.productVariantId,
        },
        quantity: item.quantity,
      } as OrderFulfillmentGroupItemInput
    })
  }
  const buildOrder = (): OrderInput => {
    const { summary } = cart!.checkout!
    const fulfillmentGroups = cart!.checkout!.fulfillmentGroups!.map((fg) => {
      const { data, selectedFulfillmentOption } = fg!
      return {
        data: {
          shippingAddress: buildAddress(data!.shippingAddress!),
        },
        items: buildOrderItems(cart!.items!.nodes as CartItem[]),
        selectedFulfillmentMethodId:
          selectedFulfillmentOption!.fulfillmentMethod!._id,
        shopId: fg!.shop._id,
        totalPrice: summary!.total.amount + summary!.discountTotal.amount,
        type: fg!.type,
      } as OrderFulfillmentGroupInput
    })

    return {
      cartId: cart!._id,
      currencyCode: cart!.checkout!.summary!.total!.currency!.code,
      email: cart!.email!,
      fulfillmentGroups: fulfillmentGroups,
      shopId: cart!.shop!._id,
    }
  }

  const buildPayments = useCallback((): PaymentInput[] => {
    const { summary } = cart!.checkout!
    return [
      {
        amount: summary?.total?.amount ?? 0,
        method: paymentMethod!,
        billingAddress: null,
        data: null,
      },
    ]
  }, [cart, paymentMethod])

  const placeOrder = async () => {
    const orderInput = buildOrder()
    const paymentsInput = buildPayments()

    const { data } = await _placeOrder({
      variables: {
        input: {
          order: orderInput,
          payments: paymentsInput,
          clientMutationId: null,
        },
      },
    })

    if (data?.placeOrder?.orders) {
      setOrder(data?.placeOrder?.orders[0]!)
    }
  }

  return {
    availablePaymentMethods,
    getPaymentsMethods,
    setShippingAddressOnCart,
    selectPaymentMethod,
    placeOrder,
    order,
    paymentMethod,
  }
}
