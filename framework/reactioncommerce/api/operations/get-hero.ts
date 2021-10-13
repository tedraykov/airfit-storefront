import { normalizeContentfulHero } from '@framework/utils'
import { getContentfulHero } from '@lib/contentful/contentful'
import { Hero } from '@framework/types/page'
import { IHero } from '@lib/contentful/schema'

export type GetHeroResult<T extends { hero?: any } = { hero?: Hero }> = T

export type HeroVariables = {
  id: string
}

export default function getHeroOperation() {
  async function getHero({
    variables,
  }: {
    variables: HeroVariables
  }): Promise<GetHeroResult> {
    const contentfulHero = await getContentfulHero(variables.id)
    if (!contentfulHero) {
      return {}
    }
    return {
      hero: normalizeContentfulHero(contentfulHero as IHero),
    }
  }

  return getHero
}
