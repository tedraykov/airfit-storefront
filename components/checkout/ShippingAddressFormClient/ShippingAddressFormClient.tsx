import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { Button } from '@components/ui'
import LocationSearchingIcon from '@mui/icons-material/LocationSearching'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useGoogleMaps, Location } from '@hooks/useGoogleMaps'
import { yupResolver } from '@hookform/resolvers/yup'
import ControlledTextField from '@components/ui/ControlledTextField'
import { StepSubmitCallback, Submittable } from '@hooks/useStepper'
import { ShippingAddress } from '@framework/types/cart'
import { Skeleton } from '@mui/material'

const mapCenter: google.maps.LatLngLiteral = {
  lat: 42.698334,
  lng: 23.319941,
}

export interface ShippingAddressFieldValues {
  firstName: string
  sureName: string
  phone: string
  email: string
  address: string
  city: string
  region: string
  postal: string
}

const shippingAddressFormSchema = yup.object().shape({
  firstName: yup.string().required('Задължително поле'),
  sureName: yup.string().required('Задължително поле'),
  phone: yup
    .string()
    .matches(/^\+?\d+$/, 'Въведете валиден номер')
    .required('Задължително поле'),
  email: yup
    .string()
    .email('Въведете валиден мейл')
    .required('Задължително поле'),
  address: yup.string().required('Задължително поле'),
  city: yup.string().required('Задължително поле'),
  region: yup.string().required('Задължително поле'),
  postal: yup.string().required('Задължително поле'),
})

const getShippingAddress = (
  res: google.maps.GeocoderResponse
): Location | null => {
  const bestResult = res.results[0] ?? null
  if (!bestResult) return null

  const address = bestResult.formatted_address.split(',')[0]

  const locality =
    bestResult.address_components.find((component) =>
      component.types.includes('locality')
    )?.long_name ?? ''

  const region =
    bestResult.address_components.find((component) =>
      component.types.includes('administrative_area_level_1')
    )?.long_name ??
    locality ??
    ''

  const postalCode =
    bestResult.address_components.find((component) =>
      component.types.includes('postal_code')
    )?.long_name ?? ''

  return {
    address,
    locality,
    region,
    postalCode,
  }
}

interface ShippingAddressFormClient {
  shippingAddress?: ShippingAddress
  email?: string
  onSubmit: StepSubmitCallback<ShippingAddressFieldValues>
}

const ShippingAddressFormClient = forwardRef<
  Submittable,
  ShippingAddressFormClient
>(({ shippingAddress, email, onSubmit }, ref) => {
  const { control, setValue, trigger, handleSubmit } =
    useForm<ShippingAddressFieldValues>({
      mode: 'onChange',
      resolver: yupResolver(shippingAddressFormSchema),
    })

  useImperativeHandle(ref, () => ({
    submit() {
      handleSubmit(
        (values) => {
          onSubmit({ data: values, error: null })
        },
        () => {
          onSubmit({ data: null, error: true })
        }
      )()
    },
  }))

  const {
    isLoaded,
    geocoder,
    locationMarker,
    setLocation,
    location,
    handleFindLocation,
    handleClickOnMap,
    handleGoogleMapLoaded,
  } = useGoogleMaps()

  useEffect(() => {
    if (!geocoder || !locationMarker) return
    ;(async () => {
      const geocoderResponse = await geocoder.geocode({
        location: new google.maps.LatLng(locationMarker),
      })

      setLocation(getShippingAddress(geocoderResponse) ?? undefined)
    })()
  }, [locationMarker])

  useEffect(() => {
    if (!location) return
    setValue('address', location.address)
    setValue('city', location.locality)
    setValue('region', location.region)
    setValue('postal', location.postalCode)
    trigger(['address', 'postal', 'city', 'region'])
  }, [location])

  return (
    <div className="flex flex-1 flex-col space-y-3">
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
        <div className="flex-grow">
          <ControlledTextField
            name="firstName"
            control={control}
            defaultValue={shippingAddress?.firstName ?? ''}
            label="Име"
          />
        </div>
        <div className="flex-grow">
          <ControlledTextField
            name="sureName"
            control={control}
            defaultValue={shippingAddress?.sureName ?? ''}
            label="Фамилия"
          />
        </div>
      </div>
      <ControlledTextField
        name="phone"
        control={control}
        defaultValue={shippingAddress?.phone ?? ''}
        label="Телефонен номер"
      />
      <ControlledTextField
        name="email"
        control={control}
        defaultValue={(email && email) || ''}
        label="Имейл"
      />
      <div className="flex space-x-3">
        <ControlledTextField
          name="address"
          control={control}
          defaultValue={shippingAddress?.address ?? ''}
          label="Адрес"
          fullWidth
        />
        <Button size="slim" color="secondary" onClick={handleFindLocation}>
          <LocationSearchingIcon />
        </Button>
      </div>
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="w-full h-80"
          zoom={8}
          center={locationMarker ? locationMarker : mapCenter}
          onClick={handleClickOnMap}
          onLoad={handleGoogleMapLoaded}
        >
          {locationMarker && <Marker position={locationMarker} />}
        </GoogleMap>
      ) : (
        <Skeleton variant="rectangular" className="h-80" />
      )}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
        <div className="flex-grow">
          <ControlledTextField
            name="city"
            control={control}
            defaultValue={shippingAddress?.city ?? ''}
            label="Град / Село"
          />
        </div>
        <div className="flex-grow">
          <ControlledTextField
            name="postal"
            control={control}
            defaultValue={shippingAddress?.postal ?? ''}
            label="Пощенски код"
          />
        </div>
      </div>
      <ControlledTextField
        name="region"
        control={control}
        defaultValue={shippingAddress?.region ?? ''}
        label="Област"
      />
    </div>
  )
})

export default ShippingAddressFormClient
