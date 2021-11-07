import { FC } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { ShippingAddress } from '@framework/types/cart'
import Typography from '@mui/material/Typography'

import s from './FinalizeSummaryShipping.module.scss'

interface FinalizeSummaryShippingProps {
  shippingAddress: ShippingAddress
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
        {shippingAddress.address}
        {email}
      </CardContent>
    </Card>
  )
}

export default FinalizeSummaryShipping
