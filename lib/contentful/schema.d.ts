// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export interface IFeaturedProductFields {
  /** Title */
  title: string

  /** Sub Title */
  subTitle?: string | undefined

  /** Short Description */
  shortDecription: string

  /** Product Image */
  productImage: Asset

  /** Button Text */
  buttonText?: string | undefined

  /** Product URL */
  productUrl: string

  /** backgroundColor */
  backgroundColor: string

  /** useReversedText */
  useReversedText?: boolean | undefined

  /** slug */
  slug?: string | undefined
}

export interface IFeaturedProduct extends Entry<IFeaturedProductFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'featuredProduct'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IHeroFields {
  /** headline */
  headline?: string | undefined

  /** description */
  description?: string | undefined
}

/** Short block of information with a headline and a description */

export interface IHero extends Entry<IHeroFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'hero'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IPageFields {
  /** Internal name */
  name: string

  /** Page title */
  title: string

  /** Slug */
  slug: string

  /** SEO metadata */
  seo?: ISeo | undefined

  /** Body */
  body?: Document | undefined
}

/** Represents a web page. */

export interface IPage extends Entry<IPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'page'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface ISeoFields {
  /** Internal name */
  name: string

  /** SEO title */
  title?: string | undefined

  /** Description */
  description?: string | undefined

  /** Keywords */
  keywords?: string[] | undefined

  /** Hide page from search engines (noindex) */
  no_index?: boolean | undefined

  /** Exclude links from search rankings? (nofollow) */
  no_follow?: boolean | undefined

  /** Display title */
  displayTitle?: string | undefined
}

/** SEO Metadata for web pages in Compose. DO NOT DELETE */

export interface ISeo extends Entry<ISeoFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'seo'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export type CONTENT_TYPE = 'featuredProduct' | 'hero' | 'page' | 'seo'

export type LOCALE_CODE = 'bg-BG' | 'en-US'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US'
