import {
  PaymentMethod as OpenCommercePaymentMethod,
  PaymentMethodData,
} from '@graphql/schema'
import { ForwardRefExoticComponent } from 'react'
import { Submittable } from '@hooks/useStepper'

export interface PaymentMethod extends OpenCommercePaymentMethod {
  icon: string
  details: string
  PaymentFormComponent?: ForwardRefExoticComponent<
    Submittable & PaymentMethodData
  >
}

const paymentMethods: PaymentMethod[] = [
  {
    icon: '💵',
    canRefund: true,
    displayName: 'Наложен платеж',
    data: null,
    isEnabled: true,
    name: 'iou_example',
    details: 'Плащане при получаване от куриер',
    pluginName: 'payments-example',
  },
  {
    icon: '🏦',
    canRefund: true,
    displayName: 'Онлайн банкиране (очаквайте скоро)',
    data: null,
    isEnabled: false,
    name: 'paysera_payment_initiation_service',
    details:
      'Сигурно плащане през вашето онлайн банкиране. Поддъражни са всички български банки',
    pluginName: 'payments-paysera',
  },
  {
    icon: '💳',
    canRefund: true,
    displayName: 'Банкова карта (очаквайте скоро)',
    data: null,
    isEnabled: false,
    name: 'paysera_card',
    details: 'Сигурно плащане чрез вашата Mastercard, Maestro или Visa карта',
    pluginName: 'payments-paysera',
  },
]

export default paymentMethods
