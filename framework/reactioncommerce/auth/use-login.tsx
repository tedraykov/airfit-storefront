import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCustomer from '../customer/use-customer'
import authenticateMutation from '../utils/mutations/authenticate'
import hashPassword from '../utils/hash-password'
import { Mutation, MutationAuthenticateArgs } from '../schema'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import { setCustomerToken, setRefreshToken } from '../utils'
import { LoginHook } from '@commerce/types/login'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<LoginHook> = {
  fetchOptions: {
    query: authenticateMutation,
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to login',
      })
    }

    const { authenticate } = await fetch<Mutation, MutationAuthenticateArgs>({
      ...options,
      variables: {
        serviceName: 'password',
        params: {
          user: { email },
          password: hashPassword(password),
        },
      },
    })

    const accessToken = authenticate?.tokens?.accessToken
    const refreshToken = authenticate?.tokens?.refreshToken

    if (accessToken && refreshToken) {
      setCustomerToken(accessToken)
      setRefreshToken(refreshToken, { expires: 7 })
    }

    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { revalidate } = useCustomer()

      return useCallback(
        async function login(input) {
          const data = await fetch({ input })
          await revalidate()
          return data
        },
        [fetch, revalidate]
      )
    },
}
