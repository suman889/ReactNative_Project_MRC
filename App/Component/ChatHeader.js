//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'native-base';
import { COLORS } from '../Constant/Colors';
import { moderateScale, verticalScale } from '../PixelRatio';
import { Font } from '../Constant/FontFamily';
import Navigation from '../Service/Navigation';


// create a component
const ChatHeader = (props) => {
    const { name,image } = props;
    console.log('props.data',props.data)
    return (
        <View style={styles.container}>
            <View style={styles.headerMain}>
                <View style={styles.subView}>
                    {/* <Icon
                        name="arrow-back"
                        type="Ionicons"
                        style={{ color: COLORS.white }}
                        onPress={()=>Navigation.back()}
                    /> */}
                    <Image source={{uri:image}}
                        style={{ 
                            borderRadius: 40,
                            height:40,
                            width:40 ,
                            resizeMode:'cover'
                        }}
                    />
                    {/* <View style={styles.Img}>
                        <Image source={require('../../Assets/mConnect/circle.png')} />
                    </View> */}
                    <View style={{marginLeft:moderateScale(10)}}>
                        <Text style={styles.Name}>{name}</Text>
                        <Text style={styles.activeText}>Active Now</Text>
                    </View>
                </View>
                <View style={styles.subViewAnother}>

                    <TouchableOpacity
                        onPress = {() => Navigation.navigate('Calling', { remoteUserData: props.data, type: 'Outgoing' })}
                    >
                    <Image source={require('../Assetes/Chat/call.png')}
                        style={{ borderRadius: 10, height: verticalScale(14), width: moderateScale(14), resizeMode: 'contain' }}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Navigation.navigate('VideoCall',{ remoteUserData: props.data, type: 'Outgoing' })}
                    >
                        <Image source={require('../Assetes/Chat/vidcall.png')}
                            style={{ borderRadius: 10, height: verticalScale(18), width: moderateScale(18), resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                    {/* <Image source={require('../../Assetes/Chat/info.png')}
                        style={{ borderRadius: 10, height: verticalScale(15), width: moderateScale(15), resizeMode: 'contain' }}
                    /> */}

                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: COLORS.HeaderColor,
        height: verticalScale(60)
    },
    activeText: {
        color: COLORS.white,
        fontFamily: Font.Regular,
        fontSize: moderateScale(10),
        opacity: 0.8
    },
    Img:
    {
        position: 'absolute',
        top: moderateScale(35),
        left: moderateScale(68)
    },
    Name: {
        color: COLORS.white,
        fontFamily: Font.Medium
    },
    headerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subView: {
        height: verticalScale(60),
        width: '50%',
        // justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft:moderateScale(10)
    },
    subViewAnother: {
        height: verticalScale(60),
        width: '30%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

//make this component available to the app
export default ChatHeader;
