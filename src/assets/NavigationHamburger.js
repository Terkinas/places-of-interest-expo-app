import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NavigationHamburger = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="absolute" >
        <View className="left-6 top-8 shadow">
            <TouchableOpacity className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center"  onPress={() => navigation.openDrawer()}>
                <Feather name="menu" size={24} color="white" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default NavigationHamburger