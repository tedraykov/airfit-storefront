import { gql } from '@apollo/client'

export default gql`
  query EcontOffices {
    econtOffices {
      code
      name
      address {
        address1
        city
        company
        country
        isCommercial
        metafields {
          key
          value
        }
        postal
        region
      }
    }
  }
`
