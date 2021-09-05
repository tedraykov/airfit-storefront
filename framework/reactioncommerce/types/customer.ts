import * as Core from '@commerce/types/customer'

export type Customer = {
  _id: string
  firstName: string
  lastName: string
  picture: string
  primaryEmailAddress: string
}

export type CustomerTypes = {
  customer: Customer
}

export type CustomerHook = Core.CustomerHook<CustomerTypes>
