import { useLoadScript } from '@react-google-maps/api'
import { useState } from 'react'

export interface Location {
  address: string
  locality: string
  region: string
  postalCode: string
}

export const useGoogleMaps = () => {
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

  const handleFindLocation = () =>
    navigator.geolocation.getCurrentPosition((position) => {
      const coordinates: google.maps.LatLngLiteral = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      setLocationMarker(coordinates)
    })

  const handleGoogleMapLoaded = () => {
    setGeocoder(new google.maps.Geocoder())
  }

  const handleClickOnMap = (event: google.maps.MapMouseEvent) => {
    setLocationMarker({
      lat: event.latLng?.lat() ?? 0,
      lng: event.latLng?.lng() ?? 0,
    })
  }

  return {
    isLoaded,
    geocoder,
    locationMarker,
    setLocation,
    location,
    handleFindLocation,
    handleClickOnMap,
    handleGoogleMapLoaded,
  }
}
