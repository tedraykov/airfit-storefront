export const incorrectPriceFailureDetailsFragment = `
  currentPrice {
    amount
    currency {
      code
    }
    displayAmount
  }
  productConfiguration {
    productId
    productVariantId
  }
  providedPrice {
    amount
    currency {
      code
    }
    displayAmount
  }
`
export default incorrectPriceFailureDetailsFragment
