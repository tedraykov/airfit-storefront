import cartPayloadFragment from '@graphql/fragments/cartPayload'

const reconcileCartsMutation = `
  mutation reconcileCartsMutation($input: ReconcileCartsInput!) {
    reconcileCarts(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`

export default reconcileCartsMutation
