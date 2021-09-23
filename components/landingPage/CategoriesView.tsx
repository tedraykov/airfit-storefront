import { Button } from '@components/ui'
import { Product } from '@framework/types/product'
import { ProductCard } from '@components/product'
import { Category } from '@commerce/types/site'
import { FC, useEffect, useRef, useState } from 'react'
import s from './CategoriesView.module.css'
import throttle from 'lodash.throttle'
import cn from 'classnames'

interface CategoriesViewProps {
  categories: Category[]
  products: Product[]
}

const CategoriesView: FC<CategoriesViewProps> = ({ categories, products }) => {
  const [reachedBeginning, setReachedBeginning] = useState(true)
  const [reachedEnd, setReachedEnd] = useState(false)
  const categoriesListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(categoriesListRef)
    if (!categoriesListRef || !categoriesListRef.current) return
    const handleScroll = throttle(() => {
      const { scrollLeft, offsetWidth, scrollWidth } =
        categoriesListRef.current!

      const atBeginning = scrollLeft === 0
      const atEnd = offsetWidth + scrollLeft >= scrollWidth

      console.log(`Reached beginning: ${atBeginning}`)
      console.log(`Reached end: ${atEnd}`)

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

  return (
    <div className="flex flex-col space-y-6 px-6 py-4">
      <div className="relative">
        <div
          className={cn(
            s.leftListGradient,
            `animated ${!reachedBeginning ? 'fadeIn' : 'fadeOut'}`
          )}
        />
        <div ref={categoriesListRef} className={s.categoriesList}>
          {categories
            .filter((c) => c.slug !== undefined)
            .map((l) => (
              <Button key={l.slug} size="slim" color="secondary" round>
                {l.name}
              </Button>
            ))}
        </div>
        <div
          className={cn(
            s.rightListGradient,
            `animated ${!reachedEnd ? 'fadeIn' : 'fadeOut'}`
          )}
        />
      </div>
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
      <Button color="secondary" round size="slim" className="font-medium">
        Разгледай останалите...
      </Button>
    </div>
  )
}

export default CategoriesView
