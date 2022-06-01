import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { CheckoutStepComponentProps, Submittable } from '@hooks/useStepper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import Radio from '@mui/material/Radio'
import AccordionDetails from '@mui/material/AccordionDetails'
import ShippingAddressFormClient from '@components/checkout/ShippingAddressFormClient'
import CourierOfficeForm from '../CourierOfficeForm'
import { Address } from '@graphql/schema'

enum DeliveryType {
  COURIER_OFFICE,
  CLIENT_ADDRESS,
}

const deliveryTypeTitles = {
  [DeliveryType.CLIENT_ADDRESS]: 'Доставка до адрес на клиент',
  [DeliveryType.COURIER_OFFICE]: 'Доставка до офис на куриер',
}

interface ShippingAddressStepProps extends CheckoutStepComponentProps {
  shippingAddress?: Address
  email?: string
}

const ShippingAddressStep = forwardRef<Submittable, ShippingAddressStepProps>(
  ({ shippingAddress, email, onSubmit }, ref) => {
    const formRefs = useRef<{ [key: string]: Submittable }>({})
    const [deliveryType, setDeliveryType] = useState<DeliveryType>(
      DeliveryType.COURIER_OFFICE
    )

    useImperativeHandle(ref, () => ({
      submit() {
        formRefs.current[deliveryType.toString()]?.submit()
      },
    }))

    const handleChangeDeliveryType =
      (selectedDeliveryType: DeliveryType) =>
      (event: React.ChangeEvent<{}>, isExpanded: boolean) =>
        isExpanded ? setDeliveryType(selectedDeliveryType) : null

    return (
      <div>
        <Accordion
          className="shadow-sm"
          expanded={deliveryType === DeliveryType.COURIER_OFFICE}
          onChange={handleChangeDeliveryType(DeliveryType.COURIER_OFFICE)}
        >
          <AccordionSummary>
            <Radio
              color={'primary'}
              disabled
              checked={deliveryType === DeliveryType.COURIER_OFFICE}
            />
            <span className="self-center">
              {deliveryTypeTitles[DeliveryType.COURIER_OFFICE]}
            </span>
          </AccordionSummary>
          <AccordionDetails>
            <CourierOfficeForm
              onSubmit={onSubmit}
              shippingAddress={shippingAddress}
              email={email}
              ref={(el: Submittable) =>
                (formRefs.current[DeliveryType.COURIER_OFFICE] = el)
              }
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          className="shadow-sm"
          disabled
          expanded={deliveryType === DeliveryType.CLIENT_ADDRESS}
          onChange={handleChangeDeliveryType(DeliveryType.CLIENT_ADDRESS)}
        >
          <AccordionSummary>
            <Radio
              color={'primary'}
              disabled
              checked={deliveryType === DeliveryType.CLIENT_ADDRESS}
            />
            <span className="self-center">
              {deliveryTypeTitles[DeliveryType.CLIENT_ADDRESS]}
            </span>
          </AccordionSummary>
          <AccordionDetails>
            <ShippingAddressFormClient
              onSubmit={onSubmit}
              ref={(el: Submittable) =>
                (formRefs.current[DeliveryType.CLIENT_ADDRESS] = el)
              }
              shippingAddress={shippingAddress}
              email={email}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    )
  }
)

ShippingAddressStep.displayName = 'ShippingAddressStep'

export default ShippingAddressStep
