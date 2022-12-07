import { View, Text, TouchableHighlight, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import { Callout, CalloutSubview } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import NavigationHamburger from '../../assets/NavigationHamburger';

import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import {SERVER_URL} from "@env"

const MapScreen = () => {
    const navigation = useNavigation();

    const [locations, setLocations] = useState([]);

    const getLocations = async () => {
      console.log(`${SERVER_URL}/api/locations/request`);
      let response = await axios.get(`${SERVER_URL}/api/locations/request`);
      console.log(response.data);
      setLocations(response.data.locations);
    }

    const LocationImages = () => (
        locations.map(location => {
          return (
            <MapView.Marker 
            key={location.id}
            coordinate={{ latitude : location.latitude , longitude : location.longitude }}
            size={44}
            >

            <Callout>      
                                          <CalloutSubview onPress={() => navigation.navigate('LocationModal', { location })} className='w-52 h-52 bg-white rounded overflow-hidden flex flex-col justify-between'>
                                              <View className='w-full'>
                                                <View className='w-full h-32 max-h-32 flex justify-center overflow-hidden rounded'>
                                                  <Image className='h-full w-full object-fit'  source={{ uri: `${SERVER_URL}/storage/${location.image_path}` }} />
                                                </View>
                                                <Text className='text-xs text-gray-800 m-1'>{location.title}</Text>
                                              </View>

                                              <View className='flex flex-row w-full justify-around'>
                                                <TouchableHighlight  className='bg-green-400 rounded mb-2 flex justify-center px-8 py-2 pt-2 items-center'><Text className='text-white'>Peržiurėti</Text></TouchableHighlight>
                                                {/* <TouchableOpacity className='bg-white rounded mb-2 flex justify-center px-2 py-2 items-center'><Feather name="plus-square" size={20} color="black" /></TouchableOpacity> */}
                                              </View>
                                          </CalloutSubview>
            </Callout>

              
            </MapView.Marker>
          )
        })
    )

    useEffect(() => {
      // axios.get('https://6200-212-117-26-251.eu.ngrok.io/api/locations/request').then(res => console.log(res.data));
      getLocations();
    }, [])

  return (
    <View style={{ flex:1 }}>
        
      <MapView style={{ flex:1}}
    mapType="none"
    showsUserLocation={true}
    initialRegion={{
      latitude: 54.9015101,
      longitude: 23.9700665,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }}>
      {locations && <LocationImages />}


        

        {/* const getPosts = async () => {
    let response = await axios.get('https://8dd5-212-117-26-251.eu.ngrok.io/api/posts/lietuva');
    console.log(response.data);
    setPosts(response.data.posts);
    setUrl(response.data.url);
    console.log(response.data.url);
  }

  const LocationImages = () => (
    <View className='w-full h-32 bg-red-100'> 
      {posts.map(post => {
        return (
          <View key={post.id} className='w-32 h-32 bg-green-300'>
            <Image className='w-32 h-32 shadow' resizeMode='contain' source={{ uri: 'https://8dd5-212-117-26-251.eu.ngrok.io/storage/images/location/lietuva/091659-image-XFRy8f71jH.jpg' }} />
          </View>
        )
      })}
    </View>
  ) */}

            {/* <MapView.Callout tooltip className='w-52 h-52 shadow'>
                                      <TouchableHighlight onPress={() => console.log('works')} underlayColor='#dddddd'>
                                          <View className='w-full h-52 bg-white rounded overflow-hidden flex flex-col justify-between'>
                                              <View>
                                                <Image className='h-32 w-full' resizeMode='fit' source={require('../../assets/placeImages/kaunopilis.jpg')} />
                                                <Text className='text-xs text-gray-800 m-1'>Kadagių slėnis, Kaunas, Lietuva</Text>
                                              </View>

                                              <View className='flex flex-row w-full justify-around'>
                                                <TouchableOpacity className=' bg-green-400 rounded mb-2 flex justify-center px-8 py-2 pt-2 items-center'><Text className='text-white'>Nuotraukos</Text></TouchableOpacity>
                                                <TouchableOpacity className='  bg-white rounded mb-2 flex justify-center px-2 py-2 items-center'><Feather name="plus-square" size={20} color="black" /></TouchableOpacity>
                                              </View>
                                          </View>
                                      </TouchableHighlight>
                                    </MapView.Callout> */}
   
        
    </MapView>
    <NavigationHamburger />
    </View>
  )
}

export default MapScreen