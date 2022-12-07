
import * as React from 'react';

// contexts
import { AuthContext } from './src/assets/context';

// navigation 
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawer from './src/assets/CustomDrawer';

// screens
  // auth
import LoginScreen from './src/screens/authentication/LoginScreen';
import RegisterScreen from './src/screens/authentication/RegisterScreen';
  // app
import MapScreen from './src/screens/app/MapScreen';

import About from './About';

// icons
import { Feather } from '@expo/vector-icons';
import PlacesScreen from './src/screens/app/PlacesScreen';
import SettingsScreen from './src/screens/app/SettingsScreen';
import ProfileScreen from './src/screens/app/ProfileScreen';
import PopularScreen from './src/screens/app/PopularScreen';
import LocationModal from './src/screens/app/LocationModal';
import PhotoTakeScreen from './src/screens/app/PhotoTakeScreen';
import CaptureImage from './src/screens/app/CaptureImage';
import CameraPicker from './src/screens/app/CameraPicker';
import CaptureMomment from './src/screens/app/CaptureMomment';

import axios from 'axios'


// stacks
const MapStack = createStackNavigator();
const MapStackScreen = () => (
  <MapStack.Navigator>
    <MapStack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
    <MapStack.Screen name="LocationModal" component={LocationModal} options={{ headerShown: false, presentation: 'modal' }} />
    <MapStack.Screen name="PhotoTakeScreen" component={CaptureMomment} options={{ headerShown: false }} />
  </MapStack.Navigator>
)

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (

  <Drawer.Navigator  useLegacyImplementation={true} initialRouteName="Žemėlapis" 
      drawerContent={props => <CustomDrawer {...props} />}  screenOptions={{
        drawerActiveBackgroundColor: '#dcfce7',
        drawerActiveTintColor: '#22c55e',
        drawerLabelStyle: {marginLeft: -24}
      }}>
      <Drawer.Screen name="Profilis" component={ProfileScreen} options={{
        drawerIcon: ({color}) => (
          <Feather name="user" size={20} color={color} />
        )
      }} />
      <Drawer.Screen name="Žemėlapis" component={MapStackScreen} options={{
        drawerIcon: ({color}) => (
          <Feather name="map" size={20} color={color} />
        ),
        headerShown: false
      }} />
      <Drawer.Screen name="Populiariausi" component={PopularScreen} options={{
        drawerIcon: ({color}) => (
          <Feather name="trending-up" size={20} color={color} />
        )
      }} />
      <Drawer.Screen name="Vietovės" component={PlacesScreen} options={{
        drawerIcon: ({color}) => (
          <Feather name="map-pin" size={20} color={color} />
        )
      }} />
      <Drawer.Screen name="Nustatymai" component={SettingsScreen} options={{
        drawerIcon: ({color}) => (
          <Feather name="settings" size={20} color={color} />
        )
      }} />
    </Drawer.Navigator>
)

// authentication
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ title: 'Prisijungimas', headerShown: false }} />
    <AuthStack.Screen name="Register" component={RegisterScreen} options={{ title: 'Sign Up' }} />
  </AuthStack.Navigator>
)

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{
    headerShown: false
  }}>
    {userToken ? (
      <RootStack.Screen name="App" component={DrawerScreen} />
    ) : (
      <RootStack.Screen name="Authentication" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
);


export default function App() {


  const [isLoading, setIsLoading] = React.useState(null);
  const [userToken, setUserToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  axios.defaults.headers.common['Authorization'] = "Bearer " + userToken


  const authContext = React.useMemo(() => {
    return {
      signIn: (thisToken, thisUser) => {
        setUserToken(thisToken)
        setUser(thisUser)
      },
      signUp: (thisToken, thisUser) => {
        setUserToken(thisToken)
        setUser(thisUser)
      },
      signOut: () => {
        setUserToken(null)
      },
      returnUser: () => {
        return user
        console.log(user)
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}