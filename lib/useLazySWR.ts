import { useCallback, useState } from 'react'
import useSWR, { Key, SWRConfiguration, SWRResponse } from 'swr'

export const useLazySWR = <Data = any, Error = any>(
  fetcher?: ((...args: any) => Data | Promise<Data>) | null,
  config?: SWRConfiguration<Data, Error> | undefined
): [(key: Key) => void, SWRResponse<Data, Error>] => {
  const [key, setKey] = useState<Key>(null)
  const ret = useSWR<Data, Error>(key, fetcher ?? null, config)

  const execute = (key: Key) => {
    setKey(key)
  }

  return [execute, ret]
}
