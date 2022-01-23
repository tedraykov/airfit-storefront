import { Page as CorePage } from '@commerce/types/page'
import { Document } from '@contentful/rich-text-types'

export type Page = CorePage & {
  body: Document
  slug: string
}

export type Hero = {
  headline: string
  description: string
}

export type FeaturedProduct = {
  title: string
  subTitle?: string
  description: string
  productImage: string
  productImageThumbnail: string
  buttonText?: string
  productUrl: string
  backgroundColor: string
  useReversedText: boolean
}
