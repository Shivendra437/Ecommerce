import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BackHandler } from 'react-native';
import SplashSCreen from '../screens/SplashScreen/SplashSCreen';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import { createNavigationContainerRef } from '@react-navigation/native';

const Stack = createStackNavigator();

const config = {
  screens: {
    Login: "login",
    SignUp: "signup",
    Forgot: "forgot",
  },
};

const linking = {
  prefixes: ["https://projectTest.com", "projectTest://"],
  config,
};



export const navigationRef = createNavigationContainerRef();

export default function RootNavigation() {
  useEffect(() => {
    const handleBackPress = () => {
      if (navigationRef.isReady()) {
        const currentRoute = navigationRef.getCurrentRoute()?.name;
        console.log('currentRoute',currentRoute)
        
        if (currentRoute == 'Landing' || currentRoute == 'Login') {
          BackHandler.exitApp();
          return true; 
        }
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={SplashSCreen} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={AuthNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="App" component={AppNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
