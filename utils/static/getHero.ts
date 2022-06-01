import { getContentfulHero } from '@lib/contentful/contentful'

export default async function getHero(id: string) {
  const contentfulHero = await getContentfulHero(id)

  if (!contentfulHero) {
    return null
  }
  return contentfulHero
}
