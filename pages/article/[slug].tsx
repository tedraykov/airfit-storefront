import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { options } from '@lib/contentful/options'
import getPageBySlug from '@utils/static/getPageBySlug'
import commonStaticProps from '@utils/static/commonStaticProps'
import getPages from '@utils/static/getPages'

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const { slug } = params!
  const commonProps = await commonStaticProps({ locale, locales, preview })
  const page = await getPageBySlug(slug)

  if (!page) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      page,
      ...commonProps,
    },
    revalidate: 60 * 60 * 12,
  }
}

export async function getStaticPaths() {
  const pages = await getPages()

  return {
    paths: pages.map(({ fields }) => ({
      params: { slug: fields.slug },
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
      {page?.fields.body &&
        documentToReactComponents(page?.fields.body, options)}
    </div>
  )
}

Slug.Layout = Layout
