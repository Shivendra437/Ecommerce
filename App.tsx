import React from "react";
import {StyleSheet, Text,View} from 'react-native'
import RootNavigation from "./src/navigation/RootNavigation";
import { Provider } from 'react-redux'
import store from "./src/redux/store/Store";
import HomePage from "./src/screens/homePage/HomePage";



export default function App(){
  return(
    <Provider store={store}> 
    <View style={styles.container}>
<RootNavigation/>
    </View>
    </Provider>
  )
}

const styles=StyleSheet.create({
  container:{
 flex:1,
  }
})



