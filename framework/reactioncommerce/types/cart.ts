import * as Core from '@commerce/types/cart'
import { Money } from '@framework/types/common'
import { Order, PlaceOrderInput } from '@framework/types/order'

export type Cart = Core.Cart & {
  id: string
  lineItems: LineItem[]
  fulfillmentGroups: FulfillmentGroup[]
  shopId: string
  mutationQueries?: {
    setShippingAddress: (address: ShippingAddress) => Promise<Cart>
    setEmailOnAnonymousCart: (email: string) => Promise<Cart>
    setShipmentMethod: (
      fulfillmentGroupId: string,
      fulfillmentMethodId: string
    ) => Promise<Cart>
    placeOrder: (input: PlaceOrderInput) => Promise<Order>
    getPaymentMethods: () => Promise<string[]>
  }
}

export type ShippingAddress = {
  address: string
  city: string
  country: string
  firstName: string
  fullName: string
  sureName: string
  phone: string
  postal: string
  region: string
}

export type FulfillmentGroup = {
  id: string
  data: {
    shippingAddress: ShippingAddress
  }
  availableFulfillmentOptions: FulfillmentOption[]
  selectedFulfillmentOption: FulfillmentOption | undefined
  shopId: string
  type: string
}

export type FulfillmentOption = {
  fulfillmentMethod: FulfillmentMethod
  handlingPrice: Money
  price: Money
}

export type FulfillmentMethod = {
  id: string
  name: string
}

export interface LineItem extends Core.LineItem {
  addedAt: string
}

export type OptionSelections = {
  option_id: number
  option_value: number | string
}
export type CartItemBody = Core.CartItemBody & {
  pricing: Money
  optionSelections?: OptionSelections
}
export type CartTypes = {
  cart?: Cart
  item: LineItem
  itemBody: CartItemBody
}

export type CartSchema = Core.CartSchema<CartTypes>
export type CartHooks = Core.CartHooks<CartTypes>

export type GetCartHook = CartHooks['getCart'] & {
  input: {
    isCheckout?: boolean
  }
}
export type AddItemHook = CartHooks['addItem']
export type UpdateItemHook = CartHooks['updateItem']
export type RemoveItemHook = CartHooks['removeItem']
