import { gql } from '@apollo/client'

export default gql`
  query availablePaymentMethods($shopId: ID!) {
    availablePaymentMethods(shopId: $shopId) {
      displayName
      name
      isEnabled
      pluginName
      canRefund
    }
  }
`
