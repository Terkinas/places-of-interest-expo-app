import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../../assets/context'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import {SERVER_URL} from "@env"

const LoginScreen = () => {
  const { signIn } = React.useContext(AuthContext)

  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('password');

  const handleLogin = async () => {

    const csrf = await axios.get(`${SERVER_URL}/sanctum/csrf-cookie`)
    console.log('csrf =', csrf)

    const login = await axios.post(`${SERVER_URL}/api/login`, {
        email: email,
        password: password,
    });

    console.log('login =', login.data);

    // const options = { path: '/' };
    // CookieService.set('access_token', login.data.data.token, options);

    if(login.status == 200) {
        signIn(login.data.data.token, login.data.data.user)
        console.log(login.data.data.user)
    }

}

  return (
  <SafeAreaView>
    <View className="absolute w-full flex items-center mt-12">
      <Text>Prisijungimas</Text>
    </View>
    <View className="h-full flex justify-center">
      <View className="flex-col space-y-4">
        <TextInput
        className="py-3 bg-gray-200 mx-8 px-3 rounded"
        placeholder="el. paštas" 
        type="email"
        value={email} 
        onChangeText={text => setEmail(text)} />
        <TextInput
        className="py-3 bg-gray-200 mx-8 px-3 rounded"
        placeholder="slaptažodis" 
        type="email"
        value={password}
        onChangeText={text => setPassword(text)} />

      <TouchableOpacity className="mx-auto rounded bg-green-400 px-8 py-3" onPress={() => handleLogin()}>
        <Text className="text-white">Prisijungti</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  </SafeAreaView>
  )
}

export default LoginScreen