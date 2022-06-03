import { getContentfulPages } from '@lib/contentful/contentful'

export default async function getPageBySlug(slug: string) {
  const contentfulPage = await getContentfulPages({
    'fields.slug[in]': slug,
  })

  if (!contentfulPage || contentfulPage.length === 0) {
    return null
  }
  return contentfulPage[0]
}
