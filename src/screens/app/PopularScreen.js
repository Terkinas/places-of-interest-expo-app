import { View, Text, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import {SERVER_URL} from "@env"

const PopularScreen = () => {
    const navigation = useNavigation();

    const [posts, setPosts] = useState([]);

    useLayoutEffect(() => {
      getPosts();
      getLocations();
    }, [])

    const getPosts = () => {
      console.log(`${SERVER_URL}`)
      axios.post(`${SERVER_URL}/api/posts/request`).then(res => {
        setPosts(res.data.posts)
        console.log(res.data.posts)
    })
    }

    const [locations, setLocations] = useState([]);

    const getLocations = async () => {
      console.log(`${SERVER_URL}/api/locations/request`);
      let response = await axios.get(`${SERVER_URL}/api/locations/request`);
      console.log(response.data);
      setLocations(response.data.locations);
    }

  return (
    <ScrollView className='bg-white'>
      <Text className='text-xs font-semibold text-center ml-3 text-gray-400 mt-6'>Atrask, kas patiktu labiausiai </Text>
      {/* <TouchableOpacity onPress={() => navigation.openDrawer()}><Text>lldsladlaslds</Text></TouchableOpacity> */}
      {posts && posts.map(post => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate('LocationModal', {
            location: locations[post.location_id -1]
          })} className='w-full aspect-square mx-auto my-2 shadow' key={post.id}>
            <Image className='rounded w-10/12 mx-auto aspect-square' source={{ uri: `${SERVER_URL}/storage/images/location/lietuva/${post.image_name}` }}/>
            <View className='w-10/12 mx-auto mt-1'>
              <Text className='text-gray-700'>{post.image_title}</Text>
            </View>

          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

export default PopularScreen