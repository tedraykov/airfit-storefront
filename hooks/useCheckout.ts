import { Cart, ShippingAddress } from '@framework/types/cart'
import {
  FulfillmentGroupOrderInput,
  Order,
  OrderInput,
} from '@framework/types/order'
import { Address, PaymentInput } from '@framework/schema'
import { useEffect, useState } from 'react'
import { ShippingAddressFieldValues } from '@components/checkout/ShippingAddressFormClient/ShippingAddressFormClient'
import paymentMethods from '@utils/paymentMethods'

interface CheckoutHookProps {
  cart: Cart | null | undefined
}

export const useCheckout = ({ cart }: CheckoutHookProps) => {
  const [availablePaymentMethods, setAvailablePaymentMethods] =
    useState<string[] | undefined>(undefined)
  const [paymentMethod, setPaymentMethod] =
    useState<string | undefined>(undefined)
  const [order, setOrder] = useState<Order | undefined>(undefined)

  useEffect(() => {
    ;(async () => {
      if (cart) {
        const availablePayments =
          (await cart?.mutationQueries?.getPaymentMethods()) ?? []
        setAvailablePaymentMethods(availablePayments)
      }
    })()
  }, [cart])

  const getShippingAddress = (): ShippingAddress | null => {
    if (cart?.fulfillmentGroups.length === 0) return null
    return cart?.fulfillmentGroups[0].data?.shippingAddress || null
  }

  const getEmail = (): string | null => {
    return cart?.email ?? null
  }

  const getPaymentsMethods = () => {
    // return paymentMethods.filter(paymentMethod =>
    //   availablePaymentMethods!.includes(paymentMethod.name)
    // )
    return paymentMethods
  }

  const handleSetShippingAddress = async ({
    phone,
    firstName,
    sureName,
    address,
    city,
    region,
    postal,
    email,
  }: ShippingAddressFieldValues) => {
    const { mutationQueries } = cart!
    await mutationQueries!.setEmailOnAnonymousCart(email)
    const updatedCart = await mutationQueries!.setShippingAddress({
      phone,
      firstName,
      sureName,
      fullName: `${firstName} ${sureName}`,
      address,
      city,
      region,
      country: 'BG',
      postal,
    })

    await mutationQueries!.setShipmentMethod(
      updatedCart.fulfillmentGroups[0].id,
      updatedCart.fulfillmentGroups[0].availableFulfillmentOptions[0]
        .fulfillmentMethod.id
    )
  }

  const handleSelectPaymentMethod = (paymentMethod: string) => {
    setPaymentMethod(paymentMethod)
  }

  const buildOrder = (): OrderInput => {
    const fulfillmentGroups = cart!.fulfillmentGroups!.map((group) => {
      const { data, selectedFulfillmentOption } = group!

      return {
        data,
        items: cart?.lineItems,
        selectedFulfillmentMethodId:
          selectedFulfillmentOption!.fulfillmentMethod.id,
        shopId: group!.shopId,
        totalPrice: cart?.totalPrice,
        type: group!.type,
      } as FulfillmentGroupOrderInput
    })

    return {
      cartId: cart!.id,
      currencyCode: cart!.currency.code,
      email: cart!.email!,
      fulfillmentGroups: fulfillmentGroups,
      shopId: cart!.shopId,
    }
  }

  const handlePlaceOrder = async () => {
    const orderInput = buildOrder()
    const { mutationQueries } = cart!

    const order = await mutationQueries!.placeOrder({
      order: orderInput,
      payments: [
        {
          amount: cart?.totalPrice ?? 0,
          method: paymentMethod!,
        } as PaymentInput,
      ],
    })

    setOrder(order)
  }

  return {
    availablePaymentMethods,
    getShippingAddress,
    getEmail,
    getPaymentsMethods,
    handleSetShippingAddress,
    handleSelectPaymentMethod,
    handlePlaceOrder,
    order,
    paymentMethod,
  }
}
