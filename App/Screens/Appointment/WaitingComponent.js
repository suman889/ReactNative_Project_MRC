//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { moderateScale } from '../../PixelRatio';

// create a component
const WaitingComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.TextStyle}>Appoinments not found</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    TextStyle: {
        color: '#1d8cce',
        fontSize: 16,
        fontFamily: 'SourceSerifPro-Regular',
    }
});

//make this component available to the app
export default WaitingComponent;
