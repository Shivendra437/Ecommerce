
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import TextInputComponent from "../../component/TextInputComponent";
import { moderateScale, verticalScale } from "../../utilities/Reponsive";
import { colors } from "../../theme/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from "../../component/CustomButton";
import { useDispatch} from "react-redux";
import { signupUser } from "../../redux/slices/AuthSlice";


export default function SignUpScreen({ navigation }: any) {
    const dispatch=useDispatch();
    const socialimg = [
        { id: 'google', source: require('../../assets/images/Google.png') },
        { id: 'apple', source: require('../../assets/images/apple.png') },
        { id: 'facebook', source: require('../../assets/images/Facebook.png') },
    ];

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [confirmSecureText, setConfirmSecureText] = useState(true);
    const [errors, setErrors] = useState<{ name ?:string ,email?: string, password?: string, confirmPassword?: string }>({});

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = () => {
        let validationErrors: {name?:string, email?: string, password?: string, confirmPassword?: string } = {};

        if (!validateEmail(email)) {
            validationErrors.email = "Please enter a valid email address";
        }
        if (name=='') {
            validationErrors.name = "Please enter your name";
        }
        if (password.length < 6) {
            validationErrors.password = "Password should be at least 6 characters long";
        }
        if (password !== confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        let userData={
            name:name,
            email:email,
            password:password        }
            dispatch(signupUser(userData)).then(() => {
                navigation.navigate('Login');
            })
            .catch((error:any) => {
                console.error("Signup failed:", error);
            });

    };

    return (
        <View style={styles.container}>
            <Text style={styles.headText}>Create Account</Text>
            <View style={styles.intView}>
            <View style={{marginBottom:verticalScale(15)}}> 
                <TextInputComponent
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        setErrors(prev => ({ ...prev, name: "" }));
                    }}
                    inputStyle={styles.input}
                />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
               
                </View>
                <TextInputComponent
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setErrors(prev => ({ ...prev, email: "" }));
                    }}
                    inputStyle={styles.input}
                />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
               
                <View style={styles.passwordContainer}>

                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setErrors(prev => ({ ...prev, password: "" }));
                        }}
                        secureTextEntry={secureText}
                        style={styles.passwordInput}
                    />
                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                        <Icon name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="grey" />
                    </TouchableOpacity>
                </View>
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            setErrors(prev => ({ ...prev, confirmPassword: "" }));
                        }}
                        secureTextEntry={confirmSecureText}
                        style={styles.passwordInput}
                    />
                    <TouchableOpacity onPress={() => setConfirmSecureText(!confirmSecureText)}>
                        <Icon name={confirmSecureText ? "eye-off-outline" : "eye-outline"} size={20} color="grey" />
                    </TouchableOpacity>
                </View>
                {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
            </View>
            <Text style={styles.agreeText}>By clicking the Register button, you agree to the public offer</Text>
            <CustomButton
                title="Create Account"
                onPress={handleSignUp}
                backgroundColor={colors.pink}
                textColor="#FFF"
                disabled={false}
                Styling={styles.btn}
            />
            {<View style={styles.socialView}>
                <Text style={styles.ctnText}>- OR Sign up with -</Text>
                <FlatList
                    data={socialimg}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => alert(`Pressed ${item.id}`)} style={styles.socialIconContainer}>
                            <Image source={item.source} style={styles.socialIcon} />
                        </TouchableOpacity>
                    )}
                />
            </View> }
            <View style={styles.finalView}>
                <Text style={styles.createText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signup}>Login</Text>
                </TouchableOpacity>
            </View>
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
                fontSize: moderateScale(30),
                color: colors.black
            },
            intView: {
                marginTop: verticalScale(20)
            },
            input: {
                height: verticalScale(50)
            },
            passwordContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: colors.grey,
                borderWidth: moderateScale(1),
                borderRadius: moderateScale(5),
                paddingHorizontal: moderateScale(10),
                height: verticalScale(50),
                marginTop: verticalScale(20)
            },
            passwordInput: {
                flex: 1,
                fontSize: moderateScale(16),
            },
            agreeText: {
                width: '80%',
                fontSize: moderateScale(13),
                marginTop: verticalScale(10),
                letterSpacing: 0.5
            },
            btn: {
                marginTop: verticalScale(30),
                height: verticalScale(48)
            },
            socialView: {
                marginTop: verticalScale(40),
                justifyContent: "center",
                alignItems: 'center',
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
                alignItems: "center",
                margin: verticalScale(10)
            },
            createText: {
                fontSize: moderateScale(14),
            },
            signup: {
                fontSize: moderateScale(14),
                color: colors.pink,
                borderBottomWidth: 2,
                borderBottomColor: colors.pink
            },

    errorText: {
        color: 'red',
        fontSize: moderateScale(12),
        marginTop: verticalScale(5)
    },
});
