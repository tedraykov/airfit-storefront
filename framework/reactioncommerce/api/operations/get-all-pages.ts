import { getContentfulPages } from '@lib/contentful/contentful'
import { Page } from '@framework/types'
import { normalizeContentfulPages } from '@framework/utils'
import { OperationContext } from '@commerce/api/operations'
import { Provider, ReactionCommerceConfig } from '@framework/api'
import { IPage } from '@lib/contentful/schema'

export type GetAllPagesResult<T extends { pages: any[] } = { pages: Page[] }> =
  T

export default function getAllPagesOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllPages({
    config: cfg,
    preview,
  }: {
    url?: string
    config?: Partial<ReactionCommerceConfig>
    preview?: boolean
  } = {}): Promise<GetAllPagesResult> {
    const contentfulPages = await getContentfulPages()
    const pages = normalizeContentfulPages(contentfulPages as IPage[])
    return {
      pages,
    }
  }

  return getAllPages
}
