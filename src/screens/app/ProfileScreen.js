import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../../assets/context';

import axios from 'axios'
import {SERVER_URL} from "@env"

const ProfileScreen = () => {

    // const { returnUser } = React.useContext(AuthContext);
    // let person = returnUser();

    const [locations, setLocations] = useState([]);

    const getLocations = async () => {
      console.log(`${SERVER_URL}/api/locations/request`);
      let response = await axios.get(`${SERVER_URL}/api/locations/request`);
      console.log(response.data);
      setLocations(response.data.locations);
    }

    const [posts, setPosts] = useState([]);

    const { returnUser } = React.useContext(AuthContext);

    let person = returnUser();

    useEffect(() => {
        getLocations();
        getPosts();
    }, [])

    const getPosts = () => {
        console.log(`${SERVER_URL}`)
        axios.post(`${SERVER_URL}/api/posts/personal`).then(res => {
          setPosts(res.data.posts)
          console.log(res.data.posts)
      })
      }

      const deletePost = (postId) => {
        axios.post(`${SERVER_URL}/api/posts/delete/${postId}`).then(res => {
            setPosts(res.data.posts)
        })
      }

  return (
    <SafeAreaView className="bg-green-100">

      <View >
        <View className="flex flex-col items-center">
            <View className="w-24 h-24 bg-green-300 rounded"></View>
        </View>
        <View className="flex items-center  my-3">
            <Text className="font-semibold text-md">{person && person.name}</Text>
            <Text className="text-gray-400 text-sm">{person && person.email}</Text>
        </View>
        
      </View>

      <ScrollView className="flex flex-col space-y-4 bg-white">
        <View className="my-2 w-11/12 mx-auto">
            <Text className="font-semibold text-gray-400">Mano įkėlimai</Text>
        </View>

        {posts.map(post => {
            return (
                <View key={post.id} className="w-11/12 h-96 rounded mx-auto">
                    <View ></View>
                        <Image className="w-full h-80 bg-blue-200 rounded" source={{ uri: `${SERVER_URL}/storage/images/location/lietuva/${post.image_name}` }} />
                    <View className="flex flex-row justify-between items-center">
                        <View className=" my-2">
                            <Text className="text-sm font-semibold">{post.image_title}</Text>
                            <Text className="text-xs text-gray-400">{locations[post.location_id -1].title} </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => deletePost(post.id)} className="w-8 h-8 bg-red-200 rounded flex items-center justify-center">
                                <Feather name="trash-2" size={20} color="#ef4444" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        })}
        
{/* 
            <View className="w-11/12 h-96 rounded mx-auto">
                <View className="w-full h-80 bg-blue-200 rounded"></View>
                <View className="flex flex-row justify-between items-center">
                    <View className=" my-2">
                        <Text className="text-sm font-semibold">Pirmi rudens lapai</Text>
                        <Text className="text-xs text-gray-400">Kadagių slėnis, Kaunas, Lietuva</Text>
                    </View>
                    <View>
                        <TouchableOpacity className="w-8 h-8 bg-red-200 rounded flex items-center justify-center">
                            <Feather name="trash-2" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <View className="w-11/12 h-96 rounded mx-auto">
                <View className="w-full h-80 bg-blue-200 rounded"></View>
                <View className="flex flex-row justify-between items-center">
                    <View className=" my-2">
                        <Text className="text-sm font-semibold">Pirmi rudens lapai</Text>
                        <Text className="text-xs text-gray-400">Kadagių slėnis, Kaunas, Lietuva</Text>
                    </View>
                    <View>
                        <TouchableOpacity className="w-8 h-8 bg-red-200 rounded flex items-center justify-center">
                            <Feather name="trash-2" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className="w-11/12 h-96 rounded mx-auto">
                <View className="w-full h-80 bg-blue-200 rounded"></View>
                <View className="flex flex-row justify-between items-center">
                    <View className=" my-2">
                        <Text className="text-sm font-semibold">Pirmi rudens lapai</Text>
                        <Text className="text-xs text-gray-400">Kadagių slėnis, Kaunas, Lietuva</Text>
                    </View>
                    <View>
                        <TouchableOpacity className="w-8 h-8 bg-red-200 rounded flex items-center justify-center">
                            <Feather name="trash-2" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className="w-11/12 h-96 rounded mx-auto">
                <View className="w-full h-80 bg-blue-200 rounded"></View>
                <View className="flex flex-row justify-between items-center">
                    <View className=" my-2">
                        <Text className="text-sm font-semibold">Pirmi rudens lapai</Text>
                        <Text className="text-xs text-gray-400">Kadagių slėnis, Kaunas, Lietuva</Text>
                    </View>
                    <View>
                        <TouchableOpacity className="w-8 h-8 bg-red-200 rounded flex items-center justify-center">
                            <Feather name="trash-2" size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}

            <View>
                <Text className="text-xs text-gray-400 text-center">© 2022 UAB Vietove. All rights reserved</Text>
            </View>

            <View className="h-36"></View>

      </ScrollView>

      

    </SafeAreaView>
  )
}

export default ProfileScreen