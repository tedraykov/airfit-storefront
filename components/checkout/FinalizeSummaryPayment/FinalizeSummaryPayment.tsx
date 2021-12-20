import { FC } from 'react'
import { PaymentMethod } from '@utils/paymentMethods'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

interface FinalizeSummaryPaymentProps {
  paymentMethod: PaymentMethod
}

const FinalizeSummaryPayment: FC<FinalizeSummaryPaymentProps> = ({
  paymentMethod,
}) => {
  return (
    <Card>
      <CardContent>{paymentMethod?.displayName}</CardContent>
    </Card>
  )
}

export default FinalizeSummaryPayment
