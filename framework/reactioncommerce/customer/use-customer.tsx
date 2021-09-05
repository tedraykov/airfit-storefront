import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import { SWRHook } from '@commerce/utils/types'
import { viewerQuery, normalizeCustomer } from '../utils'
import { CustomerHook } from '@framework/types/customer'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    query: viewerQuery,
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<any | null>({
      ...options,
    })
    return normalizeCustomer(data.viewer)
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}
