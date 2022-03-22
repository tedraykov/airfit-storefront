import { useState } from 'react'
import { request, RequestDocument } from 'graphql-request'
import { Key, SWRResponse } from 'swr'

import { GRAPHQL_URL } from '@config/index'

export type MutationHookResponseType<T = any, D = any> = Omit<
  SWRResponse<T, D>,
  'mutate'
>

type MutationHookOptions<T, D> = {
  variables?: Key
  onCompleted?: (data: T) => void
  onError?: (error: D) => void
}

type MutationHookReturnType<T, D> = [
  (options: MutationHookOptions<T, D>) => void,
  MutationHookResponseType<T, D>
]

const fetcher = (mutation: RequestDocument, variables?: any) =>
  request(GRAPHQL_URL, mutation, variables)

export default function useMutation<T = any, D = any>(
  mutation: RequestDocument,
  globalOptions?: MutationHookOptions<T, D>
): MutationHookReturnType<T, D> {
  const [data, setData] = useState<T | undefined>(undefined)
  const [error, setError] = useState<D | undefined>(undefined)
  const [isValidating, setIsValidating] = useState(false)

  const executeMutation = (options: MutationHookOptions<T, D>) => {
    setIsValidating(true)
    return fetcher(mutation, options?.variables)
      .then((data) => {
        setData(data)
        setIsValidating(false)
        globalOptions?.onCompleted && globalOptions?.onCompleted(data)
        options?.onCompleted && options?.onCompleted(data)
      })
      .catch((error) => {
        setError(error)
        setIsValidating(false)
        globalOptions?.onError && globalOptions?.onError(error)
        options?.onError && options?.onError(error)
      })
  }

  return [
    executeMutation,
    {
      data,
      isValidating,
      error,
    },
  ]
}
