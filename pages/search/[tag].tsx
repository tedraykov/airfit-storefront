import type { GetStaticPropsContext } from 'next'
import { CatalogView } from '@components/catalog'
import { InferGetStaticPropsType } from 'next'
import getTag from '@server/operations/getTag'
import { Layout } from '@components/common'
import getTags from '@server/operations/getTags'
import commonStaticProps from '@utils/static/commonStaticProps'

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const commonProps = await commonStaticProps(ctx)

  const tagSlug = (ctx.params!.tag as string) || ''
  const tag = await getTag(tagSlug)

  if (!tag) {
    return {
      notFound: true,
      props: {
        ...commonProps,
      },
      revalidate: 60 * 30,
    }
  }

  return {
    props: {
      tag,
      ...commonProps,
    },

    revalidate: 60 * 30,
  }
}

export async function getStaticPaths() {
  const tags = await getTags()

  return {
    paths: tags.map((tag) => `/search/${tag.slug}`),
    fallback: 'blocking',
  }
}

const Search = ({
  categories,
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <CatalogView categories={categories} tag={tag} />
}

Search.Layout = Layout

export default Search
