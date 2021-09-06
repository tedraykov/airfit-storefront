import { PaymentMethod, PlaceOrderInput } from '@framework/schema'
import request from 'graphql-request'
import { API_URL, SHOP_ID } from '@framework/const'
import placeOrderMutation from '@framework/utils/mutations/place-order-mutation'

const placeOrder = async (
  input: Partial<PlaceOrderInput>
): Promise<PaymentMethod[]> => {
  const res = await request(API_URL, placeOrderMutation, {
    input: {
      ...input,
    },
  })

  return res.availablePaymentMethods as PaymentMethod[]
}

export default placeOrder
