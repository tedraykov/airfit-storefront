import { Layout } from '@components/common'
import { Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import Banner from '@components/ui/Banner/Banner'
import { ProductsList, Slideshow } from '@components/landingPage'
import { KlaviyoSignup } from '@lib/klaviyo'
import getCatalogProducts from '@server/operations/getCatalogProducts'
import { SHOP_ID } from '@config/index'
import { QueryCatalogItemsArgs } from '@graphql/schema'
import commonStaticProps from '@utils/static/commonStaticProps'
import getHero from '@utils/static/getHero'
import getFeaturedProducts from '@utils/static/getFeaturedProducts'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const commonProps = await commonStaticProps({ preview, locale, locales })

  const products = await getCatalogProducts({
    shopIds: [SHOP_ID],
  } as QueryCatalogItemsArgs)

  const landingPageHeroId = '5zUKnt2GRtt2NvpOgnNuO0'
  const hero = await getHero(landingPageHeroId)

  const featuredProducts = await getFeaturedProducts()

  return {
    props: {
      products,
      featuredProducts: featuredProducts || [],
      hero,
      ...commonProps,
    },
    revalidate: 144,
  }
}

export default function Home({
  products,
  featuredProducts,
  hero,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <KlaviyoSignup />
      <Banner />
      <ProductsList products={products} />
      <Slideshow products={featuredProducts} />
      <Hero
        headline={hero?.fields.headline ?? ''}
        description={hero?.fields.description ?? ''}
      />
    </>
  )
}

Home.Layout = Layout
