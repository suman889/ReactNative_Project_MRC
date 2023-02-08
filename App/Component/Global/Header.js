import { StyleSheet, Text, View, Dimensions, Platform, } from 'react-native'
import React, { useState } from 'react'

import { vrscale, mdscale } from '../../PixelRatio';
const WIDTH = Dimensions.get('window').width;

import { COLORS } from '../../Constant/Colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Navigation from '../../Service/Navigation';
const Header = (props) => {
    return (
        <View style={styles.header}>
            <Feather
                onPress={() => props.back == false ? Navigation.openDrawer() : Navigation.back()}
                name={props.back == false ? "menu" : 'chevron-left'}
                size={mdscale(26)}
                color={'#ffffff'}

            />

            <View style={{
                //backgroundColor: 'red',
                //width: '50%',
                justifyContent: 'center',
                alignItems: 'center',

                marginRight: mdscale(25),
                flex: 1
            }}>
                <Text
                    style={{
                        color: '#FFFFFF', fontFamily: 'Poppins-Medium',
                        fontSize: mdscale(16),
                        //textAlign: 'center'

                    }}
                >{props.name}</Text>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.HeaderColor,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        height: 60,
        width: '100%',

        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18
    },
})