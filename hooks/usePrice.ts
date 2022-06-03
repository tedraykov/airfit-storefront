import { CatalogProduct, CatalogProductVariant } from '@graphql/schema'

type ProductDiscount = {
  displayDiscount?: string
  discount?: number
  minDiscount: number
  maxDiscount: number
  displayMaxDiscount?: string
}

function getDiscount(
  productOrVariant: CatalogProduct | CatalogProductVariant,
  locale: string
): ProductDiscount {
  const discountFormatter = new Intl.NumberFormat(locale, { style: 'percent' })

  // If is product with variants
  const product = productOrVariant as CatalogProduct
  if (product?.variants) {
    let productDiscount = getDiscount(product.variants[0], locale)
    for (let i = 1; i < product.variants.length; i++) {
      const variantDiscount = getDiscount(product.variants[i], locale)
      productDiscount = {
        minDiscount: Math.min(
          variantDiscount.minDiscount,
          productDiscount.minDiscount
        ),
        maxDiscount: Math.max(
          variantDiscount.maxDiscount,
          productDiscount.maxDiscount
        ),
      }
    }
    productDiscount.displayMaxDiscount = discountFormatter.format(
      productDiscount.maxDiscount
    )
    return productDiscount
  }

  // If is variant with options
  const variant = productOrVariant as CatalogProductVariant
  if (variant?.options) {
    let variantDiscount = getDiscount(variant.options[0], locale)
    for (let i = 1; i < variant.options.length; i++) {
      const optionDiscount = getDiscount(variant.options[i], locale)
      variantDiscount = {
        minDiscount: Math.min(
          optionDiscount.minDiscount,
          variantDiscount.minDiscount
        ),
        maxDiscount: Math.max(
          optionDiscount.maxDiscount,
          variantDiscount.maxDiscount
        ),
      }
    }
    variantDiscount.displayMaxDiscount = discountFormatter.format(
      variantDiscount.maxDiscount
    )
    return variantDiscount
  }

  // Base case if is option or variant without options
  const amount = product?.pricing[0]?.price
  const baseAmount = product?.pricing[0]?.compareAtPrice?.amount
  const discount = (baseAmount - amount) / baseAmount
  const formattedDiscount = discountFormatter.format(discount)
  return {
    displayDiscount: formattedDiscount,
    discount: discount,
    minDiscount: discount,
    maxDiscount: discount,
    displayMaxDiscount: formattedDiscount,
  }
}

type PriceHookOptions = {
  product: CatalogProduct | CatalogProductVariant
  locale?: string
}

export default function usePrice({
  product,
  locale = 'bg-BG',
}: PriceHookOptions) {
  const price = product?.pricing[0]?.displayPrice
  const compareAtPrice = product?.pricing[0]?.compareAtPrice?.displayAmount

  return {
    price,
    compareAtPrice,
    discount: getDiscount(product, locale),
  }
}
