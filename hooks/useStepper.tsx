import {
  ForwardRefExoticComponent,
  PureComponent,
  useRef,
  useState,
} from 'react'

export interface Submittable {
  submit: () => any
}

export type StepSubmitData<T = any> =
  | { data: T; error?: null }
  | { data?: null; error: string | boolean }

export type StepSubmitCallback<T = any> = (
  input: StepSubmitData<T>
) => StepSubmitData<T>

export interface CheckoutStepComponentProps {
  onSubmit: StepSubmitCallback
}

export interface Step {
  label: string
  icon?: string
  isComplete: boolean
  StepComponent: ForwardRefExoticComponent<CheckoutStepComponentProps & any>
  stepComponentProps?: any
  onSubmit: (data: any) => Promise<any> | any
}

const useStepper = (steps: Step[]) => {
  const getFirstIncompleteStep = () =>
    steps.findIndex((step) => !step.isComplete)

  const [activeStep, setActiveStep] = useState(getFirstIncompleteStep())
  const [isActiveStepLoading, setIsActiveStepLoading] = useState(false)
  const stepComponentRefs = useRef<{ [key: number]: Submittable }>({})

  const handleBack = () => {
    navigateToStep(activeStep - 1)
  }

  const handleNext = () => {
    if (stepComponentRefs.current[activeStep]) {
      setIsActiveStepLoading(true)
      stepComponentRefs.current[activeStep].submit()
    }
  }

  const navigateToStep = (stepIndex: number) => {
    setActiveStep(stepIndex)
  }

  const isLastStep = () => {
    return activeStep === steps.length - 1
  }

  const canContinueToNextStep = () => {
    return !isActiveStepLoading
  }

  const handleStepSubmit = async ({ data, error }: StepSubmitData) => {
    if (error) return setIsActiveStepLoading(false)
    const { onSubmit } = steps[activeStep]
    await onSubmit(data)
    setIsActiveStepLoading(false)
    navigateToStep(activeStep + 1)
  }

  const renderStepComponent = (stepIndex: number, extraProps?: any) => {
    const step = steps[stepIndex]
    const { StepComponent, stepComponentProps } = step
    return (
      <StepComponent
        ref={(ref: Submittable) => (stepComponentRefs.current[stepIndex] = ref)}
        onSubmit={handleStepSubmit}
        {...stepComponentProps}
        {...extraProps}
      />
    )
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

export default useStepper
