import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import TextInputComponent from "../../component/TextInputComponent";
import { moderateScale, verticalScale } from "../../utilities/Reponsive";
import { colors } from "../../theme/colors";
import CustomButton from "../../component/CustomButton";

export default function ForgotPasswordScreen({ navigation }: any) {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.headText}>Forgot</Text>
            <Text style={styles.headText}>Password?</Text>
            <View style={styles.intView}>
                <TextInputComponent
                    placeholder="Enter your email address"
                    value={value}
                    onChangeText={setValue}
                    errorMessage={error}
                    inputStyle={styles.input}
                />
            </View>
            <View style={styles.msgTextView}> 
                <Text style={styles.msgstr}>*</Text>
                <Text style={styles.msgText}>We will send you a message to set or reset your new password</Text>
                msgText

            </View>
            <CustomButton
                title="Submit"
                onPress={() => {}}
                backgroundColor={colors.pink}
                textColor="#FFF"
                disabled={false}
                Styling={styles.btn}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(32),
    },
    headText: {
        fontWeight: "bold",
        fontSize: moderateScale(36),
        color: colors.black,
    },
    intView: {
        marginTop: verticalScale(36),
    },
    input: {
        height: verticalScale(55),
    },
    btn: {
        marginTop: verticalScale(26),
        height: verticalScale(48),
    },
    msgTextView:{
        marginTop:verticalScale(26),
        flexDirection:'row',
        gap:3
    },
    msgstr:{
        alignSelf:'flex-start',
        fontSize:moderateScale(15),
        color:colors.pink
    },
    msgText:{
        width:"80%",
        fontSize:moderateScale(15)
    }
});
