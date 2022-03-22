import { request, RequestDocument } from 'graphql-request'
import useSWR, { Key, SWRResponse, useSWRConfig } from 'swr'
import { GRAPHQL_URL } from '@config/index'
import { useState } from 'react'

type LazyQueryHookReturnType<T, D> = [
  (variables?: any) => void,
  SWRResponse<T, D>
]

const fetcher = (query: RequestDocument, variables?: any) =>
  request(GRAPHQL_URL, query, variables)

export default function useLazyQuery<T = any, D = any>(
  query: RequestDocument
): LazyQueryHookReturnType<T, D> {
  const { cache } = useSWRConfig()
  const [key, setKey] = useState<Key>(null)
  const ret = useSWR<T, D>(key, fetcher)

  const executeQuery = (variables?: any) => {
    cache.delete(query)
    setKey([query, variables])
  }

  return [executeQuery, ret]
}
