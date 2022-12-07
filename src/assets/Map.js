import { View, Text } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

const Map = () => {
  return (
    <MapView style={{ flex:1 }}
    mapType="none"
    showsUserLocation={true}
    initialRegion={{
      latitude: 54.898521,
      longitude: 23.903597,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }} /> 
  )
}

export default Map