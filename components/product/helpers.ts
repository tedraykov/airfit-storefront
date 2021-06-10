import type { Product, ProductVariant } from '@commerce/types'
import { ProductOption } from '@commerce/types'

export type SelectedOptions = Record<string, string | null>

export function getVariant(
  product: Product,
  opts: SelectedOptions
): ProductVariant | undefined {
  return product.variants.find((variant) =>
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
