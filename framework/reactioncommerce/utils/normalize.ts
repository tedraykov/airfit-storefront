import {
  ProductVariant,
  ProductOption,
  ProductOptionValues,
  ProductImage,
} from '@commerce/types/product'

import { Page, Product } from '../types'

import { Customer } from '@commerce/types/customer'

import {
  Account,
  Cart as ReactionCart,
  CatalogProductVariant,
  CartItemEdge,
  CatalogItemProduct,
  CatalogProduct,
  ImageInfo,
  CartItem,
  Shop,
} from '../schema'

import type { Cart, LineItem } from '../types'
import { IPage } from '@lib/contentful/schema'
import { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ReactNode } from 'react'

const normalizeProductImages = (
  images: ImageInfo[],
  name: string
): ProductImage[] =>
  images.map((image) => ({
    url: image?.URLs?.original || '',
    medium: image?.URLs?.medium || '',
    small: image?.URLs?.small || '',
    thumbnail: image?.URLs?.thumbnail || '',
    large: image?.URLs?.large || '',
    alt: name,
  }))

const normalizeProductOption = (variant: CatalogProductVariant) => {
  const option = <ProductOption>{
    __typename: 'MultipleChoiceOption',
    id: variant._id,
    displayName: variant.attributeLabel,
    values: variant.optionTitle ? [{ label: variant.optionTitle }] : [],
  }
  option.values = option.values.map((value) =>
    colorizeProductOptionValue(value, option.displayName)
  )

  return option
}

function colorizeProductOptionValue(
  value: ProductOptionValues,
  displayName: string
): ProductOptionValues {
  if (displayName.toLowerCase() === 'color') {
    value.hexColors = [value.label]
  }
  return value
}

const normalizeProductVariants = (
  variants: Array<CatalogProductVariant>
): ProductVariant[] => {
  return variants.reduce(
    (productVariants: ProductVariant[], variant: CatalogProductVariant) => {
      if (variantHasOptions(variant)) {
        productVariants.push(...flatVariantOptions(variant))
        return productVariants
      }

      const { sku, title, pricing = [], variantId } = variant ?? {}
      const variantPrice = pricing[0]?.price ?? pricing[0]?.minPrice ?? 0

      productVariants.push(<ProductVariant>{
        id: variantId ?? '',
        name: title,
        sku: sku ?? variantId,
        price: variantPrice,
        listPrice: pricing[0]?.compareAtPrice?.amount ?? variantPrice,
        requiresShipping: true,
        options: [normalizeProductOption(variant)],
      })

      return productVariants
    },
    []
  )
}

function groupProductOptionsByAttributeLabel(
  variants: CatalogProductVariant[]
): ProductOption[] {
  return variants.reduce(
    (
      groupedOptions: ProductOption[],
      currentVariant: CatalogProductVariant
    ) => {
      groupedOptions = mergeVariantOptionsWithExistingOptions(
        groupedOptions,
        currentVariant
      )

      if (variantHasOptions(currentVariant)) {
        ;(<CatalogProductVariant[]>currentVariant.options).forEach(
          (variantOption) => {
            groupedOptions = mergeVariantOptionsWithExistingOptions(
              groupedOptions,
              variantOption
            )
          }
        )
      }

      return groupedOptions
    },
    []
  )
}

function mergeVariantOptionsWithExistingOptions(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant
): ProductOption[] {
  const matchingOptionIndex = findCurrentVariantOptionsInGroupedOptions(
    groupedOptions,
    currentVariant
  )

  return matchingOptionIndex !== -1
    ? mergeWithExistingOptions(
        groupedOptions,
        currentVariant,
        matchingOptionIndex
      )
    : addNewProductOption(groupedOptions, currentVariant)
}

function findCurrentVariantOptionsInGroupedOptions(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant
): number {
  return groupedOptions.findIndex(
    (option) =>
      option.displayName.toLowerCase() ===
      currentVariant.attributeLabel.toLowerCase()
  )
}

function mergeWithExistingOptions(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant,
  matchingOptionIndex: number
) {
  const currentVariantOption = normalizeProductOption(currentVariant)
  groupedOptions[matchingOptionIndex].values = [
    ...groupedOptions[matchingOptionIndex].values,
    ...currentVariantOption.values,
  ]

  return groupedOptions
}

function addNewProductOption(
  groupedOptions: ProductOption[],
  currentVariant: CatalogProductVariant
) {
  return [...groupedOptions, normalizeProductOption(currentVariant)]
}

export function normalizeProduct(productNode: CatalogItemProduct): Product {
  const product = productNode.product
  if (!product) {
    return <Product>{}
  }

  const {
    _id,
    productId,
    title,
    description,
    slug,
    sku,
    media,
    pricing,
    variants,
  } = <CatalogProduct>product

  return {
    id: productId ?? _id,
    name: title ?? '',
    description: description ?? '',
    slug: slug?.replace(/^\/+|\/+$/g, '') ?? '',
    path: slug ?? '',
    sku: sku ?? '',
    images: media?.length
      ? normalizeProductImages(<ImageInfo[]>media, title ?? '')
      : [],
    vendor: product.vendor ?? '',
    price: {
      value: pricing[0]?.minPrice ?? 0,
      currencyCode: pricing[0]?.currency.code,
    },
    variants: !!variants
      ? normalizeProductVariants(<CatalogProductVariant[]>variants)
      : [],
    options: !!variants
      ? groupProductOptionsByAttributeLabel(<CatalogProductVariant[]>variants)
      : [],
  }
}

export function normalizeCart(cart: ReactionCart): Cart | null {
  if (!cart) {
    return null
  }

  return {
    id: cart._id,
    customerId: '',
    email: '',
    createdAt: cart.createdAt,
    currency: {
      code: cart.checkout?.summary?.total?.currency.code ?? '',
    },
    taxesIncluded: false,
    lineItems:
      cart.items?.edges?.map((cartItem) =>
        normalizeLineItem(<CartItemEdge>cartItem)
      ) ?? [],
    lineItemsSubtotalPrice: +(cart.checkout?.summary?.itemTotal?.amount ?? 0),
    subtotalPrice: +(cart.checkout?.summary?.itemTotal?.amount ?? 0),
    totalPrice: cart.checkout?.summary?.total?.amount ?? 0,
    discounts: [],
  }
}

function normalizeLineItem(cartItemEdge: CartItemEdge): LineItem {
  const cartItem = cartItemEdge.node

  if (!cartItem) {
    return <LineItem>{}
  }

  const {
    _id,
    compareAtPrice,
    imageURLs,
    title,
    productConfiguration,
    priceWhenAdded,
    optionTitle,
    variantTitle,
    quantity,
  } = <CartItem>cartItem

  return {
    id: _id,
    variantId: String(productConfiguration?.productVariantId),
    productId: String(productConfiguration?.productId),
    name: `${title}`,
    quantity,
    variant: {
      id: String(productConfiguration?.productVariantId),
      sku: String(productConfiguration?.productVariantId),
      name: String(optionTitle || variantTitle),
      image: {
        url: imageURLs?.thumbnail ?? '/product-img-placeholder.svg',
      },
      requiresShipping: true,
      price: priceWhenAdded?.amount,
      listPrice: compareAtPrice?.amount ?? 0,
    },
    path: '',
    discounts: [],
    options: [
      {
        value: String(optionTitle || variantTitle),
      },
    ],
  }
}

export function normalizeCustomer(viewer: Account): Customer | null {
  if (!viewer) {
    return null
  }

  return <Customer>{
    firstName: viewer.firstName ?? '',
    lastName: viewer.lastName ?? '',
    email: viewer.primaryEmailAddress,
  }
}

export function normalizePages(shop: Shop): Page[] {
  return (
    shop?.defaultNavigationTree?.items?.map((item) => {
      if (!item) {
        return <Page>{}
      }

      const navigationItem = item.navigationItem
      return <Page>{
        id: navigationItem._id,
        url: navigationItem.data?.url ?? '/',
        name: navigationItem.data?.contentForLanguage ?? 'en',
        body: '',
      }
    }) ?? []
  )
}

export function normalizeContentfulPages(pages: IPage[]): Page[] {
  return pages.map((page) => {
    return <Page>{
      id: page.sys.id,
      name: page.fields.seo?.fields.displayTitle,
      // Relative URL on the storefront for this page.
      url: `/${page.fields.slug}`,
    }
  })
}

export function normalizeContentfulPage(page: IPage): Page {
  return <Page>{
    id: page.sys.id,
    name: page.fields.seo?.fields.displayTitle,
    // Relative URL on the storefront for this page.
    url: `/${page.fields.slug}`,
    // HTML or variable that populates this page’s `<body>` element, in default/desktop view. Required in POST if page type is `raw`.
    body: page.fields.body,
  }
}

function flatVariantOptions(variant: CatalogProductVariant): ProductVariant[] {
  const variantOptions = <CatalogProductVariant[]>variant.options

  return normalizeProductVariants(variantOptions).map((variantOption) => {
    variantOption.options.push(normalizeProductOption(variant))
    return variantOption
  })
}

function variantHasOptions(variant: CatalogProductVariant) {
  return !!variant.options && variant.options.length != 0
}
