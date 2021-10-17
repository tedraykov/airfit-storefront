import { Layout } from '@components/common'
import { Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'
import Banner from '@components/ui/Banner/Banner'
import { ProductsList, Slideshow } from '@components/landingPage'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 25 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })

  const landingPageHeroId = '5zUKnt2GRtt2NvpOgnNuO0'
  const heroPromise = commerce.getHero({ variables: { id: landingPageHeroId } })

  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  const { hero } = await heroPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
      hero,
    },
    revalidate: 144,
  }
}

export default function Home({
  products,
  hero,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Banner />
      <ProductsList products={products} />
      <Slideshow products={products} />
      <Hero
        headline={hero?.headline ?? ''}
        description={hero?.description ?? ''}
      />
    </>
  )
}

Home.Layout = Layout
