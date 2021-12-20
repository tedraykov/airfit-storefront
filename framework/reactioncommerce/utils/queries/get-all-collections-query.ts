const getCategoriesQuery = /* GraphQL */ `
  query getCategoriesQuery($id: ID!) {
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
export default getCategoriesQuery
