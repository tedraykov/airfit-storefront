import Script from 'next/script'
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
  const featuredProductsPromise = commerce.getFeaturedProducts()

  const { products } = await productsPromise
  const { featuredProducts } = await featuredProductsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  const { hero } = await heroPromise

  return {
    props: {
      products,
      featuredProducts: featuredProducts || [],
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
  featuredProducts,
  hero,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Script
        id="klaviyo-signup"
        async
        type="text/javascript"
        src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=ReJ3p8"
      />
      <Banner />
      <ProductsList products={products} />
      <Slideshow products={featuredProducts} />
      <Hero
        headline={hero?.headline ?? ''}
        description={hero?.description ?? ''}
      />
    </>
  )
}

Home.Layout = Layout
