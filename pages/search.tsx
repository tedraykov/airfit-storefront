import type { GetStaticPropsContext } from 'next'
import { getSearchStaticProps } from '@lib/search-props'
import Search from '@components/search'

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSearchStaticProps(context)
}

export default Search
