import {
    StyleSheet, Text, View, TextInput, Pressable,
    ScrollView, Dimensions, Image
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'
import { mdscale, vrscale } from '../../PixelRatio'
import { Font } from '../../Constant/FontFamily';
const { height, width } = Dimensions.get('window');

import Navigation from '../../Service/Navigation';

import Pen from 'react-native-vector-icons/MaterialCommunityIcons';

////Development Packege
import AuthService from '../../Service/AuthService';
import { useDispatch } from 'react-redux';
import { setuser } from '../../Redux/Reducer/User';
import Toast from 'react-native-simple-toast';

const Index = ({navigation}) => {
const [Profile, setProfile] = useState({})
    const [username, setUserName] = useState('')
    const [bloodgroup, setBloodgroup] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        getAccount3()
        //fetchProfile();
    }, []);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
          // Call any action
          console.log('call');
          getAccount3()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);


    const getAccount3 = async () => {
        let result = await AuthService.getAccount();
        console.log('skjlhsa', result.id);
        setProfile(result)
        fetchProfile(result.id)
    }

    const fetchProfile = async (id) => {

        let result = await AuthService.profile(id)
        if (result && result.status) {
            console.log('1res---', result);
            setUserName(result.data.name);
            setBloodgroup(result.data.blood_group);
            setCity(result.data.city);
            setEmail(result.data.email);
            setImage(result.data.image)
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#afddf7' }}>
            <Header
                name=' My Profile'
            />




            <View style={styles.roundContainer}>

                <Pressable
                    onPress={() => Navigation.navigate('EditProfile')}
                >
                    <View style={{
                        // position: 'absolute',
                        // top: 100,
                        marginTop: -50

                    }}>
                        {/* {console.log('ImgSource',image)} */}
                        <Image source={{uri:image ?"https://new.easytodb.com/Healthcare/public/Booking_pres_img/"+image:"https://cdn-icons-png.flaticon.com/512/552/552909.png"}}
                            style={{
                                width: mdscale(100),
                                height: mdscale(100),
                                borderRadius: 100,
                                resizeMode: 'cover',

                            }}
                        />
                        <Pen name='pencil-circle' color={COLORS.textColor} size={mdscale(30)}
                            style={{
                                position: 'absolute',
                                left: 80,
                                top: 70
                            }}
                        />
                    </View>
                </Pressable>
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

                        <Text style={{
                            color: '#000000',
                            fontSize: 14,
                            fontFamily: Font.Medium
                        }}>{username} </Text>

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

                        <Text style={{
                            color: '#000000',
                            fontSize: 14,
                            fontFamily: Font.Medium
                        }}>{email}</Text>

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

                        <Text style={{
                            color: '#000000',
                            fontSize: 14,
                            fontFamily: Font.Medium
                        }}>{bloodgroup}</Text>

                    </View>

                    {/** for City Group */}
                    <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontFamily: Font.Regular,
                        marginTop: mdscale(20),
                        marginLeft: mdscale(25),

                    }}>City</Text>
                    <View style={styles.inputBox}>

                        <Text style={{
                            color: '#000000',
                            fontSize: 14,
                            fontFamily: Font.Medium,

                        }}>{city}</Text>

                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Index

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

        paddingTop: 5,


    },
    inputBox: {
        //backgroundColor: '#ffffff',
        backgroundColor: COLORS.thimColor,
        width: mdscale(250),
        marginHorizontal: mdscale(25),
        marginTop: mdscale(10),

        height: vrscale(25),

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