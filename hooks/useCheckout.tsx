import {
  ForwardRefExoticComponent,
  PureComponent,
  useRef,
  useState,
} from 'react'

export interface Submittable {
  submit: () => any
}

export interface CheckoutStep {
  StepComponent: ForwardRefExoticComponent<any>
}

const useCheckout = (steps: CheckoutStep[]) => {
  const [activeStep, setActiveStep] = useState(0)
  const [isActiveStepLoading, setIsActiveStepLoading] = useState(false)
  const activeStepRef = useRef(null)

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = () => {}

  const isLastStep = () => {
    return activeStep === steps.length - 1
  }

  const canContinueToNextStep = () => {
    return !isActiveStepLoading && !isLastStep()
  }

  const renderStepComponent = (stepIndex: number, extraProps: any) => {
    const step = steps[stepIndex]
    const { StepComponent } = step
    return <StepComponent {...extraProps} />
  }

  return {
    activeStep,
    handleBack,
    handleNext,
    isLastStep,
    isActiveStepLoading,
    canContinueToNextStep,
    renderStepComponent,
  }
}

export default useCheckout
