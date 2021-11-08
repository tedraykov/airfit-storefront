import { ProductOption, ProductImage } from '@framework/types/product'

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
  TagEdge,
  FulfillmentGroup as ReactionFulfillmentGroup,
  FulfillmentOption as ReactionFulfillmentOption,
  Address,
} from '../schema'

import { IFeaturedProduct, IHero, IPage } from '@lib/contentful/schema'
import {
  Cart,
  FulfillmentGroup,
  FulfillmentOption,
  LineItem,
  ShippingAddress,
} from '@framework/types/cart'
import { Product, ProductVariant } from '@framework/types/product'
import { ProductOptionValues } from '@commerce/types/product'
import { Category } from '@commerce/types/site'
import { FeaturedProduct, Hero, Page } from '@framework/types/page'

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
    tags,
  } = <CatalogProduct>product
  return {
    id: productId ?? _id,
    name: title ?? '',
    descriptionHtml: description ?? '',
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
      minPrice: pricing[0]?.minPrice ?? 0,
      maxPrice: pricing[0]?.maxPrice ?? 0,
    },
    variants: !!variants
      ? normalizeProductVariants(<CatalogProductVariant[]>variants)
      : [],
    options: !!variants
      ? groupProductOptionsByAttributeLabel(<CatalogProductVariant[]>variants)
      : [],
    tags: tags?.edges?.map((tag) => <string>tag!.node!.slug) ?? [],
  }
}

export function normalizeCart(cart: ReactionCart): Cart | null {
  if (!cart) {
    return null
  }

  return {
    id: cart._id,
    customerId: '',
    email: cart?.email ?? undefined,
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
    shopId: cart.shop._id,
    fulfillmentGroups:
      cart.checkout?.fulfillmentGroups.map((fg) =>
        normalizeFulfillmentGroup(<ReactionFulfillmentGroup>fg)
      ) ?? [],
  }
}

function normalizeFulfillmentGroup(
  fulfillmentGroup: ReactionFulfillmentGroup
): FulfillmentGroup {
  return <FulfillmentGroup>{
    id: fulfillmentGroup._id,
    availableFulfillmentOptions:
      fulfillmentGroup?.availableFulfillmentOptions.map((fo) =>
        normalizeFulfillmentOption(<ReactionFulfillmentOption>fo)
      ) ?? [],
    selectedFulfillmentOption: fulfillmentGroup.selectedFulfillmentOption
      ? normalizeFulfillmentOption(fulfillmentGroup.selectedFulfillmentOption)
      : undefined,
    ...(fulfillmentGroup.data?.shippingAddress && {
      data: {
        shippingAddress: normalizeAddress(
          fulfillmentGroup.data.shippingAddress
        ),
      },
    }),
    shopId: fulfillmentGroup.shop._id,
    type: fulfillmentGroup.type,
  }
}

function normalizeFulfillmentOption(
  fo: ReactionFulfillmentOption
): FulfillmentOption {
  return <FulfillmentOption>{
    fulfillmentMethod: {
      id: fo.fulfillmentMethod?._id ?? '',
      name: fo.fulfillmentMethod?.displayName ?? '',
    },
    ...(!!fo.handlingPrice && {
      handlingPrice: {
        amount: fo.handlingPrice.amount,
        displayAmount: fo.handlingPrice.displayAmount,
      },
    }),
    price: {
      amount: fo.price.amount,
      displayAmount: fo.price.displayAmount,
    },
  }
}

function normalizeAddress(address: Address): ShippingAddress {
  return <ShippingAddress>{
    address: address.address1,
    city: address.city,
    country: address.country,
    firstName: address.firstName,
    fullName: address.fullName,
    sureName: address.lastName,
    phone: address.phone,
    postal: address.postal,
    region: address.region,
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
    addedAt,
    productSlug,
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
    addedAt,
    path: productSlug ?? '',
    discounts: [],
    options: [
      {
        name: '',
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

export function normalizeContentfulHero(hero: IHero): Hero {
  return <Hero>{
    headline: hero.fields.headline,
    description: hero.fields.description,
  }
}

export function normalizeContentfulFeaturedProduct(
  featuredProducts: IFeaturedProduct[]
): FeaturedProduct[] {
  return featuredProducts.map((featuredProduct) => {
    return <FeaturedProduct>{
      title: featuredProduct.fields.title,
      subTitle: featuredProduct.fields.subTitle ?? '',
      description: featuredProduct.fields.shortDecription,
      productImage: featuredProduct.fields.productImage.fields.file.url,
      buttonText: featuredProduct.fields.buttonText ?? '',
      productUrl: featuredProduct.fields.productUrl,
      backgroundColor: featuredProduct.fields.backgroundColor,
      useReversedText: featuredProduct.fields.useReversedText,
    }
  })
}

export function normalizeCategory(tag: TagEdge): Category {
  return <Category>{
    id: tag.node?._id,
    name: tag.node?.displayTitle ?? tag.node?.name ?? '',
    slug: tag.node?.slug ?? '',
    path: '/' + tag.node?.slug,
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
