import { createClient, Entry } from 'contentful'
import { IPage, IPageFields } from '@lib/contentful/schema'
import { Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { Text } from 'components/ui'
export const contentfulClient = () => {
  return createClient({
    space: '9q0u06dganwf', // ID of a Compose-compatible space to be used \
    accessToken: 'xvYz4TfUxhiYkcY2Q4wfmFEYF-v8JGZczrvatyUPQR4', // delivery API key for the space \
  })
}

type GetPageParams = {
  pageContentType?: string
  slug?: string
  locale?: string
}

export async function getContentfulPages() {
  const query = {
    content_type: 'page',
  }
  const entries = await contentfulClient().getEntries<IPageFields>(query)
  return entries.items
}

export async function getContentfulPage(id: string) {
  const query = {
    content_type: 'page',
  }
  return await contentfulClient().getEntry(id, query)
}
