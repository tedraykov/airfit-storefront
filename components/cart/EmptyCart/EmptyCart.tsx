import { FC } from 'react'
import { Bag } from '@components/icons'

const EmptyCart: FC = () => {
  return (
    <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
      <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
        <Bag className="absolute" />
      </span>
      <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
        Вашата количка е празна
      </h2>
      <p className="text-accents-6 px-10 text-center pt-2">
        Бисквити овес кафе вафли сладолед тирамису пудинг кексче чийзкейк.
      </p>
    </div>
  )
}

export default EmptyCart
