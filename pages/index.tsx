import { Layout } from '@components/common'
import { Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'
import Banner from '@components/ui/Banner/Banner'
import { ProductsList, Slideshow } from '@components/landingPage'
// @ts-ignore
import MessengerCustomerChat from 'react-messenger-customer-chat'

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
      featuredProducts,
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
      <Banner />
      <ProductsList products={products} />
      <Slideshow products={featuredProducts} />
      <Hero
        headline={hero?.headline ?? ''}
        description={hero?.description ?? ''}
      />
      <MessengerCustomerChat pageId="106359058343709" appId="596200088456927" />
    </>
  )
}

Home.Layout = Layout
