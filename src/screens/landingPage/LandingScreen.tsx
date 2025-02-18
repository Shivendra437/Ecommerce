import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import { moderateScale, verticalScale } from "../../utilities/Reponsive";
import CustomButton from "../../component/CustomButton";

export default function LandingScreen({navigation}:any) {

    const handlerHomePage=()=>{
       navigation.navigate('HomePage')
    }
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/homeimg.png")}
    >
      <View style={styles.textContainer}>
        <Text style={styles.headText}>You Want </Text>
        <Text style={styles.headText}>Authentic, here </Text>
        <Text style={styles.headText}>you go!</Text>
        <Text style={styles.buyText}>Find it here, buy it now!</Text>
        <CustomButton
                title="Get Started"
                onPress={handlerHomePage}
                backgroundColor={colors.pink}
                textColor="#FFF"
                disabled={false}
                Styling={styles.btn}
            /></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: moderateScale(90), 
  },
  headText: {
    color: colors.white,
    fontSize: moderateScale(30),
    fontWeight: "600",
  },
  buyText:{
    color: colors.white,
    fontSize: moderateScale(15),
    marginTop:verticalScale(10)
      },
      btn: {
        width:"80%",
        marginTop: verticalScale(40),
        height: verticalScale(55)
    },
});
