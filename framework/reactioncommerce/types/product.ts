import * as Core from '@commerce/types/product'

export type Product = Core.Product & {
  vendor: string
  images: ProductImage[]
  variants: ProductVariant[]
}

export type ProductImage = Core.ProductImage & {
  large: string
  medium: string
  small: string
  thumbnail: string
}

export type ProductOption = Core.ProductOption

export type ProductVariant = Core.ProductVariant & {
  price: number
}

export type SearchProductsBody = Core.SearchProductsBody & {
  shopId?: string
}

export type ProductTypes = Core.ProductTypes & {
  product: Product
  searchBody: SearchProductsBody
}

export type SearchProductsHook = Core.SearchProductsHook<ProductTypes>
