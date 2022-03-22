const cartItemConnectionFragment = `
  pageInfo {
    hasNextPage
    endCursor
  }
  nodes {
    _id
    productConfiguration {
      productId
      productVariantId
    }
    addedAt
    attributes {
      label
      value
    }
    createdAt
    isBackorder
    isLowQuantity
    isSoldOut
    imageURLs {
      large
      small
      original
      medium
      thumbnail
    }
    metafields {
      value
      key
    }
    parcel {
      length
      width
      weight
      height
    }
    price {
      amount
      displayAmount
      currency {
        code
      }
    }
    priceWhenAdded {
      amount
      displayAmount
      currency {
        code
      }
    }
    compareAtPrice {
      amount
    }
    productSlug
    productType
    quantity
    shop {
      _id
    }
    subtotal {
      displayAmount
    }
    title
    productTags {
      nodes {
        name
      }
    }
    productVendor
    variantTitle
    optionTitle
    updatedAt
    inventoryAvailableToSell
  }
`

export default cartItemConnectionFragment
