import cartCommon from '@graphql/fragments/cartCommon'
import cartItemConnectionFragment from '@graphql/fragments/cartItemConnection'

const cartQueryFragment = `
  ${cartCommon}
  items(first: 20, after: $itemsAfterCursor) {
    ${cartItemConnectionFragment}
  }
`
export default cartQueryFragment
