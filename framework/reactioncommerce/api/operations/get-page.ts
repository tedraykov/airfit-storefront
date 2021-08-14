import { OperationContext } from '@commerce/api/operations'
import { ReactionCommerceConfig, Provider } from '..'
import { normalizeContentfulPage } from '@framework/utils'
import { getContentfulPage } from '@lib/contentful/contentful'
import { IPage } from '@lib/contentful/schema'
import { Page } from '@framework/types/page'

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

export type PageVariables = {
  id: string
}

export default function getPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage({
    url,
    variables,
    config: cfg,
    preview,
  }: {
    url?: string
    variables: PageVariables
    config?: Partial<ReactionCommerceConfig>
    preview?: boolean
  }): Promise<GetPageResult> {
    const contentfulPage = await getContentfulPage(variables.id)
    if (!contentfulPage) {
      return {}
    }
    return {
      page: normalizeContentfulPage(contentfulPage as IPage),
    }
  }

  return getPage
}
