import { FC, useCallback, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { CourierOfficeFieldValues } from '../CourierOfficeForm/CourierOfficeForm'
import { useLazyQuery } from '@apollo/client'
import econtOfficesQuery from '@graphql/queries/econtOffices'
import ControlledAutocomplete from '@components/ui/ControlledAutocomplete'
import { AutocompleteFetchDataHandler } from '@components/ui/Autocomplete/Autocomplete'
import {
  EcontOffice,
  EcontOfficeConnection,
  QueryEcontOfficesArgs,
} from '@graphql/schema'
import Econt from '@components/icons/Econt'
import Box from '@mui/material/Box'

type Props = {
  control: Control<CourierOfficeFieldValues>
}

const CourierOfficeSelect: FC<Props> = ({ control }) => {
  const [getEcontOffices] = useLazyQuery<
    { econtOffices: EcontOfficeConnection },
    Partial<QueryEcontOfficesArgs>
  >(econtOfficesQuery)
  const [offices, setOffices] = useState<EcontOffice[]>([])
  const [hasMoreOffices, setHasMoreOffices] = useState(false)
  const [loadingOffices, setLoadingOffices] = useState(true)
  const [selectedOffice, setSelectedOffice] = useState<
    EcontOffice | undefined
  >()

  const handleFetchData = useCallback<AutocompleteFetchDataHandler>(
    async ({ inputValue, first, offset, mode }) => {
      setLoadingOffices(true)
      const { data } = await getEcontOffices({
        variables: {
          first: first || 20,
          offset: offset || 0,
          searchQuery: inputValue,
        },
      })

      if (mode === 'set') {
        setOffices(data?.econtOffices?.nodes || [])
      }

      if (mode === 'append') {
        setOffices((offices) => [
          ...offices,
          ...(data?.econtOffices?.nodes || []),
        ])
      }

      setHasMoreOffices(data?.econtOffices?.pageInfo?.hasNextPage || false)
      setLoadingOffices(false)
    },
    [getEcontOffices]
  )

  return (
    <ControlledAutocomplete
      control={control}
      name="courierOffice"
      label="Офис на куриер"
      noOptionsLabel={'Не са намерени офиси'}
      getOptionLabel={(office: EcontOffice) => office.name}
      inputPlaceholder="Търси офис на куриер"
      isOptionEqualToValue={(option: EcontOffice, value: EcontOffice) =>
        option.code === value.code
      }
      loading={loadingOffices}
      onFetchData={handleFetchData}
      options={offices}
      value={selectedOffice}
      multiple={false}
      hasMore={hasMoreOffices}
    />
  )
}

export default CourierOfficeSelect
