import { LineItem, ShippingAddress } from '@framework/types/cart'

export type OrderInput = {
  cartId: string
  currencyCode: string
  email: string
  fulfillmentGroups: FulfillmentGroupOrderInput[]
  shopId: string
}

export type PaymentInput = {
  amount: number
  method: string
}

export type PlaceOrderInput = {
  order: OrderInput
  payments: PaymentInput[]
}

export type Order = {
  referenceId: string
}

export type FulfillmentGroupOrderInput = {
  data: {
    shippingAddress: ShippingAddress
  }
  items: LineItem[]
  selectedFulfillmentMethodId: string
  shopId: string
  type: string
  totalPrice: number
}
