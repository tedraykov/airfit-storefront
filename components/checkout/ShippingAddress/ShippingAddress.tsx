import React, { FC } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Radio,
} from '@material-ui/core'
import { Input } from '@components/ui'
import s from './ShippingAddress.module.scss'
import cn from 'classnames'

interface ShippingAddressProps {
  // deliveryType: DeliveryType
  className?: any
}

enum DeliveryType {
  COURIER_OFFICE,
  CLIENT_ADDRESS,
}

const deliveryTypeTitles = {
  [DeliveryType.CLIENT_ADDRESS]: 'Доставка до адрес на клиент',
  [DeliveryType.COURIER_OFFICE]: 'Доставка до офис на куриер',
}

export const ShippingAddress: FC<ShippingAddressProps> = ({ className }) => {
  const [deliveryType, setDeliveryType] = React.useState<DeliveryType>(
    DeliveryType.CLIENT_ADDRESS
  )
  const [courier, setCourier] = React.useState('speedy')

  const handleChangeCourier = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCourier(event.target.value as string)
  }

  const handleChangeDeliveryType =
    (selectedDeliveryType: DeliveryType) =>
    (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      console.log('Changing delivery type')
      isExpanded ? setDeliveryType(selectedDeliveryType) : null
    }

  return (
    <div className={cn(s.root)}>
      <Accordion
        className={s.deliveryTypeAccordion}
        elevation={0}
        square={true}
        expanded={deliveryType === DeliveryType.CLIENT_ADDRESS}
        onChange={handleChangeDeliveryType(DeliveryType.CLIENT_ADDRESS)}
      >
        <AccordionSummary>
          <Radio
            color={'primary'}
            aria-label={'client-delivery'}
            checked={deliveryType === DeliveryType.CLIENT_ADDRESS}
          />
          <span className="self-center">
            {deliveryTypeTitles[DeliveryType.CLIENT_ADDRESS]}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col space-y-3">
            <Input type="text" placeholder="Адрес" />
            <div className="flex flex-row space-x-3">
              <div className="flex-grow">
                <Input type="text" placeholder="Град / Село" />
              </div>
              <div className="flex-grow">
                <Input type="text" placeholder="Пощенски код" />
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className={s.deliveryTypeAccordion}
        elevation={0}
        square={true}
        expanded={deliveryType === DeliveryType.COURIER_OFFICE}
        onChange={handleChangeDeliveryType(DeliveryType.COURIER_OFFICE)}
      >
        <AccordionSummary>
          <Radio
            color={'primary'}
            checked={deliveryType === DeliveryType.COURIER_OFFICE}
          />
          <span className="self-center">
            {deliveryTypeTitles[DeliveryType.COURIER_OFFICE]}
          </span>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col space-y-3">
          <div className="flex-grow">
            <Input type="text" placeholder="Адрес на офис" />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
