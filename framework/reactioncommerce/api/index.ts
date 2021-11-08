import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
} from '@commerce/api'

import {
  API_URL,
  REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  REACTION_CART_ID_COOKIE,
  REACTION_EMPTY_DUMMY_CART_ID,
  REACTION_CUSTOMER_TOKEN_COOKIE,
  REACTION_REFRESH_TOKEN_COOKIE,
  REACTION_COOKIE_EXPIRE,
  SHOP_ID,
} from '../const'

if (!API_URL) {
  throw new Error(
    `The environment variable API_URL is missing and it's required to access your store`
  )
}

if (!SHOP_ID) {
  throw new Error(
    `The environment variable SHOP_ID is missing and it's required to access your store`
  )
}

import fetchGraphqlApi from './utils/fetch-graphql-api'
import login from './operations/login'
import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'
import getHero from '@framework/api/operations/get-hero'
import getFeaturedProducts from '@framework/api/operations/get-featured-products'

export interface ReactionCommerceConfig extends CommerceAPIConfig {
  shopId: string
  refreshTokenCookie: string
  cartIdCookie: string
  dummyEmptyCartId?: string
  anonymousCartTokenCookie?: string
  anonymousCartTokenCookieMaxAge?: number
}

const config: ReactionCommerceConfig = {
  locale: 'bg-BG',
  commerceUrl: API_URL,
  apiToken: REACTION_CUSTOMER_TOKEN_COOKIE,
  cartCookie: REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  cartIdCookie: REACTION_CART_ID_COOKIE,
  dummyEmptyCartId: REACTION_EMPTY_DUMMY_CART_ID,
  cartCookieMaxAge: REACTION_COOKIE_EXPIRE,
  anonymousCartTokenCookie: REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  anonymousCartTokenCookieMaxAge: REACTION_COOKIE_EXPIRE,
  fetch: fetchGraphqlApi,
  customerCookie: REACTION_CUSTOMER_TOKEN_COOKIE,
  refreshTokenCookie: REACTION_REFRESH_TOKEN_COOKIE,
  shopId: SHOP_ID,
}

const operations = {
  login,
  getAllPages,
  getPage,
  getHero,
  getSiteInfo,
  getAllProductPaths,
  getAllProducts,
  getProduct,
  getFeaturedProducts,
}

export const provider = { config, operations }

export type Provider = typeof provider

export type ReactionCommerceAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): ReactionCommerceAPI<P> {
  return commerceApi(customProvider)
}
