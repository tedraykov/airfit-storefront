import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import { StepSubmitCallback, Submittable } from '@hooks/useStepper'
import { PaymentMethod } from '@utils/paymentMethods'
import Radio from '@mui/material/Radio'

interface PaymentStepProps {
  paymentMethods: PaymentMethod[]
  onSubmit: StepSubmitCallback
}

const PaymentStep = forwardRef<Submittable, PaymentStepProps>(
  ({ paymentMethods, onSubmit }, ref) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
      paymentMethods[0].name
    )

    useImperativeHandle(ref, () => ({
      submit: () => onSubmit({ data: selectedPaymentMethod }),
    }))

    const handleChangeSelectedPaymentMethod =
      (selectedPaymentMethod: string) =>
      (event: React.ChangeEvent<{}>, isExpanded: boolean) =>
        isExpanded ? setSelectedPaymentMethod(selectedPaymentMethod) : null

    return (
      <>
        {paymentMethods.map((paymentMethod) => (
          <Accordion
            key={paymentMethod.name}
            className="shadow-sm"
            elevation={0}
            disabled={!paymentMethod.isEnabled}
            expanded={selectedPaymentMethod === paymentMethod.name}
            onChange={handleChangeSelectedPaymentMethod(paymentMethod.name)}
          >
            <AccordionSummary>
              <Radio
                color={'primary'}
                disabled
                checked={selectedPaymentMethod === paymentMethod.name}
              />
              <span className="self-center">
                {paymentMethod.icon} {paymentMethod.displayName}
              </span>
            </AccordionSummary>
            <AccordionDetails>{paymentMethod.details}</AccordionDetails>
          </Accordion>
        ))}
      </>
    )
  }
)

PaymentStep.displayName = 'PaymentStep'

export default PaymentStep
