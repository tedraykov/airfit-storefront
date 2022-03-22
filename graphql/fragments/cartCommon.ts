const cartCommon = `
  _id
  createdAt
  account {
    _id
    emailRecords {
      address
    }
  }
  shop {
    _id
    currency {
      code
    }
  }
  email
  updatedAt
  expiresAt
  checkout {
    fulfillmentGroups {
      _id
      type
      data {
        shippingAddress {
          address1
          address2
          city
          company
          country
          firstName
          lastName
          fullName
          isBillingDefault
          isCommercial
          isShippingDefault
          phone
          postal
          region
          metafields {
            key
            value
          }
        }
      }
      availableFulfillmentOptions {
        price {
          amount
          displayAmount
        }
        fulfillmentMethod {
          _id
          name
          displayName
        }
      }
      selectedFulfillmentOption {
        fulfillmentMethod {
          _id
          name
          displayName
        }
        price {
          amount
          displayAmount
        }
        handlingPrice {
          amount
          displayAmount
        }
      }
      shop {
        _id
      }
      shippingAddress {
        address1
        address2
        city
        company
        country
        fullName
        isBillingDefault
        isCommercial
        isShippingDefault
        phone
        postal
        region
        metafields {
          key
          value
        }
      }
    }
    summary {
      fulfillmentTotal {
        amount
        displayAmount
      }
      itemTotal {
        amount
        displayAmount
      }
      surchargeTotal {
        amount
        displayAmount
      }
      discountTotal {
        amount
        displayAmount
      }
      taxTotal {
        amount
        displayAmount
      }
      total {
        amount
        currency {
          code
        }
        displayAmount
      }
    }
  }
  totalItemQuantity
`
export default cartCommon
