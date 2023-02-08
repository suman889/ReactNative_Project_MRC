import {
    StyleSheet, Text, View,
    TextInput, Pressable,
    ScrollView, Dimensions, Image,Modal,ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react';

import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'
import { mdscale, vrscale } from '../../PixelRatio'
import { Font } from '../../Constant/FontFamily';
const { height, width } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//VectorIcon 
import Pen from 'react-native-vector-icons/MaterialCommunityIcons';

import ImagePicker from 'react-native-image-crop-picker';


import Navigation from '../../Service/Navigation';


////Development Packege
import AuthService from '../../Service/AuthService';

import { setuser } from '../../Redux/Reducer/User';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import HomeService from '../../Service/HomeService';

const EditProfile = () => {
    const [Loader, setLoader] = useState(false)
    const dispatch = useDispatch();
    const [Profile, setProfile] = useState({})
    const [username, setUserName] = useState('')
    const [bloodgroup, setBloodgroup] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [mobilenumber, setMobilenumber] = useState('')
    const [password, setPassword] = useState(null)

    const [imageUri, setImageUri] = useState('');


    useEffect(() => {
        getAccount()
    }, [])



    async function upLodeImage(image) {
        try {
            let result = await HomeService.UpFile(image, { type: 'prescription' });
            console.log(result);
            setImageUri(result.data);
        } catch (error) {
            console.log(error);
        }

    }
    const openGalary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 200,
            cropping: true
        }).then(image => {
            console.log('image>>>>>', image);
            upLodeImage(image)

            //props.onChange?.(image);
        });
    };

    const getAccount = async () => {
        console.log('start');
        let result = await AuthService.getAccount();
        setProfile(result)
        console.log('sss', result);
        fetchProfile(result.id)
    }

    const fetchProfile = async (id) => {
        let result = await AuthService.profile(id)
        if (result && result.status) {
            console.log('profile', result);
            setUserName(result.data.name);
            setBloodgroup(result.data.blood_group);
            setEmail(result.data.email);
            setCity(result.data.city)
            setMobilenumber(result.data.phone)
            setPassword('')
            setImageUri(result.data.image)
        }

    }


    //for update functions



    const ProfileUpdate = async () => {

        let data = {
            name: username,
            phone: mobilenumber,
            city: city,
            image: imageUri,
            email: email,
            blood_group: bloodgroup,
            password: password
        }
        // if (password == '') {
        //     Toast.show('Please Enter Your Password');
        //     return
        // }
        console.log('data---->>>>', data);
        // return false
        setLoader(true)
        let result = await AuthService.profileUpdate(data)

        console.log('result---->>>>', result)
        if (result && result.status) {
            //AuthService.profileUpdate(result.update)
            // dispatch(setuser(result.data));
            // AuthService.setAccount(result.data)
            setLoader(false)
            Toast.show('Update Successful');
            fetchProfile(Profile.id)
            // console.log(dispatch)
            Navigation.back()
        }else{
            setLoader(false)
        }


    }

    const changePhoto = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true
        }).then(image => {
            console.log(image);
            AuthService.UpFile(image, { type: 'type' })
                .then((d) => console.log('uppp', d))
                .catch(e => console.log('upppe', e))
            // setImageUri(image.path);

        });
    };


    //Main Body desigine 
    return (
        <View style={{ flex: 1, backgroundColor: '#afddf7' }}>
            <Header
                name=' Edit My Profile'
            />

            <View style={styles.roundContainer}>


                <View style={{

                    marginTop: -50

                }}>
                    <Pressable
                        onPress={() => { openGalary() }}
                    >
                        <View style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: 'red'
                        }}>
                            <Image source={{ uri: imageUri ? "http://new.easytodb.com/Healthcare/public/Booking_pres_img/" + imageUri:"https://cdn-icons-png.flaticon.com/512/552/552909.png" }}
                                style={{
                                    width: mdscale(100),
                                    height: mdscale(100),
                                    borderRadius: 100,
                                    resizeMode: 'cover',

                                }}

                            />
                        </View>


                        <Pen name='pencil-circle' color={COLORS.textColor} size={mdscale(30)}
                            style={{
                                position: 'absolute',
                                left: 80,
                                top: 70
                            }}
                        />
                    </Pressable>
                </View>


                <ScrollView keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}>

                    {/** for Nmae */}
                    <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontFamily: Font.Regular,
                        marginTop: mdscale(50),
                        marginLeft: mdscale(25),

                    }}>Name</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Enter Your City"
                            placeholderTextColor="#c1c1c1"
                            style={{
                                //fontWeight: 'bold',
                                color: "#000000",
                                width: mdscale(200),
                            }}
                            value={username}
                            onChangeText={val => setUserName(val)}
                        />

                    </View>

                    {/** for Blood Group */}
                    <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontFamily: Font.Regular,
                        marginTop: mdscale(20),
                        marginLeft: mdscale(25),

                    }}>Blood Group</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Enter Your City"
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


                    {/** for Email */}

                    <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontFamily: Font.Regular,
                        marginTop: mdscale(20),
                        marginLeft: mdscale(25),

                    }}>Email</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Enter Your City"
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

                    {/**City*/}

                    <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontFamily: Font.Regular,
                        marginTop: mdscale(20),
                        marginLeft: mdscale(25),

                    }}>City</Text>
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

                    {/**mobile number */}
                    <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontFamily: Font.Regular,
                        marginTop: mdscale(20),
                        marginLeft: mdscale(25),

                    }}>Mobile Number</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Enter Your Mobile number"
                            placeholderTextColor="#c1c1c1"
                            style={{
                                //fontWeight: 'bold',
                                color: "#000000",
                                width: mdscale(200),
                            }}
                            value={mobilenumber}
                            onChangeText={val => setMobilenumber(val)}
                        />

                    </View>

                    {/**pass word */}

                    <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontFamily: Font.Regular,
                        marginTop: mdscale(20),
                        marginLeft: mdscale(25),

                    }}>Password</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Enter Password"
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

                    {/* <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontFamily: Font.Regular,
                        marginTop: mdscale(20),
                        marginLeft: mdscale(25),

                    }}>Confirm Password</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Confirm Password" required
                            placeholderTextColor="#c1c1c1"
                            style={{
                                //fontWeight: 'bold',
                                color: "#000000",
                                width: mdscale(200),
                            }}
                        />

                    </View> */}

                    <Pressable
                        onPress={ProfileUpdate}
                        style={styles.button}>
                        <Text style={styles.buttonText}> Update </Text>

                    </Pressable>

                </ScrollView>

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={Loader}
                onRequestClose={() => {
                }}
                statusBarTranslucent={true}
                style={{
                    flex: 1
                }}
            >
                <View style={{
                    position: "absolute",
                    width: windowWidth,
                    backgroundColor: "#000000ab",
                    height: windowHeight,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <ActivityIndicator size='large' color={'#c0c0c0'} />
                </View>
            </Modal>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    roundContainer: {
        width: '93%',
        height: height - 210,
        backgroundColor: COLORS.thimColor,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginTop: 20,
        // alignItems: 'center',
        paddingTop: 5,


    },

    viewBox: {
        //backgroundColor: '#ffffff',
        backgroundColor: COLORS.thimColor,
        width: mdscale(250),
        marginHorizontal: mdscale(25),
        marginTop: mdscale(10),

        height: vrscale(25),

        borderBottomWidth: 1.5,
        borderColor: '#a2a2a2'
    },
    inputBox: {
        backgroundColor: COLORS.thimColor,
        width: mdscale(250),
        marginHorizontal: mdscale(25),
        //marginTop: mdscale(20),
        borderRadius: 5,
        height: vrscale(45),
        //elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: mdscale(15),
        //borderWidth: 1,
        borderBottomWidth: 1.5,
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

        marginTop: vrscale(20),
        marginBottom: 25

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