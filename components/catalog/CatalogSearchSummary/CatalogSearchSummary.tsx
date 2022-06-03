import type { FC } from 'react'
import { useRouter } from 'next/router'
import { CatalogProduct } from '@graphql/schema'

type CatalogSearchSummaryProps = {
  products: CatalogProduct[]
  totalCount: number
  loading: boolean
}

const CatalogSearchSummary: FC<CatalogSearchSummaryProps> = ({
  products,
  totalCount,
}) => {
  const { query } = useRouter()
  const { tag, q } = query

  const Wrapper: FC = ({ children }) => {
    return <div className="mb-6 transition ease-in duration-75">{children}</div>
  }

  /*
   * Text search loading
   */
  if (!products && q) {
    return (
      <Wrapper>
        Търсене на: "<strong>{q}</strong>"
      </Wrapper>
    )
  }

  /*
   * Search query with no results
   */
  if (products && q && totalCount === 0) {
    return (
      <Wrapper>
        Няма намерени продукти, които да включват "<strong>{q}</strong>"
      </Wrapper>
    )
  }

  /*
   * Search query with results
   */
  if (products && q && totalCount > 0) {
    return (
      <Wrapper>
        <span className="animated fadeIn">
          {totalCount} резултата за "<strong>{q}</strong>"
        </span>
      </Wrapper>
    )
  }

  /*
   * Filters query with no results
   */
  if (products && tag && totalCount === 0) {
    return (
      <Wrapper>
        <span className="animated fadeIn">
          Няма намерени продукти в избраната категория.
        </span>
      </Wrapper>
    )
  }

  return null
}

export default CatalogSearchSummary
