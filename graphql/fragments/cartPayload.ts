import cartCommon from '@graphql/fragments/cartCommon'
import cartItemConnectionFragment from '@graphql/fragments/cartItemConnection'

const cartPayloadFragment = `
  ${cartCommon}
  items {
    ${cartItemConnectionFragment}
  }
`
export default cartPayloadFragment
