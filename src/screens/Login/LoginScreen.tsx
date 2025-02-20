
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import TextInputComponent from "../../component/TextInputComponent";
import { moderateScale, verticalScale } from "../../utilities/Reponsive";
import { colors } from "../../theme/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from "../../component/CustomButton";
import { useDispatch, useSelector} from "react-redux";
import { loginUser } from "../../redux/slices/AuthSlice";
import { storeData } from "../../utilities/Storageservice";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken,Settings} from 'react-native-fbsdk-next';



export default function LoginScreen({ navigation }: any) {
    // Settings.initializeSDK();
    const dispatch=useDispatch();
    const result = useSelector((state:any) => state.auth.user);
    const [userInfo, setUserInfo] = useState(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [secureText, setSecureText] = useState(true);
    GoogleSignin.configure({
        webClientId: '710082056399-ij24fu278c69q4u7rbcob55rf5nj3upr.apps.googleusercontent.com', // From Google Cloud Console
        offlineAccess: true,
      });
    const socialimg = [
        { id: 'google', source: require('../../assets/images/Google.png') },
        { id: 'apple', source: require('../../assets/images/apple.png') },
        { id: 'facebook', source: require('../../assets/images/Facebook.png') },
    ];

    const validateEmail = (text: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!text) {
            setEmailError("Email is required");
        } else if (!emailRegex.test(text)) {
            setEmailError("Enter a valid email");
        } else {
            setEmailError("");
        }
    };

    const handleLogin = () => {
        if (!email) {
            setEmailError("Email is required");
        }
        if (!password) {
            setPasswordError("Password is required");
        }
        if (email && password && !emailError) {
            let credentials={
                email:email,
                password:password
            }
            dispatch(loginUser(credentials)).then((res:any) => {
                console.log('result',res.payload[0].name)
               if(res.payload.length==0){
                Alert.alert('User does not Exist');
               }
               else {
              storeData('token',res.payload[0].name)
               navigation.navigate('App')
               }
               setEmail('')
               setPassword('')
            })
            .catch((error:any) => {
                console.error("Login failed:", error);
            });

        }
    };
    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setUserInfo(userInfo);
        } catch (error:any) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled the login flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Sign in is in progress already');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play Services not available or outdated');
          } else {
            console.error(error);
          }
        }
      };
      
      const handleFacebookLogin = async () => {
        try {
          const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
          console.log('result',result)
          if (result.isCancelled) {
            Alert.alert('Login cancelled');
          } else {
            const data = await AccessToken.getCurrentAccessToken();
            if (data) {
              Alert.alert('Access Token:', data.accessToken.toString());
            }
          }
        } catch (error:any) {
          Alert.alert('Login error', error.message);
        }
      };

      const handlerSocial=(id:string)=>{
if(id=='google'){
    signIn()
}
else if(id=='facebook'){
    console.log('hello')
    handleFacebookLogin()
}
      }

    return (
        <View style={styles.container}>
            <Text style={styles.headText}>Welcome</Text>
            <Text style={styles.headText}>Back!</Text>
            <View style={styles.intView}>
                <TextInputComponent
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => { setEmail(text); validateEmail(text); }}
                    errorMessage={emailError}
                    inputStyle={styles.input}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => { setPassword(text); setPasswordError(""); }}
                        secureTextEntry={secureText}
                        style={styles.passwordInput}
                    />
                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                        <Icon name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="grey" />
                    </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                <Text style={styles.fgtText}>Forgot Password?</Text>
            </TouchableOpacity>
            <CustomButton
                title="Login"
                onPress={handleLogin}
                backgroundColor={colors.pink}
                textColor="#FFF"
                disabled={false}
                Styling={styles.btn}
            />
            <View style={styles.socialView}>
                <Text style={styles.ctnText}>- OR Continue with -</Text>
                <FlatList
                    data={socialimg}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlerSocial(item.id)} style={styles.socialIconContainer}>
                            <Image source={item.source} style={styles.socialIcon} />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.finalView}>
                <Text style={styles.createText}>Create An Account</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signup}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(32),
        backgroundColor:'#FFFFFF'
    },
    headText: {
        fontWeight: "bold",
        fontSize: moderateScale(36),
        color: colors.black
    },
    intView: {
        marginTop: verticalScale(36)
    },
    input: { height: verticalScale(55) },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.grey,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        height: verticalScale(55),
        marginTop: verticalScale(10)
    },
    passwordInput: {
        flex: 1,
        fontSize: moderateScale(16)
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(12),
        marginTop: 5
    },
    fgtText: {
        alignSelf: "flex-end",
        marginTop: verticalScale(10),
        color: colors.pink,
        fontSize: moderateScale(14)
    },
    btn: {
        marginTop: verticalScale(40),
        height: verticalScale(48)
    },
    socialView: {
        marginTop: verticalScale(76)
        , justifyContent: "center",
        alignItems: 'center'
    },
    ctnText: {
        color: colors.darkGrey,
        fontSize: moderateScale(13),
        marginBottom: verticalScale(10)
    },
    socialIconContainer: {
        marginHorizontal: moderateScale(10)
    },
    socialIcon: {
        width: moderateScale(40),
        height: moderateScale(40),
        resizeMode: 'contain'
    },
    finalView: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: "center",
        alignItems: "center", margin: verticalScale(10)
    },
    createText: {
        fontSize: moderateScale(14)
    },
    signup: {
        fontSize: moderateScale(14),
        color: colors.pink, borderBottomWidth: 2,
        borderBottomColor: colors.pink
    }
});
