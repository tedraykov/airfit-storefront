import getDefaultNavigationTree from '@server/operations/getDefaultNavigationTree'
import { GetStaticPropsContext } from 'next'
import getPages from '@utils/static/getPages'

export default async function commonStaticProps({
  locale,
}: GetStaticPropsContext) {
  const pages = await getPages(locale)
  const categories = await getDefaultNavigationTree()

  return {
    pages,
    categories,
  }
}
