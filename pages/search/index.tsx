import type { GetStaticPropsContext } from 'next'
import { CatalogView } from '@components/catalog'
import { InferGetStaticPropsType } from 'next'
import { Layout } from '@components/common'
import commonStaticProps from '@utils/static/commonStaticProps'

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const commonProps = await commonStaticProps(ctx)
  return {
    props: {
      ...commonProps,
    },
    revalidate: 60 * 30,
  }
}

const Search = ({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <CatalogView categories={categories} />
}

Search.Layout = Layout

export default Search
