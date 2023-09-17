
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useMemo, useRef, useState } from 'react';
import loadingLogo from '../../assets/S-Loop_transnparent.gif'

// const center = { lat: 40.8448, lng: 40.8448 }

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ['places']
  })

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDurations] = useState('')
  const [map, setMap] = useState(/** @type google.maps.map */(null))

  const center = useMemo(() => ({ lat: 40.8448, lng: -73.8648 }), []);

  // start and end point to be replaced with poi cordinates
  // const originRef = useRef()
  // const destinationRef = useRef()

  const startPoint = { center }
  const endPoint = { lat: 40.6782, lng: -73.9442 }

  if (!isLoaded) {
    return (
      <div>
        <img src={loadingLogo} alt='loading...' />
      </div>
    )
  }

  return (
    <div position='center' className='h-[300px] w-[600px]'>
      <GoogleMap
        center={center}
        zoom={5}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          // zoomControl: false,
          // streetViewControl: false,
          mapTypeControl: false,
          // fullscreenControl: false
        }}
        onLoad={(map) => setMap(map)}
      >
        <MarkerF position={center} />
      </GoogleMap>
      <p><button onClick={() => map.panTo(center)}>📍</button></p>
      <br />
    </div>
  )
}
