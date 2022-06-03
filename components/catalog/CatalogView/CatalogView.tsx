import type { FC } from 'react'
import {
  CatalogCategories,
  CatalogGrid,
  CatalogSearchSummary,
} from '@components/catalog'
import { NavigationTree, QueryCatalogItemsArgs, Tag } from '@graphql/schema'
import useSearch from '@hooks/useSearch'

type CatalogViewProps = {
  categories: NavigationTree
  tag?: Tag
}

const CatalogView: FC<CatalogViewProps> = ({ categories, tag }) => {
  const { products, totalCount, loading } = useSearch({
    tagIds: tag ? [tag._id] : null,
  } as QueryCatalogItemsArgs)

  return (
    <div
      className={`
      grid p-6 max-w-8xl mx-auto
      lg:grid-cols-[3fr_10fr]
      2xl:grid-cols-[2fr_10fr]
    `}
    >
      <CatalogCategories categories={categories} />
      <div>
        <CatalogSearchSummary
          products={products}
          totalCount={totalCount || 0}
          loading={loading}
        />
        <CatalogGrid products={products} loading={loading} />
      </div>
    </div>
  )
}

export default CatalogView
