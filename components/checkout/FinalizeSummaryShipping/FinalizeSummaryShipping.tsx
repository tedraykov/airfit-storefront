import { FC } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import s from './FinalizeSummaryShipping.module.scss'
import { Address } from '@graphql/schema'

interface FinalizeSummaryShippingProps {
  shippingAddress: Address
  email: string
}

const FinalizeSummaryShipping: FC<FinalizeSummaryShippingProps> = ({
  shippingAddress,
  email,
}) => {
  return (
    <Card className={s.card} elevation={0}>
      <CardContent>
        <Typography variant="h6">Адрес за доставка</Typography>
        {shippingAddress?.address1}
        {email}
      </CardContent>
    </Card>
  )
}

export default FinalizeSummaryShipping
