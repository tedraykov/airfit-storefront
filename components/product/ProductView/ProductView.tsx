import React, { FC, memo, useState } from 'react'
import s from './ProductView.module.scss'
import { Swatch } from '@components/product'
import { Button, Text } from '@components/ui'
import { track } from '@lib/facebookPixel'
import useUI from '@hooks/useUI'
import useCart from '@hooks/cart/useCart'
import { CatalogProduct, CatalogProductVariant } from '@graphql/schema'
import usePrice from '@hooks/usePrice'
import ProductGallery from '@components/product/ProductGallery'
import ProductSeo from '@components/product/ProductSeo'

interface Props {
  children?: any
  product: CatalogProduct
  className?: string
}

function getInitialProductVariant(product: CatalogProduct) {
  return product!.variants[0]
}

function getInitialProductVariantOption(variant: CatalogProductVariant | null) {
  return (variant?.options && variant?.options[0]) || null
}

const ProductView: FC<Props> = ({ product }) => {
  const { openSidebar } = useUI()
  const { addItem } = useCart()
  const [variant, setVariant] = useState<CatalogProductVariant>(
    getInitialProductVariant(product)
  )
  const [option, setOption] = useState<CatalogProductVariant | null>(
    getInitialProductVariantOption(variant)
  )
  const [loading, setLoading] = useState(false)

  const { price, compareAtPrice, discount } = usePrice({
    product: option ? option : variant,
  })

  const handleChangeVariant = (newVariant: CatalogProductVariant) => {
    if (newVariant._id !== variant._id) {
      setVariant(newVariant)
      setOption(getInitialProductVariantOption(newVariant))
    }
  }

  const handleChangeOption = (newOption: CatalogProductVariant) => {
    if (newOption._id !== option?._id) {
      setOption(newOption)
    }
  }

  const addToCart = async () => {
    setLoading(true)

    await addItem({
      productConfiguration: {
        productId: product.productId,
        productVariantId: option ? option.variantId : variant.variantId,
      },
      quantity: 1,
      price: {
        amount: option ? option.pricing[0].price : variant.pricing[0].price,
        currencyCode: product.pricing[0].currency.code ?? 'BGN',
      },
      metafields: [],
    }).then(() => {
      openSidebar()
      track('AddToCart', {
        contents: [
          {
            id: option ? option.pricing[0].price : variant.pricing[0].price,
            quantity: 1,
          },
        ],
        currency: product?.pricing[0].currency.code,
      })
    })

    setLoading(false)
  }

  return (
    <>
      <ProductSeo product={product} />
      <div
        className={`
          relative grid items-start grid-cols-1 overflow-x-hidden
          lg:grid-cols-12 lg:gap-8 lg:p-4
        `}
      >
        <div
          className={`w-full md:px-4 lg:col-span-6 lg:max-w-[640px] lg:justify-self-end`}
        >
          <ProductGallery product={product} />
        </div>
        <div
          className={`
            flex flex-col col-span-1
            mx-auto max-w-2xl w-full
            p-6
            lg:col-span-6 lg:justify-between
            xl:max-w-8xl
          `}
        >
          <h1>
            <span
              className={`
              font-bold
              tracking-wide text-2xl box-decoration-clone`}
            >
              {product.title}
            </span>
          </h1>
          <div className="flex pt-6">
            {compareAtPrice && (
              <span className="text-xl line-through text-accents-8 pr-2">
                {compareAtPrice}
              </span>
            )}
            <div className="font-bold inline-block tracking-wide text-xl">
              {price}
            </div>
          </div>
          {discount.discount ? (
            <span className="text-red text-lg pb-2">
              {discount.displayDiscount} намаление
            </span>
          ) : null}
          <section>
            <ProductOptions
              variants={product.variants}
              options={variant.options}
              selectedVariant={variant}
              selectedOption={option}
              onChangeVariant={handleChangeVariant}
              onChangeOption={handleChangeOption}
            />
            <div className="pb-14 break-words w-full max-w-2xl text-left">
              <Text html={product.description} />
            </div>
          </section>
          <div>
            <Button
              aria-label="Добави в количката"
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
    </>
  )
}

interface ProductOptionsProps {
  variants: CatalogProductVariant[]
  options: CatalogProductVariant[]
  selectedVariant: CatalogProductVariant
  selectedOption: CatalogProductVariant | null
  onChangeVariant: (variant: CatalogProductVariant) => void
  onChangeOption: (option: CatalogProductVariant) => void
}

const ProductOptions: FC<ProductOptionsProps> = memo(
  ({
    variants,
    options,
    selectedVariant,
    selectedOption,
    onChangeVariant,
    onChangeOption,
  }) => {
    return (
      <div>
        <h2 className="uppercase font-medium text-sm tracking-wide leading-loose">
          {selectedVariant.attributeLabel}
        </h2>
        <div className="flex flex-row flex-wrap sm:flex-nowrap">
          {variants.map((variant) => (
            <Swatch
              key={variant._id}
              className="mb-4"
              active={variant._id === selectedVariant._id}
              label={variant.optionTitle}
              onClick={() => onChangeVariant(variant)}
            />
          ))}
        </div>
        {selectedOption && (
          <>
            <h2 className="uppercase font-medium text-sm tracking-wide leading-loose">
              {selectedOption.attributeLabel}
            </h2>
            <div className="flex flex-row flex-wrap sm:flex-nowrap">
              {options.map((option) => (
                <Swatch
                  key={option._id}
                  className="mb-4"
                  active={option._id === selectedOption._id}
                  label={option.optionTitle}
                  onClick={() => onChangeOption(option)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }
)

ProductOptions.displayName = 'ProductOptions'

export default ProductView
