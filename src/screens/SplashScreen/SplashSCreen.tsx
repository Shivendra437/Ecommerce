import React, { useEffect } from "react";
import {Image, StyleSheet, Text,View} from'react-native'
import { horizontalScale, verticalScale } from "../../utilities/Reponsive";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashSCreen({navigation}:any){

    useEffect(()=>{
    setTimeout(async ()=>{
        const token=await AsyncStorage.getItem('token');
       if(token){
        navigation.navigate('App')
       }
       else 
        navigation.navigate('Auth')
    },3000)
    })

    return(
        <View style={styles.container}>
         <Image source={require('../../assets/images/splash.png')} style={styles.image}/>
        </View>
    )
}

const styles=StyleSheet.create({
   container:{
    flex:1,
    justifyContent:"center",
    alignItems:'center'
   } ,
   image:{
    width:horizontalScale(274),
    height:verticalScale(100)

   }
})