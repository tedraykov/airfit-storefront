import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import React, { FC, useEffect, useState } from 'react'
import s from './ProductView.module.css'
import { Swatch, ProductSlider } from '@components/product'
import { Button, Container, Text, useUI } from '@components/ui'
import type { Product } from '@commerce/types'
import usePrice from '@framework/product/use-price'
import { useAddItem } from '@framework/cart'
import { getVariant, SelectedOptions } from '../helpers'
import WishlistButton from '@components/wishlist/WishlistButton'
import { useRouter } from 'next/router'

interface Props {
  children?: any
  product: Product
  className?: string
}

const ProductView: FC<Props> = ({ product }) => {
  const addItem = useAddItem()
  const router = useRouter()

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({})

  useEffect(() => {
    const optionsFromUrl = getOptionsFromQueryParams()
    if (
      !!Object.keys(optionsFromUrl).length &&
      !!getVariant(product, optionsFromUrl as SelectedOptions)
    ) {
      setChoices(() => optionsFromUrl as SelectedOptions)
      return
    }

    product.variants[0].options?.forEach((v) => {
      setChoices((choices) => ({
        ...choices,
        [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
      }))
    })
  }, [])

  function getOptionsFromQueryParams(): {
    [name: string]: string | string[] | undefined
  } {
    const queryParams = new URLSearchParams(
      router.asPath.substring(router.asPath.indexOf('?') + 1)
    )

    let optionEntries: [string, any][] = []
    queryParams.forEach((value, key) => optionEntries.push([key, value]))

    optionEntries = optionEntries.filter(([key]) =>
      product?.options.find(
        (opt) => opt.displayName.toLowerCase() === key.toLowerCase()
      )
    )
    return Object.fromEntries(optionEntries)
  }

  useEffect(() => {
    router.push({ query: { ...choices } }, undefined, { shallow: true }).then()
  }, [choices])

  const variant = getVariant(product, choices)

  const addToCart = async () => {
    setLoading(true)
    try {
      const selectedVariant = variant ? variant : product.variants[0]

      console.log('selected variant', selectedVariant)

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
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {price}
              {` `}
              {product.price?.currencyCode}
            </div>
          </div>

          <div className={s.sliderContainer}>
            <ProductSlider key={product.id} images={product.images}/>
          </div>
        </div>
        <div className={s.sidebar}>
          <section>
            {product.options?.map((opt) => (
              <div className="pb-4" key={opt.displayName}>
                <h2 className="uppercase font-medium">{opt.displayName}</h2>
                <div className="flex flex-row py-4">
                  {opt.values.map((v, i: number) => {
                    const active = (choices as any)[
                      opt.displayName.toLowerCase()
                    ]

                    return (
                      <Swatch
                        key={`${opt.id}-${i}`}
                        active={v.label.toLowerCase() === active}
                        variant={opt.displayName}
                        color={v.hexColors ? v.hexColors[0] : ''}
                        label={v.label}
                        onClick={() => {
                          setChoices((choices) => {
                            return {
                              ...choices,
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

            <div className="pb-14 break-words w-full max-w-xl">
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
              Add to Cart
            </Button>
          </div>
        </div>
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <WishlistButton
            className={s.wishlistButton}
            productId={product.id}
            variant={product.variants[0]! as any}
          />
        )}
      </div>
    </Container>
  )
}

export default ProductView
