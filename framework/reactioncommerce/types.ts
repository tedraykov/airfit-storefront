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
  pricing: {
    amount: number
    currencyCode: string
  }
  optionSelections?: OptionSelections
}

export type CartTypes = {
  cart?: Cart
  item: LineItem
  itemBody: CartItemBody
}

export type CartSchema = Core.CartSchema<CartTypes>

export type CartHooks = Core.CartHooks<CartTypes>

export type GetCartHook = CartHooks['getCart']
export type AddItemHook = CartHooks['addItem']
export type UpdateItemHook = CartHooks['updateItem']
export type RemoveItemHook = CartHooks['removeItem']
