import { gql } from '@apollo/client'

export default gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(user: $input) {
      loginResult {
        tokens {
          refreshToken
          accessToken
        }
      }
    }
  }
`
