import {
  createContext,
  useState,
  useEffect,
  useMemo,
  FC,
  useCallback,
} from 'react'
import Cookies from 'js-cookie'

const ANONYMOUS_CART_ID_KEY_NAME = 'anonymousCartId'
const ANONYMOUS_CART_TOKEN_KEY_NAME = 'anonymousCartToken'

type State = {
  anonymousCartId: string | null
  anonymousCartToken: string | null
  accountCartId: string | null
  setAnonymousCartCredentials: (
    newAnonymousCartId: string | null,
    newAnonymousCartToken: string | null
  ) => void
  clearAnonymousCartCredentials: () => void
  hasAnonymousCartCredentials: boolean
  hasAccountCart: boolean
  setAccountCartId: (id: string) => void
}

export const CartContext = createContext<State>({} as State)

export const CartProvider: FC = ({ children }) => {
  const [anonymousCartId, setAnonymousCartId] = useState<string | null>(null)
  const [anonymousCartToken, setAnonymousCartToken] = useState<string | null>(
    null
  )
  const [accountCartId, setAccountCartId] = useState<string | null>(null)

  const setAnonymousCartCredentials = useCallback(
    (
      newAnonymousCartId: string | null,
      newAnonymousCartToken: string | null
    ) => {
      setAnonymousCartId(newAnonymousCartId)
      setAnonymousCartToken(newAnonymousCartToken)

      if (typeof newAnonymousCartId === 'string' && newAnonymousCartId.length) {
        // Save to local storage
        localStorage.setItem(ANONYMOUS_CART_ID_KEY_NAME, newAnonymousCartId)
        newAnonymousCartToken &&
          localStorage.setItem(
            ANONYMOUS_CART_TOKEN_KEY_NAME,
            newAnonymousCartToken
          )

        // Save cookies
        Cookies.set(ANONYMOUS_CART_ID_KEY_NAME, newAnonymousCartId)
        newAnonymousCartToken &&
          Cookies.set(ANONYMOUS_CART_TOKEN_KEY_NAME, newAnonymousCartToken)
      } else {
        // Remove from local storage
        localStorage.removeItem(ANONYMOUS_CART_ID_KEY_NAME)
        localStorage.removeItem(ANONYMOUS_CART_TOKEN_KEY_NAME)

        // Remove cookies
        Cookies.remove(ANONYMOUS_CART_ID_KEY_NAME)
        Cookies.remove(ANONYMOUS_CART_TOKEN_KEY_NAME)
      }
    },
    []
  )

  const clearAnonymousCartCredentials = useCallback(() => {
    setAnonymousCartCredentials(null, null)
  }, [])

  const setAnonymousCartCredentialsFromLocalStorage = () => {
    const anonymousCartId = localStorage.getItem(ANONYMOUS_CART_ID_KEY_NAME)
    const anonymousCartToken = localStorage.getItem(
      ANONYMOUS_CART_TOKEN_KEY_NAME
    )

    setAnonymousCartCredentials(anonymousCartId, anonymousCartToken)
  }

  const hasAnonymousCartCredentials = useMemo(
    () => Boolean(anonymousCartId && anonymousCartToken) || false,
    [anonymousCartId, anonymousCartToken]
  )

  const hasAccountCart = useMemo(
    () => typeof accountCartId === 'string',
    [accountCartId]
  )
  useEffect(() => {
    setAnonymousCartCredentialsFromLocalStorage()
  }, [])

  const value = useMemo(
    () => ({
      anonymousCartId,
      anonymousCartToken,
      accountCartId,
      setAnonymousCartCredentials,
      clearAnonymousCartCredentials,
      hasAnonymousCartCredentials,
      hasAccountCart,
      setAccountCartId,
    }),
    [
      accountCartId,
      anonymousCartId,
      anonymousCartToken,
      clearAnonymousCartCredentials,
      hasAccountCart,
      hasAnonymousCartCredentials,
      setAnonymousCartCredentials,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
