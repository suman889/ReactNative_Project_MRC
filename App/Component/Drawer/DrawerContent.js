import { StyleSheet, Text, View, Dimensions, Pressable, StatusBar,Linking } from 'react-native';
import React from 'react';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import Navigation from '../../Service/Navigation';
const WIDTH = Dimensions.get('window').width;

{/*** vector icon */ }
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Palet from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/AntDesign';
import Profi from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { useDispatch, useSelector } from 'react-redux';
import { setuser, clearUser } from '../../Redux/Reducer/User';

import { mdscale, vrscale } from '../../PixelRatio';
import { COLORS } from '../../Constant/Colors';
import { Font } from '../../Constant/FontFamily';
import AuthService from '../../Service/AuthService';




const DrawerContent = ({ ...props }) => {
    const dispatch = useDispatch();
    const { login_status } = useSelector(state => state.User);
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar
                backgroundColor='#00a3e0'

            />
            <DrawerContentScrollView {...props}>
                {/** for header body */}
                <View style={styles.header}>
                    <Text style={{
                        color: '#ffffff', fontSize: mdscale(16),
                        fontFamily: Font.Bold
                    }}>Menu</Text>
                </View>

                {/** for list ltems */}
                <DrawerItemList {...props} />

                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Profi
                            name="user"

                            style={{ color: "#000000", fontSize: mdscale(26) }}
                        />
                    )}
                    label="My Profile"
                    onPress={() => Navigation.navigate('Profile')}

                />
                <View style={styles.bar}></View>

                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Icon
                            name="swap"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="My Transaction"
                    onPress={() => Navigation.navigate('Transaction_Index')}

                />
                <View style={styles.bar}></View>


                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Feather
                            name="phone-call"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="Contact Us"
                    onPress={() => Navigation.navigate('Contact')}

                />
                <View style={styles.bar}></View>

                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Fontisto
                            name="doctor"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="My Doctors"
                    onPress={() => Navigation.navigate('AllDoctor')}

                />

                <View style={styles.bar}></View>

                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Palet
                            name="account-star"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="My Rating"
                    onPress={() => Navigation.navigate('Rating')}

                />

                <View style={styles.bar}></View>

                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Icon
                            name="calendar"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="My Appointments"
                    onPress={() => Navigation.navigate('Appointment')}

                />

                <View style={styles.bar}></View>

                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <MaterialIcons
                            name="payment"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="Pay Now"
                    onPress={() => Navigation.navigate('Payment')}

                />
                <View style={styles.bar}></View>

                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Ionicons
                            name="ios-chatbox-ellipses-outline"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="24/7 Chat"
                    // onPress={() => Navigation.navigate('ChatList')}
                    onPress={() => Linking.openURL("https://api.WhatsApp.com/send?phone=919066990059")}
                />
                <View style={styles.bar}></View>
                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Ionicons
                            name="body"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="MRC REHAB GYM"
                    onPress={() => Navigation.navigate('WevView', { link: "https://www.easymapmaker.com/map/f5fa680d5cd01fe77faea0250ca79ad1" })}

                />
                <View style={styles.bar}></View>
                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Ionicons
                            name="body"
                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="MRC REHAB CENTERS"
                    onPress={() => Navigation.navigate('WevView', { link: "https://www.easymapmaker.com/map/8a764e1edde803cab7b7011afbc81b0f" })}

                />
                <View style={styles.bar}></View>
                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Ionicons
                            name="list"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="Disclaimer"
                    onPress={() => Navigation.navigate('WevView', { link: "http://www.myrehabcare.in/disclaimer/" })}

                />
                <View style={styles.bar}></View>
                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <Ionicons
                            name="list"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="Terms of Use"
                    onPress={() => Navigation.navigate('WevView', { link: "http://www.myrehabcare.in/terms-of-use/" })}

                />
                <View style={styles.bar}></View>
                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <MaterialIcons
                            name="privacy-tip"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="Privacy policy"
                    onPress={() => Navigation.navigate('WevView', { link: "http://www.myrehabcare.in/terms-of-use/" })}

                />
                <View style={styles.bar}></View>
                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <MaterialCommunityIcons
                            name="cash-refund"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="Cancellation and Refund Policy"
                    onPress={() => Navigation.navigate('WevView', { link: "http://www.myrehabcare.in/cancellation-and-refund-policy/" })}

                />
                <View style={styles.bar}></View>
                <DrawerItem
                    labelStyle={{ color: '#000000' }}
                    icon={() => (
                        <MaterialIcons
                            name="logout"

                            style={{ color: "#000000", fontSize: mdscale(24) }}
                        />
                    )}
                    label="Logout"
                    onPress={() => {
                        dispatch(clearUser())
                        AuthService.Logout()
                    }}

                />



                {/*** Button */}
                <Pressable onPress={() =>  Navigation.navigate('WevView', { link: "https://bit.ly/MYREHAB-STORE" })}
                    style={styles.button}>
                    <Text style={styles.buttonText}> My Rehab Store </Text>

                </Pressable>

            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    header: {
        height: mdscale(58),
        width: '100%',
        backgroundColor: COLORS.HeaderColor,
        marginTop: -5,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        widyh: 30,

        borderBottomWidth: 1,
        borderColor: '#f1f1f1'
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
        fontFamily: Font.Regular
    },
})