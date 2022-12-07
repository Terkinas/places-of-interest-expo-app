import { View, Text, Button, Image, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

//icons
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import {Keyboard} from 'react-native'
import axios from 'axios';

import * as FileSystem from "expo-file-system";

import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';


const CaptureImage = () => {

    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [selectedFile, setSelectedFile] = React.useState(null);

    
    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
          })();
    },[]);

    // asking permission
    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            exif: false
        };
        
        let newPhoto = await cameraRef.current.takePictureAsync(options);

        const manipResult = await manipulateAsync(
            newPhoto.uri,
           [ { resize: { width: newPhoto.width / 5, height: newPhoto.height / 5 } } ],
           { compress: 0.2 }
        );

        console.log('image.width: ', manipResult.width);

        setPhoto(manipResult);
    };
    



    // if image exist

    if(photo) {

      const handleImage = () => {
        if (photo) {
          console.log(photo, photo?.uri, photo.type)
            if (photo.uri) {
                const formdata = new FormData();
                formdata.append('image', {
                    uri: photo.uri,
                    name: photo.uri.split('/').pop(),
                    type: 'image/jpg'
                });
                console.log('this =', formdata)
                setSelectedFile(formdata);
                handleSubmit();
            }
        }
    };

        const handleSubmit = async() => {
            const formData = new FormData();
            formData.append("photo", {
              uri: photo.uri,
              name: photo.uri.split('/').pop(),
              type: 'image/jpg'
          });
          
            await axios.post("https://5d61-212-117-26-251.eu.ngrok.io/api/upload", {
                formData
              }, {
                headers: { "Content-Type": "multipart/form-data" },
              }).then(response => {
                console.log(response.data)
              })
          }
        

        return (
            <ScrollView onPress={() => Keyboard.dismiss()}>
                <SafeAreaView className='flex w-full h-screen bg-black'>
             
                
        
                    {/* <Image className='flex flex-1 rounded-lg min-h-64 w-3/5 scale-90 mx-auto shadow shadow-black' resizeMode='contain' source={{ uri: "data:image/jpg;base64," + photo.base64 }} /> */}
                    <Image className='min-h-64 h-96 w-screen' resizeMode='contain' source={{ uri: photo.uri }} />

                    <View className='w-10/12 mx-auto mt-4 h-1/6 flex flex-row justify-between'>
                        <TouchableOpacity className='w-16 flex flex-col items-center' onPress={() => setPhoto(undefined)}>
                            <Feather name="delete" size={24} color="white" />
                            <Text className='text-xs text-gray-700 mt-1'>DISCARD</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSubmit} className='w-16 flex flex-col items-center'>
                            <AntDesign name="plussquareo" size={24} color="white" />
                            <Text className='text-xs text-gray-700 mt-1'>POST</Text>
                        </TouchableOpacity>
                    </View>
      
                    <Text className='text-white'>{JSON.stringify(photo.uri)}</Text>
             
                </SafeAreaView>
            </ScrollView>
        )
    }
















  return (
    <SafeAreaView className='flex-1 h-screen bg-black'>
    <Camera className='flex flex-1  my-auto'  ref={cameraRef}>
      <SafeAreaView className='h-full flex flex-col justify-between py-4 pb-12 items-center'>
        {/* <Button className='h-24 w-24 bg-white rounded-full absolute b-12 mx-auto' title="Take Pic" onPress={takePic} /> */}
        <Text className='text-white text-xs font-semibold'>Vietove.lt</Text>
        <TouchableOpacity className='w-20 h-20 border-2 border-white bg-transparent rounded-full mx-auto flex justify-center items-center' onPress={takePic}>
            <View className='w-16 h-16 bg-white rounded-full'></View>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar style="auto" />
    </Camera>
    </SafeAreaView>
  )
}

export default CaptureImage