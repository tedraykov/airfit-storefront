import { FC } from 'react'
import { Bag, Check, Cross } from '@components/icons'
import { Button, Text } from '@components/ui'
import { Cart, LineItem } from '@framework/types/cart'
import { CartItem } from '@components/cart'
import usePrice from '@commerce/product/use-price'
import Close from '@material-ui/icons/Close'

interface CartViewProps {
  isLoading: boolean
  isEmpty: boolean
  error?: any
  success?: any
  checkoutButton?: boolean
  data: Cart | null | undefined
  onClose?: () => void | undefined
}

export const CartView: FC<CartViewProps> = ({
  isLoading,
  isEmpty,
  error = null,
  success = null,
  checkoutButton = true,
  data,
  onClose = undefined,
}) => {
  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )

  return (
    <div className="grid lg:grid-cols-12 w-full max-w-7xl mx-auto">
      <div className="lg:col-span-8">
        {isLoading || isEmpty ? (
          <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
            <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              Вашата количка е празна
            </h2>
            <p className="text-accents-6 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        ) : error ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Cross width={24} height={24} />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              Не можахме да обработим поръчката Ви. Моля проверете информацията
              за вашата платежна карта и опитайте отново.
            </h2>
          </div>
        ) : success ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Check />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              Благодарим за вашата поръчка!
            </h2>
          </div>
        ) : (
          <div className="px-4 sm:px-6 flex-1">
            <div className="flex">
              <Text className="flex-1" variant="pageHeading">
                Моята количка
              </Text>
              {!!onClose && <Close onClick={onClose} className="mt-1.5" />}
            </div>
            <Text variant="sectionHeading">Преглед на поръчка</Text>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-2 border-b border-accents-2">
              {data!.lineItems.map((item: LineItem) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data?.currency.code!}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="lg:col-span-4">
        <div className="flex-shrink-0 px-4 pt-24 sm:px-6">
          <div className="border-t border-accents-2">
            <ul className="py-3">
              <li className="flex justify-between py-1">
                <span>Междинна сума</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Такси</span>
                <span>Калкулирани при финализиране</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Доставка</span>
                <span className="font-bold tracking-wide">БЕЗПЛАТНА</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accents-2 py-3 font-bold mb-10">
              <span>Общо</span>
              <span>{total}</span>
            </div>
          </div>
          {checkoutButton && (
            <div className="flex flex-row justify-end">
              <div className="w-full lg:w-72">
                {isEmpty ? (
                  <Button href="/" Component="a" width="100%">
                    Продължи с пазаруването
                  </Button>
                ) : (
                  <Button href="/checkout" Component="a" width="100%">
                    Завършване на поръчката
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
