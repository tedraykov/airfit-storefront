import { cleanEnv, str } from 'envalid'

export const REACTION_ANONYMOUS_CART_TOKEN_COOKIE =
  'reaction_anonymousCartToken'

export const REACTION_CUSTOMER_TOKEN_COOKIE = 'reaction_customerToken'

export const REACTION_REFRESH_TOKEN_COOKIE = 'reaction_refreshToken'

export const REACTION_CART_ID_COOKIE = 'reaction_cartId'

export const REACTION_EMPTY_DUMMY_CART_ID = 'DUMMY_EMPTY_CART_ID'

export const REACTION_COOKIE_EXPIRE = 30

export const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_REACTION_API_DOMAIN}/graphql`
export const SHOP_ID = process.env.NEXT_PUBLIC_REACTION_SHOP_ID
