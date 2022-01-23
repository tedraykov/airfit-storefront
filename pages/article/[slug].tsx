import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import commerce from '@lib/api/commerce'
import getSlug from '@lib/get-slug'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { options } from '@lib/contentful/options'
import { Page } from '@framework/types/page'

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })

  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  const pageItem = pages.find((p: Page) =>
    p.url ? getSlug(p.url) === params?.slug : false
  )

  const data =
    pageItem &&
    (await commerce.getPage({
      variables: { id: pageItem.id! },
      config,
      preview,
    }))

  const page = data?.page

  if (!page) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      page,
      categories,
    },
    revalidate: 60 * 60 * 12,
  }
}

export async function getStaticPaths() {
  const config = commerce.getConfig()
  const { pages } = await commerce.getAllPages({ config })

  return {
    paths: pages.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  }
}

export default function Slug({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <div className="max-w-6xl mx-auto p-10">
      {page?.body && documentToReactComponents(page.body, options)}
    </div>
  )
}

Slug.Layout = Layout
