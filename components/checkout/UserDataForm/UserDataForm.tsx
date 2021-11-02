import { FC } from 'react'
import Input from '@mui/material/Input'

const UserDataForm: FC = () => {
  return (
    <>
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
        <Input label="firstName" type="text" placeholder="Име" />
        <Input label="sureName" type="text" placeholder="Фамилия" />
      </div>
      <Input type="tel" label="phone" placeholder="Телефонен номер" />
      <Input type="email" label="email" placeholder="Емейл" />
    </>
  )
}

export default UserDataForm
