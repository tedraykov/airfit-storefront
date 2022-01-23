import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import useLogout, { UseLogout } from '@commerce/auth/use-logout'
import useCustomer from '../customer/use-customer'
import logoutMutation from '../utils/mutations/logout'
import { setCustomerToken, setRefreshToken } from '@framework/utils'
import { LogoutHook } from '@commerce/types/logout'
import { useCart } from '@framework/cart'

export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<LogoutHook> = {
  fetchOptions: {
    query: logoutMutation,
  },
  async fetcher({ options, fetch }) {
    await fetch({
      ...options,
    })
    setCustomerToken(null)
    setRefreshToken(null)
    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutate } = useCustomer()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutate: cartMutate } = useCart()

      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useCallback(
        async function logout() {
          const data = await fetch()
          await mutate(null, false)
          await cartMutate(null, false)
          return data
        },
        [mutate, cartMutate]
      )
    },
}
