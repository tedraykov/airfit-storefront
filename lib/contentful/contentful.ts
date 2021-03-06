import { createClient } from 'contentful'
import {
  IFeaturedProduct,
  IFeaturedProductFields,
  IHero,
  IHeroFields,
  IPageFields,
} from '@lib/contentful/schema'

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const CONTENTFUL_DELIVERY_API_ACCESS_TOKEN =
  process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN

if (!CONTENTFUL_SPACE_ID) {
  throw new Error(
    `The environment variable CONTENTFUL_SPACE_ID is missing and it's required to access your store`
  )
}

if (!CONTENTFUL_DELIVERY_API_ACCESS_TOKEN) {
  throw new Error(
    `The environment variable CONTENTFUL_DELIVERY_API_ACCESS_TOKEN is missing and it's required to access your store`
  )
}

export const contentfulClient = () => {
  return createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_DELIVERY_API_ACCESS_TOKEN,
  })
}

export async function getContentfulPages(query?: object) {
  const pagesQuery = {
    content_type: 'page',
    ...query,
  }
  const entries = await contentfulClient().getEntries<IPageFields>(pagesQuery)
  return entries.items
}

export async function getContentfulPage(id: string) {
  const query = {
    content_type: 'page',
  }
  return await contentfulClient().getEntry(id, query)
}

export async function getContentfulHero(id: string) {
  const query = {
    content_type: 'hero',
  }
  return await contentfulClient().getEntry<IHeroFields>(id, query)
}

export async function getContentfulFeaturedProducts() {
  const query = {
    content_type: 'featuredProduct',
  }

  const entries = await contentfulClient().getEntries<IFeaturedProductFields>(
    query
  )
  return entries.items
}
