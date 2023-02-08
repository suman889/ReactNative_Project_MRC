import {
    StyleSheet, Text, View, Pressable, TextInput,
    ScrollView, Image, Dimensions, StatusBar, ActivityIndicator ,Modal,
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../Constant/Colors';
import { vrscale, mdscale } from '../../PixelRatio';
import { fcmService } from '../../Service/Notification/FCMService';
import database from '@react-native-firebase/database';
import Navigation from '../../Service/Navigation';
import { Font } from '../../Constant/FontFamily';
import AuthService from '../../Service/AuthService';
import { useDispatch } from 'react-redux';
import { setuser } from '../../Redux/Reducer/User';
import Toast from 'react-native-simple-toast';
import Geolocation from '@react-native-community/geolocation';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const { height, width } = Dimensions.get('window');
//console.log(' height=====', height + 50);
function phonenumber(inputtxt) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)) {
        return true;
    }
    else {
        // alert("message");
        return false;
    }
}
const validateEmail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
}
const SignUp = () => {
    const [Loader, setLoader] = useState(false)
    const dispatch = useDispatch();
    const [Reigoin, setReigoin] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })
    const [Token, setToken] = useState('')
    const [name, setName] = useState('')
    const [mobilenumber, setMobilenumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bloodgroup, setBloodgroup] = useState('')
    const [city, setCity] = useState('')

    const signUp = async () => {
        if (name != '' && email != '' && mobilenumber != '' &&
            password != '' && bloodgroup != '' && city != '') {
            if (!phonenumber(mobilenumber)) {
                Toast.show('invalid phone number', Toast.SHORT, ['UIAlertController']);
                return
            }
            if (!validateEmail(email)) {
                Toast.show('invalid email', Toast.SHORT, ['UIAlertController']);
                return
            }
            let data = {
                name: name,
                email: email,
                phone: mobilenumber,
                password: password,
                blood_group: bloodgroup,
                city: city,
                device_token: Token,
                lat: Reigoin.latitude,
                long: Reigoin.longitude
            }

            console.log('All Data',data);
            // return false
            setLoader(true)
            let result = await AuthService.register(data)
            console.log('res---', result);
            if (result.status == true) {
                let fbData = {
                    email: result.data.email,
                    fcmToken: result.data.device_token,
                    phone: result.data.phone,
                    name: result.data.name,
                    userId: result.data.id
                }
                database()
                    .ref(`/user/${fbData.userId}`)
                    .set(fbData)
                    .then(async () => {
                        AuthService.setAccount(result.data)
                        dispatch(setuser(result.data));
                        Toast.show('Register Successful');
                        setLoader(false)
                    }).catch((e) => {
                        console.log(e);
                        setLoader(false)
                    })
                // AuthService.setAccount(result.data)
                //         dispatch(setuser(result.data));
                //         Toast.show('Register Successful');
            } else {
                let err = []
                for (const key in result.error) {
                    err = [...err, result.error[key]]
                }
                console.log(err);
                Toast.show(err[0][0]);
                setLoader(false)
            }
        } else {
            Toast.show('All Fields Require!!!');
            setLoader(false)
        }
    }
    async function sendLocation() {
        //   let location =await Geolocation.getCurrentPosition();
        let location;
        Geolocation.getCurrentPosition(info => {
            console.log('data', info);
            location = {
                location: {
                    type: 'Point',
                    coordinates: [info.coords.longitude, info.coords.latitude],
                },
            };
            setReigoin({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
            })
        });
    }
    useEffect(() => {
        fcmService.register(onRegister);
        sendLocation()
    }, [])
    const onRegister = token => {
        console.log("login token [App]:", token)
        setToken(token)
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#afddf7' }}>

            <View style={{
                alignSelf: 'center',
                marginTop: vrscale(70)
            }}>
                <Image source={require('../../Assetes/logo.png')}
                    style={{
                        width: 130, height: 130,
                        borderRadius: 6,

                    }}
                />
            </View>
            <View style={styles.roundContainer}>
                {/* <View> */}
                <ScrollView keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}>
                    <Text style={{
                        color: COLORS.textColor, fontSize: mdscale(16),
                        fontWeight: 'bold',
                        marginTop: vrscale(25),
                        textAlign: 'center',
                    }}>Creat your Account</Text>

                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="#c1c1c1"
                            style={{
                                //fontWeight: 'bold',
                                color: "#000000",
                                width: mdscale(200),
                            }}
                            value={name}
                            onChangeText={val => setName(val)}
                        />

                    </View>


                    <View style={styles.inputBox}>
                        <Text style={{ color: '#000000' }}>+91</Text>
                        <TextInput
                            placeholder="Mobile Number"
                            placeholderTextColor="#c1c1c1"
                            maxLength={10}
                            style={{
                                //fontWeight: 'bold',

                                color: "#000000",
                                width: mdscale(200),
                            }}
                            keyboardType="numeric"
                            value={mobilenumber}
                            onChangeText={val => setMobilenumber(val)}
                        />

                    </View>

                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Email Address"
                            placeholderTextColor="#c1c1c1"
                            style={{
                                //fontWeight: 'bold',
                                color: "#000000",
                                width: mdscale(200),
                            }}

                            value={email}
                            onChangeText={val => setEmail(val)}
                        />

                    </View>

                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#c1c1c1"
                            style={{
                                //fontWeight: 'bold',
                                color: "#000000",
                                width: mdscale(200),
                            }}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={val => setPassword(val)}
                        />

                    </View>

                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Blood Group"
                            placeholderTextColor="#c1c1c1"
                            style={{
                                //fontWeight: 'bold',
                                color: "#000000",
                                width: mdscale(200),
                            }}
                            value={bloodgroup}
                            onChangeText={val => setBloodgroup(val)}
                        />

                    </View>

                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Enter Your City"
                            placeholderTextColor="#c1c1c1"
                            style={{
                                //fontWeight: 'bold',
                                color: "#000000",
                                width: mdscale(200),
                            }}
                            value={city}
                            onChangeText={val => setCity(val)}
                        />

                    </View>


                    <Pressable onPress={signUp}
                        style={styles.button}>
                        <Text style={styles.buttonText}> Sign up </Text>

                    </Pressable>



                    <Pressable onPress={() => Navigation.navigate('Login')}>
                        <Text style={{
                            color: '#000000', fontSize: mdscale(16),
                            fontFamily: Font.Regular,
                            marginTop: 25,
                            marginBottom: 15,
                            textAlign: 'center'
                        }}> Dont have an account?


                            <Text style={{
                                color: COLORS.textColor, fontSize: mdscale(16),
                                fontFamily: Font.Medium,

                            }}> Sign in</Text>


                        </Text>
                    </Pressable>
                </ScrollView>
            </View>
            {/* </View> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={Loader}
                onRequestClose={() => {
                }}
                statusBarTranslucent={true}
               
            >
                <View style={{
                   flex: 1,
                    backgroundColor: "#000000ab",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <ActivityIndicator size='large' color={'#c0c0c0'} />
                </View>
            </Modal>
        </View>
    )
}



const styles = StyleSheet.create({
    roundContainer: {
        width: '93%',
        height: height - 240,
        backgroundColor: COLORS.thimColor,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginTop: 20,
        alignItems: 'center',
        paddingTop: 5

    },

    inputBox: {
        backgroundColor: '#ffffff',
        width: mdscale(250),
        marginHorizontal: mdscale(25),
        marginTop: mdscale(20),
        borderRadius: 5,
        height: vrscale(45),
        //elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: mdscale(15),
        borderWidth: 1,
        borderColor: '#a2a2a2'
    },

    button: {
        backgroundColor: COLORS.HeaderColor,
        width: mdscale(150),
        height: mdscale(50),
        borderRadius: 8,

        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: 25,
        // paddingVertical: 10,
        // paddingHorizontal: 12,

        marginTop: vrscale(20)

    },

    buttonText: {
        fontSize: mdscale(16),
        //fontWeight: '10',
        color: '#f7f4f5',
        // textAlign: 'center',
        //alignItems: 'center',
        fontFamily: Font.Medium
    },
})

export default SignUp