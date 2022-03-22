import Econt from '@components/icons/Econt'
import {
  Autocomplete,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material'
import { Client as EcontClient, Office } from 'econt-js'
import { FC, useEffect, useMemo, useState } from 'react'
import { Controller, Control } from 'react-hook-form'
import { CourierOfficeFieldValues } from '../CourierOfficeForm/CourierOfficeForm'
import Error from '@mui/icons-material/Error'

type Props = {
  control: Control<CourierOfficeFieldValues>
}

const CourierOfficeSelect: FC<Props> = ({ control }) => {
  const econtClient = useMemo(() => {
    return new EcontClient({
      testMode: true,
    })
  }, [])

  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<readonly Office[]>([])
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      const data = await econtClient.NomenclaturesService.getOffices({
        countryCode: 'BGR',
      })

      if (active) {
        setOptions(data.offices)
      }
    })()

    return () => {
      active = false
    }
  }, [econtClient.NomenclaturesService, loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Controller
      control={control}
      name="courierOffice"
      render={({ field, fieldState: { invalid, error } }) => (
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          getOptionLabel={(option) => option.name}
          options={options}
          loading={loading}
          renderOption={(params, option) => (
            <Box
              component="li"
              display="flex"
              alignItems="center"
              gap={0.5}
              {...params}
            >
              <Econt />
              <span>({option.code})</span>
              <span>{option.name}</span>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Офис на куриер"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && (
                      <InputAdornment position="end">
                        <CircularProgress color="inherit" size={20} />
                      </InputAdornment>
                    )}
                    {invalid && (
                      <InputAdornment position="end">
                        <Tooltip
                          title={error?.message ?? 'Грешка'}
                          arrow
                          placement="bottom-end"
                        >
                          <Error color="error" />
                        </Tooltip>
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
            />
          )}
          //@ts-ignore
          onChange={(_, data) => field.onChange(data)}
        />
      )}
    />
  )
}

export default CourierOfficeSelect
