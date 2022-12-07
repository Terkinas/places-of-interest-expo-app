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

const PhotoTakeScreen = () => {

    let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
          })();
    },[]);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
      } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
      }

      let takePic = async () => {

        let options = {
          quality: 1,
          base64: true,
          exif: false
        };
    
        let newPhoto = await cameraRef.current.takePictureAsync(options);

        // console.log('org height = ', newPhoto.height);
        // console.log('org uri = ',newPhoto.uri);
        // console.log('org width = ',newPhoto.width);
        // if (newPhoto.hasOwnProperty('uri')) {
          const manipResult = await manipulateAsync(
             newPhoto.uri,
            [ { resize: { width: newPhoto.width / 5, height: newPhoto.height / 5 } } ],
            { base64: true, compress: 0.2 }
          );
          console.log('res = ', manipResult.width);
          // setPhoto(manipulateResult);
      // }

        setPhoto(manipResult);
      };



      if (photo) {
        let sharePic = () => {
          shareAsync(photo.uri).then(() => {
            setPhoto(undefined);
          });
        };
    
        let savePhoto = () => {
          MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
            // setPhoto(undefined);
          });
         
        };

        const checkFileSize = async (fileURI) => {
          const fileInfo = await FileSystem.getInfoAsync(fileURI);
          if (!fileInfo.size) return false;
          const sizeInMb = fileInfo.size / 1024 / 1024;
          return sizeInMb < 2;
        };

        const uploadImage = async () => {
          try {
            console.log("Upload Image", photo);
            const formData = new FormData();
            formData.append("filename", photo);
            const config = {
              headers: {
                "content-type": "multipart/form-data"
              }
            };
            console.log(formData.getAll("filename"));
            const url = `https://d3a1-212-117-26-251.eu.ngrok.io/api/post-upload`;
        
            const result = await axios.post(url, formData, config);
            console.log("REsult: ", result);
          } catch (error) {
            console.error(error);
          }
        };

        

        const submitData = async () => {
          const canUpload = await checkFileSize(photo.uri);
          if (!canUpload) {
            alert("Cannot upload files larger than 2MB");
            return;
          }
          const fdata = new FormData();
          fdata.append('filename', photo.base64);

          console.log(fdata.getAll('filename')[0])
          
          
          axios.post('https://9e5c-212-117-26-251.eu.ngrok.io/api/post-upload', {
            image: fdata.getAll('filename')[0]
          },{
            headers: { 'Content-Type': 'multipart/form-data' }
          } ).then(res => {
            // console.log(res)
          }).catch(err => console.log(err))
        }
    
        return (
          <ScrollView onPress={() => Keyboard.dismiss()}>
          <SafeAreaView className='flex w-full h-screen bg-black'>
           
              
      
            <Image className='flex flex-1 rounded-lg w-3/5 scale-90 mx-auto shadow shadow-black' resizeMode='contain' source={{ uri: "data:image/jpg;base64," + photo.base64 }} />

            <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View><TextInput maxLength={40} placeholderTextColor={'#789'} autoFocus='true' placeholder='Įveskite tekstą...'  multiline='true' style={{ placeholderColor: 'white' }} className='text-white  bg-gray-800 h-8  w-5/6 mx-auto rounded px-2 mb-2'></TextInput></View>
      </KeyboardAvoidingView>
    
            
            
            <View className='w-10/12 mx-auto mt-4 h-1/6 flex flex-row justify-between'>
              <TouchableOpacity className='w-16 flex flex-col items-center' onPress={() => setPhoto(undefined)}>
                
                <Feather name="delete" size={24} color="white" />
                <Text className='text-xs text-gray-700 mt-1'>DISCARD</Text>
              </TouchableOpacity>
            
            <TouchableOpacity className='flex flex-col items-center' onPress={savePhoto}>
            {hasMediaLibraryPermission ? (<MaterialIcons name="save-alt" size={24} color="white" /> ) : undefined}
            <Text className='text-xs text-gray-700 mt-1'>SAVE</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={sharePic} className='w-16 flex flex-col items-center'> */}
            <TouchableOpacity onPress={submitData} className='w-16 flex flex-col items-center'>
            <AntDesign name="plussquareo" size={24} color="white" />
              <Text className='text-xs text-gray-700 mt-1'>POST</Text>
            </TouchableOpacity>
    
           
            </View>
            <Text className='text-white'>{JSON.stringify(photo.uri)}</Text>
           
          </SafeAreaView>
          </ScrollView>
        );
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

export default PhotoTakeScreen