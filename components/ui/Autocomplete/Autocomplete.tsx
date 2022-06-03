import React, {
  FocusEventHandler,
  KeyboardEvent,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  AutocompleteInputChangeReason,
  Box,
  FilledInput,
  FormControl,
  Paper,
  useAutocomplete,
} from '@mui/material'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import InfiniteList from '../InfiniteList'
import FormLabel from '@mui/material/FormLabel'
import { PopperUnstyled } from '@mui/base'
import FormHelperText from '@mui/material/FormHelperText'
import { LoadingDots } from '@components/ui'

type AutocompleteState = {
  inputValue: string
  first: number
  offset: number
  mode: 'set' | 'append'
}

export type AutocompleteFetchDataHandler = (
  state: AutocompleteState
) => Promise<void>

export type AutocompleteProps<T extends Object> = {
  onClose?: () => void
  onFetchData: AutocompleteFetchDataHandler
  options: T[]
  loading: boolean
  label: string
  getOptionLabel: (option: T) => string
  isOptionEqualToValue: (option: T, value: T) => boolean
  inputPlaceholder: string
  noOptionsLabel: string
  initialItemsCount?: number
  hasMore?: boolean
  error?: string
  renderOptions?: (params: any, option: T) => ReactNode
} & (
  | {
      multiple: true
      value: T[]
      onChange?: (value: T[]) => void
    }
  | {
      multiple?: false
      value?: T | null
      onChange?: (value: T | null) => void
    }
)

const Autocomplete = <T extends Object>({
  options,
  loading,
  onChange,
  onClose,
  value,
  label,
  multiple,
  getOptionLabel,
  noOptionsLabel,
  isOptionEqualToValue,
  inputPlaceholder,
  onFetchData,
  initialItemsCount = 20,
  hasMore = false,
  error,
}: AutocompleteProps<T>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const [inputValue, setInputValue] = useState('')
  const [debouncedInputValue, setDebouncedInputValue] = useState('')

  useEffect(() => {
    const delayDebounced = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, 200)

    return () => clearTimeout(delayDebounced)
  }, [inputValue])

  const handleInputChange = useCallback(
    (
      event: SyntheticEvent,
      value: string,
      reason: AutocompleteInputChangeReason
    ) => {
      if (reason === 'input') {
        setInputValue(value)
      }
    },
    []
  )

  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'autocomplete-input',
    options,
    value,
    isOptionEqualToValue,
    getOptionLabel,
    // Disable built-in autocomplete filtering
    filterOptions: (x) => x,
    multiple: Boolean(multiple),
    onInputChange: handleInputChange,
    onChange: (event, newValue, reason) => {
      if (event.type === 'keydown' && reason === 'removeOption') {
        return
      }
      if ((event as KeyboardEvent).key === 'Backspace') {
        onChange && onChange(null)
        return
      }

      setAnchorEl(null)
      onChange && onChange(newValue)
    },
    onClose: (_, reason) => {
      if (reason === 'escape') {
        setAnchorEl(null)
      }
    },
  })

  const handleLoadMore = useCallback(
    (startIndex: number, endIndex: number) => {
      return onFetchData({
        inputValue,
        first: options.length,
        offset: options.length,
        mode: 'append',
      })
    },
    [onFetchData, inputValue, options.length]
  )

  useEffect(() => {
    onFetchData({
      inputValue: debouncedInputValue,
      first: initialItemsCount,
      offset: 0,
      mode: 'set',
    }).then()
  }, [onFetchData, debouncedInputValue, initialItemsCount])

  const handleFocus: FocusEventHandler = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleBlur: FocusEventHandler = () => {
    setAnchorEl(null)
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        setAnchorEl(null)
      }}
    >
      <div>
        <FormControl error={Boolean(error)} fullWidth {...getRootProps()}>
          <FormLabel error={Boolean(error)} {...getInputLabelProps()}>
            {label}
          </FormLabel>
          <FilledInput
            placeholder={inputPlaceholder}
            size="small"
            inputProps={getInputProps()}
            error={Boolean(error)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            endAdornment={
              loading && (
                <div className="flex items-center">
                  <LoadingDots size="small" />
                </div>
              )
            }
          />
          {error ? (
            <FormHelperText sx={{ color: 'error.main' }}>
              {error || 'Грешка'}
            </FormHelperText>
          ) : null}
        </FormControl>
        <PopperUnstyled open={Boolean(anchorEl)} anchorEl={anchorEl}>
          <div className="rounded-xl shadow-xl bg-primary">
            <InfiniteList
              items={groupedOptions as T[]}
              getItemProps={({ item, index }) =>
                getOptionProps({ option: item, index })
              }
              getItemLabel={getOptionLabel}
              hasMoreItems={hasMore}
              areNextItemsLoading={loading}
              loadMoreItems={handleLoadMore}
              listProps={getListboxProps()}
            />
          </div>
        </PopperUnstyled>
      </div>
    </ClickAwayListener>
  )
}

export default Autocomplete
