import { Fetcher } from '@commerce/utils/types'
import { Order, PlaceOrderInput } from '@framework/types/order'
import placeOrderMutation from '@framework/utils/mutations/place-order-mutation'
import {
  PlaceOrderInput as ReactionPlaceOrderInput,
  OrderFulfillmentGroupInput as ReactionOrderFulfillmentGroupInput,
  PaymentInput as ReactionPaymentInput,
  AddressInput,
  OrderFulfillmentGroupItemInput,
} from '@framework/schema'

export const placeOrder =
  (fetcher: Fetcher) =>
  async (placeOrderInput: PlaceOrderInput): Promise<Order> => {
    const {
      order: { currencyCode, cartId, email, fulfillmentGroups, shopId },
    } = placeOrderInput

    const reactionFulfillmentGroups = fulfillmentGroups.map(
      (fg) =>
        <ReactionOrderFulfillmentGroupInput>{
          data: {
            shippingAddress: <Partial<AddressInput>>{
              address1: fg.data.shippingAddress.address,
              city: fg.data.shippingAddress.city,
              country: fg.data.shippingAddress.country,
              firstName: fg.data.shippingAddress.firstName,
              fullName: `${fg.data.shippingAddress.firstName} ${fg.data.shippingAddress.sureName}`,
              lastName: fg.data.shippingAddress.sureName,
              phone: fg.data.shippingAddress.phone,
              postal: fg.data.shippingAddress.postal,
              region: fg.data.shippingAddress.region,
              isCommercial: false,
            },
          },
          items: fg.items.map(
            (item) =>
              <OrderFulfillmentGroupItemInput>{
                addedAt: item.addedAt,
                price: item.variant.price,
                productConfiguration: {
                  productId: item.productId,
                  productVariantId: item.variantId,
                },
                quantity: item.quantity,
              }
          ),
          selectedFulfillmentMethodId: fg.selectedFulfillmentMethodId,
          shopId: fg.shopId,
          totalPrice: fg.totalPrice,
          type: fg.type,
        }
    )

    const {
      placeOrder: { orders },
    } = await fetcher({
      query: placeOrderMutation,
      variables: {
        input: <ReactionPlaceOrderInput>{
          order: {
            cartId,
            currencyCode,
            email,
            fulfillmentGroups: reactionFulfillmentGroups,
            shopId,
          },
          payments: placeOrderInput.payments.map(
            (payment) =>
              <ReactionPaymentInput>{
                amount: payment.amount,
                method: payment.method,
              }
          ),
        },
      },
    })

    return orders[0] as Order
  }
