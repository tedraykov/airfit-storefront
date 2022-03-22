import React from 'react'
import { UIContext } from '@context/UIContext'

const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export default useUI
