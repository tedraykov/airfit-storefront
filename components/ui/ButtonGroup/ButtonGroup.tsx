import React, { JSXElementConstructor } from 'react'

export interface ButtonGroupProps {
  children: React.ReactNode
  variant?: 'flat' | 'slim'
  Component?: string | JSXElementConstructor<any>
}

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { children, variant = 'slim', Component = 'div' } = props

  return (
    <Component>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null
        }

        return React.cloneElement(child, { variant })
      })}
    </Component>
  )
}

export default ButtonGroup
