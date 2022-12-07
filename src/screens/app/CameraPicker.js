import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { launchCameraAsync } from 'expo-image-picker'
import axios from 'axios';

import { Buffer } from 'buffer'
import {SERVER_URL} from "@env"
    

const CameraPicker = () => {
    const [photo, setPhoto] = useState('')
    const [photoBase, setPhotoBase] = useState('')
    const [photo64, setPhoto64] = useState('')

    const openCamera = async () => {
        let image = await launchCameraAsync({
          base64: true
        });

        setPhoto(image);
    }

    const toBase64 = async (input) => {
      let data = Buffer.from(input.base64, 'utf-8').toString('base64')
      console.log(data.slice(0, 50));
      setPhoto64(data)
    }
    
    const fromBase64 = (encoded) => {
      let data = Buffer.from(encoded, 'base64').toString('utf8')
      console.log(data.slice(0, 50));
    }

    const uploadImage = async () => {
        let data = new FormData();
        data.append("photo", {
          uri: photo.uri,
          name: photo.uri.split('/').pop(),
          type: photo.type,
      })

        axios.post(`${SERVER_URL}/api/upload`, {photo64}, {
          headers: { 'Content-Type': 'application/json' },
        }).then(res => console.log(res))
    }

    const UploadButton = () => (
      <TouchableOpacity className='w-1/3 h-12 bg-green-100' onPress={uploadImage}>
        <Text>Upload</Text>
      </TouchableOpacity>
    )

    if(photo) {
        return (
            <SafeAreaView>
                <Image className='w-10/12 h-1/2 bg-red-100' resizeMode='contain' source={photo} />

                {photo64 && <UploadButton />}

                <TouchableOpacity className='w-2/3 h-24 bg-orange-100' onPress={() => toBase64(photo)}>
                    <Text>Convert</Text>
                </TouchableOpacity>

                <TouchableOpacity className='w-2/3 h-24 bg-blue-100' onPress={() => fromBase64(photo64)}>
                    <Text>Decode</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={openCamera}>
        <Text>Open the camera</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  )
}

export default CameraPicker