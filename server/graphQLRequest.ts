import { GraphQLClient, RequestDocument } from 'graphql-request'
import { GRAPHQL_URL } from '@config/index'

/**
 * Executes an arbitrary GraphQL query against the Reaction API
 *
 * @param {String} query - The GraphQL query to execute
 * @param {Object | undefined} variables - The query's variables
 * @returns {Object} data - the resulting query data
 */
export default async function graphQLRequest<T>(
  query: RequestDocument,
  variables: { [key: string]: any }
): Promise<T> {
  try {
    const graphQLClient = new GraphQLClient(GRAPHQL_URL)

    return await graphQLClient.request<T>(query, variables)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('error-fetching-graphql', error)
    return Promise.resolve({} as T)
  }
}
