import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import { AuthContext } from './context';


const CustomDrawer = (props) => {
    const { signOut, returnUser } = React.useContext(AuthContext);


    let person = returnUser();

    console.log(person)
    


  return (
    <View className="flex flex-1">
      <DrawerContentScrollView {...props}>
        <View className="flex flex-row items-center p-2.5">
            <View className="w-14 h-14 rounded-lg bg-orange-200"></View>
            <View className="flex flex-col ml-1">
                <Text className="font-semibold text-xs">{person && person.name}</Text>
                <Text className="text-gray-300 text-xs">{person && person.email}</Text>   
            </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="mx-2.5">
        <TouchableOpacity onPress={() => signOut()} className="flex flex-row items-center w-full justify-center  mb-6 py-2 rounded space-x-2">
            <Feather name="log-out" size={24} color="black" />
            <Text className="font-semibold">Atsijungti</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer