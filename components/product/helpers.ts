import type { Product, ProductOption } from '@framework/types/product'
import { Dispatch, SetStateAction } from 'react'
import { ProductVariant } from '@framework/types/product'

export type SelectedOptions = Record<string, string | null>

export function getVariant(
  product: Product,
  opts: SelectedOptions
): ProductVariant | undefined {
  return product.variants.find((variant: ProductVariant) =>
    variantMatchesAllOptions(variant, opts)
  )
}

function variantMatchesAllOptions(
  variant: ProductVariant,
  opts: SelectedOptions
): boolean {
  return Object.entries(opts).every(([key, value]) =>
    variant.options.find((variantOption) =>
      variantOptionMatchesSelectedOption(variantOption, key, value)
    )
  )
}

export function variantOptionMatchesSelectedOption(
  variantOption: ProductOption,
  key: string,
  value: string | null
) {
  return (
    variantOption.__typename === 'MultipleChoiceOption' &&
    variantOption.displayName.toLowerCase() === key.toLowerCase() &&
    variantOption.values.find((v) => v.label.toLowerCase() === value)
  )
}

export function selectDefaultOptionFromProduct(
  product: Product,
  updater: Dispatch<SetStateAction<SelectedOptions>>
) {
  // Selects the default option
  product.variants[0].options?.forEach((v) => {
    updater((choices) => ({
      ...choices,
      [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
    }))
  })
}
