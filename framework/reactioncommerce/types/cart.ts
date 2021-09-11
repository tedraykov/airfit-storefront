import * as Core from '@commerce/types/cart'
import { Money } from '@framework/types/common'
import { Order, OrderInput, PlaceOrderInput } from '@framework/types/order'

export type Cart = Core.Cart & {
  id: string
  lineItems: LineItem[]
  fulfillmentGroups: FulfillmentGroup[]
  shopId: string
  mutationQueries: {
    setShippingAddress: (address: ShippingAddress) => Promise<Cart>
    setShipmentMethod: (
      fulfillmentGroupId: string,
      fulfillmentMethodId: string
    ) => Promise<Cart>
    placeOrder: (input: PlaceOrderInput) => Promise<Order>
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
  items: LineItem[]
  availableFulfillmentOptions: FulfillmentOption[]
  selectedFulfillmentOption: FulfillmentOption | undefined
  shopId: string
  type: string
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

export type FulfillmentOption = {
  fulfillmentMethod: FulfillmentMethod
  handlingPrice: Money
  price: Money
}

export type FulfillmentMethod = {
  id: string
  name: string
}

export interface LineItem extends Core.LineItem {}

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

export type CartHooks = Core.CartHooks<CartTypes>

export type GetCartHook = CartHooks['getCart']
export type AddItemHook = CartHooks['addItem']
export type UpdateItemHook = CartHooks['updateItem']
export type RemoveItemHook = CartHooks['removeItem']
