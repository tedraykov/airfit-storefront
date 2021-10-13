import { Page as CorePage } from '@commerce/types/page'
import { Document } from '@contentful/rich-text-types'

export type Page = CorePage & {
  body: Document
}

export type Hero = {
  headline: string
  description: string
}
