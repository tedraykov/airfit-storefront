import cn from 'classnames'
import { NextSeo } from 'next-seo'
import React, { FC, useEffect, useState } from 'react'
import s from './ProductView.module.scss'
import { Swatch, ProductSlider } from '@components/product'
import { Button, Container, Text, useUI } from '@components/ui'
import type { Product, ProductOption } from '@framework/types/product'
import usePrice from '@framework/product/use-price'
import { useAddItem } from '@framework/cart'
import {
  getVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import DesktopGallery from '@components/product/DesktopGallery'
import { ProductVariant } from '@framework/types/product'
import { Media, MediaContextProvider } from '@components/common/MediaQueries'

interface Props {
  children?: any
  product: Product
  className?: string
}

const ProductView: FC<Props> = ({ product }) => {
  const addItem = useAddItem()

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const [variant, setVariant] = useState<ProductVariant>(product.variants[0])

  const { price } = usePrice({
    amount: variant.price,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const { openSidebar } = useUI()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setVariant(getVariant(product, selectedOptions)!)
  }, [selectedOptions])

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [])

  const addToCart = async () => {
    setLoading(true)
    try {
      const selectedVariant = variant
      await addItem({
        productId: String(product.id),
        variantId: String(selectedVariant.id),
        pricing: {
          amount: selectedVariant.price,
          currencyCode: product.price.currencyCode ?? 'USD',
        },
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Container className="max-w-none w-full" clean>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.nameBoxContainer}>
            <div className={s.nameBox}>
              <h1 className={s.name}>{product.name}</h1>
              <div className={s.price}>{price}</div>
            </div>
          </div>
          <MediaContextProvider>
            <Media lessThan="lg" className={s.sliderContainer}>
              <ProductSlider key={product.id} images={product.images} />
            </Media>
            <Media greaterThanOrEqual="lg" className={s.galleryContainer}>
              <DesktopGallery images={product.images} />
            </Media>
          </MediaContextProvider>
        </div>
        <div className={s.sidebar}>
          <section>
            <ProductOptions
              options={product.options}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
            <div className="pb-14 break-words w-full max-w-2xl text-left">
              <Text html={product.descriptionHtml || product.description} />
            </div>
          </section>
          <div>
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
            >
              Добави в количката
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

interface ProductOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

const ProductOptions: React.FC<ProductOptionsProps> = React.memo(
  ({ options, selectedOptions, setSelectedOptions }) => {
    return (
      <div>
        {options.map((opt) => (
          <div key={opt.displayName}>
            <h2 className="uppercase font-medium text-sm tracking-wide">
              {opt.displayName}
            </h2>
            <div className="flex flex-row flex-wrap sm:flex-nowrap">
              {opt.values.map((v, i: number) => {
                const active = selectedOptions[opt.displayName.toLowerCase()]
                return (
                  <Swatch
                    key={`${opt.id}-${i}`}
                    className="mb-4"
                    active={v.label.toLowerCase() === active}
                    variant={opt.displayName}
                    color={v.hexColors ? v.hexColors[0] : ''}
                    label={v.label}
                    onClick={() => {
                      setSelectedOptions((selectedOptions) => {
                        return {
                          ...selectedOptions,
                          [opt.displayName.toLowerCase()]:
                            v.label.toLowerCase(),
                        }
                      })
                    }}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }
)

export default ProductView
