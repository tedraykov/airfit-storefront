import { Button } from '@components/ui'
import { Product } from '@framework/types/product'
import { ProductCard } from '@components/product'
import { Category } from '@commerce/types/site'
import { FC, memo, useEffect, useRef, useState } from 'react'
import s from './CategoriesView.module.css'
import throttle from 'lodash.throttle'
import cn from 'classnames'
import { useRouter } from 'next/router'
import ScrollContainer from 'react-indiana-drag-scroll'

interface CategoriesViewProps {
  categories: Category[]
  products: Product[]
}

function getProductsPerCategory(
  products: Product[],
  categories: Category[]
): { [tag: string]: Product[] } {
  return categories.reduce((result, category) => {
    return {
      ...result,
      [category.slug]: products.filter((product) =>
        product.tags.includes(category.slug)
      ),
    }
  }, {} as { [tag: string]: Product[] })
}

const CategoriesView: FC<CategoriesViewProps> = ({ categories, products }) => {
  const router = useRouter()
  const [reachedBeginning, setReachedBeginning] = useState(true)
  const [reachedEnd, setReachedEnd] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(0)
  const categoriesListRef = useRef<HTMLDivElement>(null)

  const [productsPerCategory] = useState(
    getProductsPerCategory(products, categories)
  )

  useEffect(() => {
    if (!categoriesListRef || !categoriesListRef.current) return
    const handleScroll = throttle(() => {
      const { scrollLeft, offsetWidth, scrollWidth } =
        categoriesListRef.current!

      const atBeginning = scrollLeft === 0
      const atEnd = offsetWidth + scrollLeft >= scrollWidth

      if (reachedBeginning !== atBeginning) {
        setReachedBeginning(atBeginning)
      }

      if (reachedEnd !== atEnd) {
        setReachedEnd(atEnd)
      }
    }, 200)

    categoriesListRef.current.addEventListener('scroll', handleScroll)
    return () => {
      categoriesListRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [categoriesListRef, reachedBeginning, reachedEnd])

  function navigateToSelectedCategory() {
    router.push(`/search/${categories[selectedCategory].slug}`).then()
  }

  function selectCategory(index: number) {
    setSelectedCategory(index)
    const selectedCategoryButton: HTMLElement =
      categoriesListRef.current?.children.item(index) as HTMLElement
    categoriesListRef.current!.scrollBy({
      top: 0,
      left: selectedCategoryButton.offsetLeft,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex flex-col space-y-6 px-6 py-4">
      <div className="relative">
        <div
          className={cn(
            s.leftListGradient,
            `animated ${!reachedBeginning ? 'fadeIn' : 'fadeOut'}`
          )}
        />
        <ScrollContainer
          className={cn(s.categoriesList)}
          innerRef={categoriesListRef}
        >
          {categories
            .filter((c) => c.slug !== undefined)
            .map((l, index) => (
              <Button
                key={l.slug}
                className=""
                size="slim"
                color="secondary"
                round
                active={selectedCategory === index}
                onClick={() => selectCategory(index)}
              >
                {l.name}
              </Button>
            ))}
        </ScrollContainer>
        <div
          className={cn(
            s.rightListGradient,
            `animated ${!reachedEnd ? 'fadeIn' : 'fadeOut'}`
          )}
        />
      </div>
      <ProductList
        products={productsPerCategory[categories[selectedCategory].slug]}
      />
      <Button
        color="secondary"
        round
        size="slim"
        className="font-medium"
        onClick={navigateToSelectedCategory}
      >
        Разгледай останалите...
      </Button>
    </div>
  )
}

const ProductList: FC<{ products: Product[] }> = memo(({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product: Product) => (
        <ProductCard
          variant="simple"
          key={product.path}
          className="animated fadeIn shadow-sm"
          product={product}
          imgProps={{
            width: 480,
            height: 480,
          }}
        />
      ))}
    </div>
  )
})

export default CategoriesView
