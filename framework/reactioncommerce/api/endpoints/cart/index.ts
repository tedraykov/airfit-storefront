import { GetAPISchema, createEndpoint } from '@commerce/api'
import cartEndpoint from '@commerce/api/endpoints/cart'
import { ReactionCommerceAPI } from '@framework/api'
import getCart from './get-cart'
import addItem from './add-item'
import updateItem from './update-item'
import removeItem from './remove-item'
import { CartSchema } from '@framework/types/cart'

export type CartAPI = GetAPISchema<ReactionCommerceAPI, CartSchema>

export type CartEndpoint = CartAPI['endpoint']

export const handlers: CartEndpoint['handlers'] = {
  getCart,
  addItem,
  updateItem,
  removeItem,
}

const cartApi = createEndpoint<CartAPI>({
  handler: cartEndpoint,
  handlers,
})

export default cartApi
