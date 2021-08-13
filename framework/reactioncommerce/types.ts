import * as Core from '@commerce/types/cart'
import { Product as CoreProduct } from '@commerce/types/product'

export type Product = CoreProduct & {
  vendor: string
}

export type Cart = Core.Cart & {
  id: string
  lineItems: LineItem[]
}

export interface LineItem extends Core.LineItem {
  options: any[]
}

/**
 * Cart mutations
 */

export type OptionSelections = {
  option_id: number
  option_value: number | string
}

export type CartItemBody = Core.CartItemBody & {
  pricing: number
  optionSelections?: OptionSelections
}

export type CartTypes = {
  cart: Cart
  item: Core.LineItem
  itemBody: CartItemBody
}

export type CartSchema = Core.CartSchema<CartTypes>

export type CartHooks = Core.CartHooks<CartTypes>

export type UpdateItemHook = CartHooks['updateItem']
export type RemoveItemHook = CartHooks['removeItem']

// export type GetCartHandlerBody = Core.GetCartHandlerBody
//
// export type AddCartItemBody = Core.AddCartItemBody<CartItemBody>
//
// export type AddCartItemHandlerBody = Core.AddCartItemHandlerBody<CartItemBody>
//
// export type UpdateCartItemBody = Core.UpdateCartItemBody<CartItemBody>
//
// export type UpdateCartItemHandlerBody = Core.UpdateCartItemHandlerBody<CartItemBody>
//
// export type RemoveCartItemBody = Core.RemoveCartItemBody
//
// export type RemoveCartItemHandlerBody = Core.RemoveCartItemHandlerBody
