import * as Core from '@commerce/types/product'

export type Product = Core.Product & {
  vendor: string
  images: ProductImage[]
  variants: ProductVariant[]
  price: ProductPrice
  tags: string[]
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
  listPrice: number
}

export type ProductPrice = Core.ProductPrice & {
  minPrice: number
  maxPrice: number
  maxDiscount: string
}

export type SearchProductsBody = Core.SearchProductsBody & {
  shopId?: string
}

export type ProductTypes = Core.ProductTypes & {
  product: Product
  searchBody: SearchProductsBody
}

export type SearchProductsHook = Core.SearchProductsHook<ProductTypes>

export type ProductsSchema = Core.ProductsSchema<ProductTypes>
