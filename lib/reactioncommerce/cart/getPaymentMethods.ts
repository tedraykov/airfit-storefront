import request from 'graphql-request'
import { API_URL, SHOP_ID } from '@framework/const'
import availablePaymentMethods from '@framework/utils/queries/available-payment-methods'
import { PaymentMethod } from '@framework/schema'

const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const res = await request(API_URL, availablePaymentMethods, {
    shopId: SHOP_ID,
  })

  return res.availablePaymentMethods as PaymentMethod[]
}

export default getPaymentMethods
