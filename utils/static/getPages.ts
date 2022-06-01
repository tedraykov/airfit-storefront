import { getContentfulPages } from '@lib/contentful/contentful'

export default async function getPages(locale: string = 'bg-BG') {
  const contentfulPages = await getContentfulPages({ locale })
  return contentfulPages || []
}
