import { gql } from '@apollo/client'

export default gql`
  query getDefaultNavigationTree($id: ID!) {
    shop(id: $id) {
      defaultNavigationTree(language: "en") {
        items {
          navigationItem {
            _id
            data {
              contentForLanguage
              url
            }
          }
        }
      }
    }
  }
`
