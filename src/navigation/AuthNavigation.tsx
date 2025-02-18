import React from 'react';;
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/Signup/SignupScreen';
import ForgotPasswordScreen from '../screens/Forgot/ForgotPassword';

const Stack = createStackNavigator();

export default function AuthNavigation(){
    return(
      <Stack.Navigator initialRouteName='Login'> 
    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
    <Stack.Screen name="Forgot" component={ForgotPasswordScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
    )
   
}