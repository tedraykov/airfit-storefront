import React, { FC } from 'react'
import { ChevronLeft, Cross } from '@components/icons'
import s from './SidebarLayout.module.css'
import { twMerge } from 'tailwind-merge'

type ComponentProps = { className?: string } & (
  | { handleClose: () => any; handleBack?: never }
  | { handleBack: () => any; handleClose?: never }
)

const SidebarLayout: FC<ComponentProps> = ({
  children,
  className,
  handleClose,
  handleBack,
}) => {
  return (
    <div className={twMerge(`relative h-full flex flex-col`, className)}>
      <header
        className={`
          sticky top-0 pl-4 py-4 pr-6 bg-primary
          flex items-center justify-end w-full z-10 min-h-[66px]
          lg:min-h-[74px]
        `}
      >
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <Cross className="h-6 w-6 hover:text-accent-3" />
          </button>
        )}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className={`
              flex items-center transition ease-in-out duration-150
              hover:text-accent-5 focus:outline-none
            `}
          >
            <ChevronLeft className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-accent-7 text-xs">Back</span>
          </button>
        )}
      </header>
      <div className={s.container}>{children}</div>
    </div>
  )
}

export default SidebarLayout
