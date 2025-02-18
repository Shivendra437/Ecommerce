
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Feather";
import LandingScreen from '../screens/landingPage/LandingScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import Profile from '../screens/profile/Profile';
import HomePage from '../screens/homePage/HomePage';
import { colors } from '../theme/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabButton = ({ children, onPress }:any) => (
  <TouchableOpacity
    style={{
      bottom: 20, 
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius:50,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation:9,
      width:70,  
      height: 70, 
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Wishlist") iconName = "heart";
          else if (route.name === "ShoppingCart") iconName = "shopping-cart";
          else if (route.name === "Search") iconName = "search";
          else if (route.name === "Settings") iconName = "settings";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor:colors.pink,
        tabBarInactiveTintColor:colors.black,
        tabBarStyle: { height: 60, paddingBottom: 5, paddingTop: 5 },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="Wishlist" component={LoginScreen} options={{ headerShown: false }} />
    
      <Tab.Screen
        name="ShoppingCart"
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false ,
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />

      <Tab.Screen name="Search" component={LoginScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomePage" component={BottomTabNavigation} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
