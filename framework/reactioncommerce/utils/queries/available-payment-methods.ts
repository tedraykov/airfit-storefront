const availablePaymentMethods = `
query availablePaymentMethods($shopId: ID!) {
    availablePaymentMethods(shopId: $shopId) {
      displayName,
      name,
      isEnabled,
      pluginName,
      canRefund
    }
  }
`

export default availablePaymentMethods
