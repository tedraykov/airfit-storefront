import React, { FC, useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Radio from '@mui/material/Radio'
import LocationSearchingIcon from '@mui/icons-material/LocationSearching'
import { Input, Button } from '@components/ui'
import s from './ShippingAddressForm.module.scss'
import cn from 'classnames'
import { Marker, GoogleMap, useLoadScript } from '@react-google-maps/api'
import {
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form/dist/types/form'
import { FieldErrors } from 'react-hook-form'
import { ShippingAddressFieldValues } from '@components/checkout/CheckoutView/CheckoutView'

interface ShippingAddressProps {
  className?: any
  register: UseFormRegister<ShippingAddressFieldValues>
  errors: FieldErrors<ShippingAddressFieldValues>
  setValue: UseFormSetValue<ShippingAddressFieldValues>
}

interface Location {
  address: string
  locality: string
  postalCode: string
}

enum DeliveryType {
  COURIER_OFFICE,
  CLIENT_ADDRESS,
}

const mapCenter: google.maps.LatLngLiteral = {
  lat: 42.698334,
  lng: 23.319941,
}

const deliveryTypeTitles = {
  [DeliveryType.CLIENT_ADDRESS]: 'Доставка до адрес на клиент',
  [DeliveryType.COURIER_OFFICE]: 'Доставка до офис на куриер',
}

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

  const postalCode =
    bestResult.address_components.find((component) =>
      component.types.includes('postal_code')
    )?.long_name ?? ''

  return {
    address,
    locality,
    postalCode,
  }
}

export const ShippingAddressForm: FC<ShippingAddressProps> = ({
  className,
  register,
  errors,
  setValue,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    language: 'bg',
    region: 'bg',
  })

  const [locationMarker, setLocationMarker] =
    useState<google.maps.LatLngLiteral | undefined>(undefined)
  const [location, setLocation] = useState<Location | undefined>(undefined)
  const [geocoder, setGeocoder] =
    useState<google.maps.Geocoder | undefined>(undefined)
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    DeliveryType.CLIENT_ADDRESS
  )

  const handleChangeDeliveryType =
    (selectedDeliveryType: DeliveryType) =>
    (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      isExpanded ? setDeliveryType(selectedDeliveryType) : null
    }

  const handleFindLocation = () =>
    navigator.geolocation.getCurrentPosition((position) => {
      const coordinates: google.maps.LatLngLiteral = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      setLocationMarker(coordinates)
    })

  useEffect(() => {
    if (!geocoder || !locationMarker) return
    ;(async () => {
      const geocoderResponse = await geocoder.geocode({
        location: new google.maps.LatLng(locationMarker),
      })

      setLocation(getShippingAddress(geocoderResponse) ?? undefined)
    })()
  }, [locationMarker])

  const handleGoogleMapLoaded = () => {
    setGeocoder(new google.maps.Geocoder())
  }

  const handleClickOnMap = (event: google.maps.MapMouseEvent) => {
    setLocationMarker({
      lat: event.latLng?.lat() ?? 0,
      lng: event.latLng?.lng() ?? 0,
    })
  }

  useEffect(() => {
    if (!location) return
    setValue('address', location.address)
    setValue('locality', location.locality)
    setValue('postalCode', location.postalCode)
  }, [location])

  const rootClassName = cn(s.root, {}, className)

  return (
    <div className={rootClassName}>
      <Accordion
        className={s.deliveryTypeAccordion}
        elevation={0}
        square={true}
        expanded={deliveryType === DeliveryType.CLIENT_ADDRESS}
        onChange={handleChangeDeliveryType(DeliveryType.CLIENT_ADDRESS)}
      >
        <AccordionSummary>
          <Radio
            color={'primary'}
            aria-label={'client-delivery'}
            checked={deliveryType === DeliveryType.CLIENT_ADDRESS}
          />
          <span className="self-center">
            {deliveryTypeTitles[DeliveryType.CLIENT_ADDRESS]}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-1 flex-col space-y-3">
            <div className="flex space-x-3">
              <Input
                type="text"
                placeholder="Адрес"
                label="address"
                register={register}
                required={deliveryType === DeliveryType.CLIENT_ADDRESS}
                error={errors.address}
              />
              <Button
                size="slim"
                color="secondary"
                onClick={handleFindLocation}
              >
                <LocationSearchingIcon />
              </Button>
            </div>
            {isLoaded && (
              <GoogleMap
                mapContainerClassName="w-full h-80"
                zoom={8}
                center={locationMarker ? locationMarker : mapCenter}
                onClick={handleClickOnMap}
                onLoad={handleGoogleMapLoaded}
              >
                {locationMarker && <Marker position={locationMarker} />}
              </GoogleMap>
            )}
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
              <div className="flex-grow">
                <Input
                  type="text"
                  placeholder="Град / Село"
                  label="locality"
                  register={register}
                  required={deliveryType === DeliveryType.CLIENT_ADDRESS}
                  error={errors.locality}
                />
              </div>
              <div className="flex-grow">
                <Input
                  type="text"
                  placeholder="Пощенски код"
                  label="postalCode"
                  register={register}
                  required={deliveryType === DeliveryType.CLIENT_ADDRESS}
                  error={errors.postalCode}
                />
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className={s.deliveryTypeAccordion}
        elevation={0}
        square={true}
        expanded={deliveryType === DeliveryType.COURIER_OFFICE}
        onChange={handleChangeDeliveryType(DeliveryType.COURIER_OFFICE)}
      >
        <AccordionSummary>
          <Radio
            color={'primary'}
            checked={deliveryType === DeliveryType.COURIER_OFFICE}
          />
          <span className="self-center">
            {deliveryTypeTitles[DeliveryType.COURIER_OFFICE]}
          </span>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col space-y-3">
          <div className="flex-grow">
            <Input type="text" placeholder="Адрес на офис" />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
