import { createContext, FC } from 'react'

type State = {
  locale: string
  locales: string[]
}

export const LocaleContext = createContext<State>({} as State)

type LocaleProviderProps = {
  locale: string
  locales: string[]
}

export const LocaleProvider: FC<LocaleProviderProps> = ({
  children,
  locale,
  locales,
}) => {
  return (
    <LocaleContext.Provider
      value={{
        locale,
        locales,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}
