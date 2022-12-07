import { View, Text, SafeAreaView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { launchCameraAsync } from 'expo-image-picker'
import axios from 'axios';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';

//icons
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {Keyboard} from 'react-native'
import {SERVER_URL} from "@env"
// data.append("photo", {
//     name: photo.name,
//     type: photo.type,
//     uri: Platform.OS === 'ios' ? 
//          photo.uri.replace('file://', '')
//          : photo.uri,
//   })



const CaptureMomment = ({ route, navigation }) => {
  const [photo, setPhoto] = useState('')
  const [title, setTitle] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [location, setLocation] = useState();

  // const navigation = useNavigation();

  useEffect(() => {
  //  openCamera();
    const { locationId } = route.params;
    setLocation(locationId)
    console.log(locationId)

  }, []);
  

  const openCamera = async () => {
    let image = await launchCameraAsync();

    if(image.cancelled) {
      navigation.navigate('LocationModal')
    }

  //   let newImage = await manipulateAsync(
  //     image.uri,
  //    [ { resize: { width: 300, height: 200 } } ],
  //    { compress: 0.1 }
  //  );
    setPhoto(image);
  }

  const uploadImage = async () => {
    if(!title) {
      console.log(title)
      setIsEmpty(true)
      return
    }
    let data = new FormData();
    data.append("photo", {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'unknown',
  });
  data.append("title", `${title}`)
  data.append('locationId', `${location}`)

    axios.post(`${SERVER_URL}/api/upload`, data
        ).then(res => res.status == 200 ? navigation.navigate('LocationModal') : '').catch(err => console.log(err))
}

const UploadButton = () => (
  <TouchableOpacity className='w-1/3 h-12 bg-green-100' onPress={uploadImage}>
    <Text>Upload</Text>
  </TouchableOpacity>
)

if (photo) {
  return (
    <ScrollView onPress={() => Keyboard.dismiss()}>
    <SafeAreaView className='justify-center'>
      <Image  className='w-10/12 h-96 mx-auto bg-red-100 mb-1 rounded' resizeMode='cover' source={photo} />

      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View><TextInput value={title} onChangeText={(e) => setTitle(e)} maxLength={40} placeholderTextColor={'#789'} placeholder='Įveskite pavadinimą...'  multiline='true' style={{ placeholderColor: 'white' }} className='text-gray-800  bg-gray-100 shadow border border-1 border-gray-200 h-10  w-5/6 mx-auto rounded px-2 mb-2'></TextInput></View>
      </KeyboardAvoidingView>
      {isEmpty && <Text className='text-xs mx-auto text-red-400'>Užpildykite laukelį ir bandykite dar kartą</Text>}

      <View className='w-10/12 mx-auto mt-4 h-1/6 flex flex-row justify-between'>
              <TouchableOpacity className='w-16 flex flex-col items-center' onPress={() => setPhoto(undefined)}>
                
                <Feather name="delete" size={24} color="#445" />
                <Text className='text-xs text-gray-700 mt-1'>DISCARD</Text>
              </TouchableOpacity>

            <TouchableOpacity onPress={uploadImage} className='w-16 flex flex-col items-center'>
            <AntDesign name="plussquareo" size={24} color="#445" />
              <Text className='text-xs text-gray-700 mt-1'>POST</Text>
            </TouchableOpacity>
    
           
            </View>
            <Text className='mx-auto text-gray-300 text-xs'>Vietove.lt 2022. All right reserved</Text>
    </SafeAreaView>
    </ScrollView>
  )
}

return (
  <SafeAreaView className='h-screen justify-center items-center'>
    <TouchableOpacity className='px-5 py-3 bg-gray-800 rounded'  onPress={openCamera}>
      <Text className='text-gray-50'>Atidaryti kamera</Text>
    </TouchableOpacity>

    <Text>Prašome palaukti...</Text>
  </SafeAreaView>
)
}

export default CaptureMomment