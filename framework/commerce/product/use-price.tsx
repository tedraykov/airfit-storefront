import { useMemo } from 'react'
import { useCommerce } from '..'

export function formatPrice({
  amount,
  currencyCode,
  locale,
}: {
  amount: number
  currencyCode: string
  locale: string
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  })

  return formatCurrency.format(amount)
}

export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale,
}: {
  baseAmount: number
  amount: number
  currencyCode: string
  locale: string
}) {
  const hasDiscount = baseAmount > amount
  const formatDiscount = new Intl.NumberFormat(locale, { style: 'percent' })
  const discount = hasDiscount
    ? formatDiscount.format((baseAmount - amount) / baseAmount)
    : null

  const price = formatPrice({ amount, currencyCode, locale })
  const basePrice = hasDiscount
    ? formatPrice({ amount: baseAmount, currencyCode, locale })
    : null

  return { price, basePrice, discount }
}

function formatRange({
  amountRange,
  currencyCode,
  locale,
}: {
  amountRange: { min: number; max: number }
  currencyCode: string
  locale: string
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  })

  return `${formatCurrency.format(amountRange.min)} - ${formatCurrency.format(
    amountRange.max
  )}`
}

export default function usePrice(
  data?: {
    amount?: number
    amountRange?: { min: number; max: number }
    baseAmount?: number
    currencyCode: string
  } | null
) {
  const { baseAmount, currencyCode, amountRange } = data ?? {}
  let { amount } = data ?? {}
  const { locale } = useCommerce()
  const value = useMemo(() => {
    if ((!amountRange && !amount) || !currencyCode) return ''

    if (!!amountRange) {
      if (amountRange.min !== amountRange.max) {
        return formatRange({ amountRange, currencyCode, locale })
      }
      amount = amountRange.min
    }

    if (typeof amount !== 'number') return ''

    return baseAmount
      ? formatVariantPrice({ amount, baseAmount, currencyCode, locale })
      : formatPrice({ amount, currencyCode, locale })
  }, [amount, amountRange, baseAmount, currencyCode])

  return typeof value === 'string' ? { price: value } : value
}
