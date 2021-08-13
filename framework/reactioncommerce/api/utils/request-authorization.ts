function getAuthorizationHeader(reactionCustomerToken: string) {
  let authorizationHeader = {}
  if (reactionCustomerToken) {
    authorizationHeader = { Authorization: `Bearer ${reactionCustomerToken}` }
  }
  return authorizationHeader
}

export default getAuthorizationHeader
