import { gql } from '@apollo/client'

export default gql`
  query catalogItemProductQuery($slugOrId: String!) {
    catalogItemProduct(slugOrId: $slugOrId) {
      product {
        _id
        productId
        title
        slug
        description
        vendor
        isLowQuantity
        isSoldOut
        isBackorder
        metafields {
          description
          key
          namespace
          scope
          value
          valueType
        }
        pricing {
          currency {
            code
          }
          displayPrice
          minPrice
          maxPrice
        }
        shop {
          currency {
            code
          }
        }
        primaryImage {
          URLs {
            large
            medium
            original
            small
            thumbnail
          }
          priority
          productId
          variantId
        }
        media {
          priority
          productId
          variantId
          URLs {
            thumbnail
            small
            medium
            large
            original
          }
        }
        tags {
          nodes {
            name
            slug
            position
          }
        }
        variants {
          _id
          variantId
          attributeLabel
          title
          optionTitle
          index
          pricing {
            compareAtPrice {
              displayAmount
              amount
            }
            price
            currency {
              code
            }
            displayPrice
          }
          canBackorder
          inventoryAvailableToSell
          isBackorder
          isSoldOut
          isLowQuantity
          options {
            _id
            variantId
            attributeLabel
            title
            index
            pricing {
              compareAtPrice {
                displayAmount
                amount
              }
              price
              currency {
                code
              }
              displayPrice
            }
            optionTitle
            canBackorder
            inventoryAvailableToSell
            isBackorder
            isSoldOut
            isLowQuantity
            media {
              priority
              productId
              variantId
              URLs {
                thumbnail
                small
                medium
                large
                original
              }
            }
            metafields {
              description
              key
              namespace
              scope
              value
              valueType
            }
            primaryImage {
              URLs {
                large
                medium
                original
                small
                thumbnail
              }
              priority
              productId
              variantId
            }
          }
          media {
            priority
            productId
            variantId
            URLs {
              thumbnail
              small
              medium
              large
              original
            }
          }
          metafields {
            description
            key
            namespace
            scope
            value
            valueType
          }
          primaryImage {
            URLs {
              large
              medium
              original
              small
              thumbnail
            }
            priority
            productId
            variantId
          }
        }
      }
    }
  }
`
