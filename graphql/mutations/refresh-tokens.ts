const refreshTokensMutation = `
  mutation refreshTokensMutation($accessToken: String!, $refreshToken: String!) {
    refreshTokens(
      accessToken: $accessToken
      refreshToken: $refreshToken
    ) {
      tokens {
        refreshToken
        accessToken
      }
    }
  }
`

export default refreshTokensMutation
