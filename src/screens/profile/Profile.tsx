import React from "react";
import {Text,View,StyleSheet} from 'react-native';
import CustomButton from "../../component/CustomButton";
import { removeData } from "../../utilities/Storageservice";
import { colors } from "../../theme/colors";
import { verticalScale } from "../../utilities/Reponsive";


export default function Profile({navigation}:any){
    const handleLogin=()=>{
    removeData('token');
    navigation.navigate('Auth')

    }
    return(
        <View style={styles.container}>
              <CustomButton
                title="Logout"
                onPress={handleLogin}
                backgroundColor={colors.pink}
                textColor="#FFF"
                disabled={false}
                Styling={styles.btn}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    btn: {
        marginTop: verticalScale(40),
        height: verticalScale(48)
    },
})