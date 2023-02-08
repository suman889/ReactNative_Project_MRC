import {
    StyleSheet, Text, View, Image, Pressable, TextInput, ActivityIndicator, Dimensions, Modal,
    StatusBar
} from 'react-native'
import React, { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { COLORS } from '../../Constant/Colors';
import { vrscale, mdscale } from '../../PixelRatio';
import Navigation from '../../Service/Navigation';
import { Font } from '../../Constant/FontFamily';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
////Development Packege
import AuthService from '../../Service/AuthService';
import { useDispatch } from 'react-redux';
import { setuser } from '../../Redux/Reducer/User';
import Toast from 'react-native-simple-toast';
import { fcmService } from '../../Service/Notification/FCMService';
import database from '@react-native-firebase/database';

const Login = () => {
    const [Loader, setLoader] = useState(false)
    const dispatch = useDispatch();
    const [Reigoin, setReigoin] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })
    const [useremail, setUserEmail] = useState('')
    const [Token, setToken] = useState('')
    const [password, setPassword] = useState('')

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

    {/**create a function for signIn button for Development purpose */ }
    const signIn = async () => {

        if (useremail != '' && password != '') {
            let data = {
                email: useremail,
                password: password,
                device_token: Token,
                lat: Reigoin.latitude,
                long: Reigoin.longitude
            }
            console.log('data', data);
            // return 
            setLoader(true)
            let result = await AuthService.login(data)
            console.log('res---', result);
            if (result && result.status) {
                let fbData = {
                    email: result.data.email,
                    fcmToken: result.data.device_token,
                    phone: result.data.phone,
                    name: result.data.name,
                    userId: result.data.id
                }
                database()
                    .ref(`/user/${fbData.userId}`)
                    .update(fbData)
                    .then(async () => {
                        AuthService.setAccount(result.data)
                        dispatch(setuser(result.data));
                        Toast.show('Login Successful');
                        setLoader(false)
                    }).catch((e) => {
                        console.log(e);
                        setLoader(false)
                    })

            } else {
                if (result.data == 'Wrong Username Or Passwird !! pleace check') {
                    Toast.show(result.data);
                    setLoader(false)
                } else {
                    let err = []
                    for (const key in result.error) {
                        err = [...err, result.error[key]]
                    }
                    Toast.show(err[0][0]);
                    setLoader(false)
                }

            }

        } else {
            Toast.show('All Fields Require!!')
        }
    }


    useEffect(() => {
        fcmService.register(onRegister);
        console.log('start');
        sendLocation()
    }, [])
    const onRegister = token => {
        console.log("login token [App]:", token)
        setToken(token)
    };


    {/** main Rendering Part */ }
    return (
        <View style={{ flex: 1, backgroundColor: '#afddf7' }}>
            <StatusBar
                backgroundColor='#ffffff'
                barStyle="dark-content"
            />
            <View style={{
                alignSelf: 'center',
                marginTop: vrscale(50)
            }}>
                <Image source={require('../../Assetes/logo.png')}
                    style={{
                        width: 130, height: 130,
                        borderRadius: 6,

                    }}
                />
            </View>

            <View style={styles.roundContainer}>
                <Text style={{
                    color: COLORS.textColor, fontSize: 16,
                    fontWeight: 'bold',
                    marginTop: vrscale(25),
                }}>Login to Your Account</Text>

                <View style={styles.user_name}>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#c1c1c1"
                        style={{
                            //fontWeight: 'bold',
                            color: "#000000",
                            width: mdscale(200),
                        }}

                        value={useremail}
                        onChangeText={val => setUserEmail(val)}
                    />

                </View>

                <View style={styles.password}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#c1c1c1"
                        style={{
                            //fontWeight: 'bold',
                            color: "#000000",
                            width: mdscale(184),
                            //backgroundColor: 'green'
                        }}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={val => setPassword(val)}
                    />
                    <Text style={{
                        color: COLORS.textColor, fontSize: 13, fontWeight: 'bold',
                    }}> Forgot?</Text>
                </View>

                <Text style={{
                    color: COLORS.textColor, fontSize: 14,
                    fontFamily: Font.Medium,
                    marginTop: 25
                }}> How we keep your data secure</Text>


                <Pressable onPress={signIn}
                    style={styles.button}>
                    <Text style={styles.buttonText}> Sign in </Text>

                </Pressable>


                <Pressable onPress={() => Navigation.navigate('Signup')}>
                    <Text style={{
                        color: '#000000', fontSize: mdscale(16),
                        fontFamily: Font.Regular,
                        marginTop: 25
                    }}> Dont have account?


                        <Text style={{
                            color: COLORS.textColor, fontSize: mdscale(16),
                            fontFamily: Font.Medium,

                        }}> Sign up</Text>


                    </Text>
                </Pressable>
                {/***** */}

                <Text style={{
                    color: '#000000', fontSize: mdscale(10),
                    fontFamily: Font.Regular,
                    marginTop: 25
                }}> By continuing you are agree to MRC
                    <Text style={{
                        color: COLORS.textColor, fontSize: mdscale(10),
                        fontFamily: Font.Medium,
                        marginTop: 25
                    }}> Terms & Condition</Text>
                </Text>

            </View>

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

export default Login

const styles = StyleSheet.create({

    roundContainer: {
        width: '93%',
        height: '100%',
        backgroundColor: COLORS.thimColor,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignSelf: 'center',

        marginTop: 20,
        alignItems: 'center'

    },
    user_name: {
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

    password: {
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