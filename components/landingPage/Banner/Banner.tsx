import { FC } from 'react'
import { Container } from '@mui/material'

const Banner: FC = () => {
  return (
    <div className="h-full">
      <video src="preview.mp4" autoPlay muted className="object" />
    </div>
  )
}

export default Banner
