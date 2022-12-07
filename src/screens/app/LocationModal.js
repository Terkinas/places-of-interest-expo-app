import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import {SERVER_URL} from "@env"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';



const LocationModal = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [url, setUrl] = useState('');
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const { location } = route.params;
    setLocation(location)
  }, [location])



  const getPosts = async () => {
    console.log(`${SERVER_URL}/api/posts/${location.id}`)
    let response = await axios.get(`${SERVER_URL}/api/posts/${location.id}`);
    console.log(response.data);
    setPosts(response.data.posts);
  }

  const LocationImages = () => (
    <View className='w-full flex-1 space-y-5 pb-3'> 
      {posts.map(post => {
        return (
          <View key={post.id} className='mb-6 w-full'>
            <View className='w-full    mx-auto '>
              <Image className='w-full h-96' resizeMode='contain' source={{ uri: `${SERVER_URL}/storage/images/location/lietuva/${post.image_name}` }} />
              <View className='flex flex-col'>
                <View className='flex flex-row items-center py-2 w-9/12 mx-auto'>
                <AntDesign name="hearto" size={24} color="black" />
                <Text className='text-gray-800 ml-2'>{post.image_title}</Text>
                </View>

                <View className='w-9/12 mx-auto'>
                  <Text className='text-gray-300 italic '>Vietovė: {location.title}</Text>
                </View>

               
              </View>
              
              
            </View>
          </View>
        )
      })}
    </View>
  )

  const GetTitle = () => (
    <Text > {location && location.title} </Text>
  )

  const GetImage = () => (
    location ? (
      <Image className='h-full w-full object-contain'  source={{ uri: `${SERVER_URL}/storage/${location.image_path}` }} />
    ) : (
      ''
    )
      

  )


  // const navigation = useNavigation();
  return (
    <SafeAreaView className='bg-white'>
      <View className="w-full h-6 space-y-1 flex items-center mt-1">
        <View className='w-16 h-0.5 bg-gray-300 rounded'></View>
        <View className='w-12 h-0.5 bg-gray-300 rounded'></View>
      </View>

      <ScrollView className='w-full h-screen'>
        {/* <View className='w-fit h-fit bg-orange-10 rounded overflow-hidden rounded-lg'>
          <Image className='h-44 w-full' resizeMode='contain' source={require('../../assets/placeImages/gedas.jpg')} />
        </View> */}
        <View className='w-10/12 h-52 bg-green-100 rounded mx-auto overflow-hidden'>
          <GetImage />
          
        </View>
        
        <View className='w-full w-10/12 mx-auto'>
          <Text className='w-full mx-auto p-1 mb-4 text-sm font-semibold text-gray-700'><GetTitle />, vilnius, lietuva</Text>
              <View className="w-full mb-2">
                    <Text className='text-gray-600'> { location.description } </Text>
              </View>
            <TouchableOpacity className='w-44 flex flex-row space-x-1 justify-center items-center mx-auto px-5 py-3 bg-gray-800 rounded'  onPress={() => navigation.navigate('PhotoTakeScreen', {
              locationId: location.id
            })}>
              <MaterialCommunityIcons name="google-lens" size={24} color="white" />
              <Text className='text-gray-50 text-center'>Atidaryti kamera</Text>
            </TouchableOpacity>
          {/* <TouchableOpacity className='w-24 h-12 bg-gray-500' onPress={() => navigation.navigate('PhotoTakeScreen')}><Text>Nufotografuoti</Text></TouchableOpacity> */}
        </View>

        <View className='w-full my-4'>
        <TouchableOpacity className='w-44 flex flex-row space-x-1 justify-center items-center mx-auto px-5 py-3 bg-gray-800 rounded' onPress={getPosts}>
        <AntDesign name="eyeo" size={24} color="white" />
              <Text className='text-gray-50 text-center'>Žiurėti nuotraukas</Text>
            </TouchableOpacity>
          
        </View>

        <LocationImages />
        <View className='h-32'></View>
      </ScrollView>

  

    </SafeAreaView>
  )
}

export default LocationModal