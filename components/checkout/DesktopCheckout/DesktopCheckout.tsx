import React, { FC } from 'react'
import useStepper, { Step as CheckoutStep } from '@hooks/useStepper'
import Fade from '@mui/material/Fade'
import CartItem from '@components/cart/CartItem'
import CartSummary from '@components/cart/CartSummary/CartSummary'
import { Button, Container } from '@components/ui'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Step from '@mui/material/Step'
import DiscountCodeForm from '@components/checkout/DiscountCodeForm/DiscountCodeForm'
import useCart from '@hooks/cart/useCart'

interface DesktopCheckoutProps {
  steps: CheckoutStep[]
}

const DesktopCheckout: FC<DesktopCheckoutProps> = ({ steps }) => {
  const { cart, loading } = useCart()
  const {
    activeStep,
    isActiveStepLoading,
    isLastStep,
    handleBack,
    handleNext,
    canContinueToNextStep,
    renderStepComponent,
  } = useStepper(steps)

  return (
    <Container className="flex flex-1 w-full justify-center">
      <section className="flex-1 mr-4 max-w-6xl">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={() => <div>{step.icon}</div>}>
                <h3 className="font-bold text-2xl ml-2">{step.label}</h3>
              </StepLabel>
              <StepContent>
                {renderStepComponent(index)}
                <div className="mt-4">
                  <Button
                    className="mr-4"
                    size="slim"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    Назад
                  </Button>
                  <Button
                    size="slim"
                    loading={isActiveStepLoading}
                    onClick={handleNext}
                    disabled={!canContinueToNextStep()}
                  >
                    {!isLastStep() ? 'Продължи' : 'Завърши'}
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </section>
      <aside>
        <Card
          className="max-w-sm w-96 shadow-sm border border-accents-3 mt-12"
          elevation={0}
        >
          <CardContent>
            <div className="flex flex-col">
              <div className="px-4 flex-1">
                <Fade in={!loading}>
                  <ul>
                    {cart?.items?.nodes?.map((item, key) => (
                      <CartItem
                        canEdit={false}
                        key={key}
                        variant="slim"
                        item={item!}
                      />
                    ))}
                  </ul>
                </Fade>
              </div>
              <div className="flex-shrink-0 px-4 pt-24 lg:pt-10">
                <DiscountCodeForm />
                <CartSummary cart={cart} />
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </Container>
  )
}

export default DesktopCheckout
