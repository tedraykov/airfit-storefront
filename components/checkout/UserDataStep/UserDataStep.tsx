import React, { FC } from 'react'
import UserDataForm from '@components/checkout/UserDataForm'
import { Text } from '@components/ui'

// interface UserDataStep {};

const UserDataStep: FC = () => {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      <Text variant="pageHeading">🧑‍🚀 Данни за клиента</Text>
      <UserDataForm />
    </div>
  )
}

export default UserDataStep
