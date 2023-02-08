import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import LottieView from 'lottie-react-native';
import { COLORS } from '../../Constant/Colors';

const Support = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            {/* 
            <View style={{ width: 300, height: '50%' }}>
                <LottieView
                    source={require('../../Assetes/Images/31021-247-support.json')}

                    autoPlay loop />
            </View> */}

            <Image source={require('../../Assetes/Images/247support.gif')}
                style={{ height: 200, width: '100%' }}
            />

        </View>
    )
}

export default Support

const styles = StyleSheet.create({})