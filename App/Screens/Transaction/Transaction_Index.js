import {
    StyleSheet, Text, View, FlatList,
    ScrollView, Dimensions
} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'
import { mdscale, vrscale } from '../../PixelRatio';

import { Picker } from '@react-native-picker/picker';
import { Font } from '../../Constant/FontFamily';
import { useEffect } from 'react';
import HomeService from '../../Service/HomeService';
const { height, width } = Dimensions.get('window');

const Transaction_Index = () => {



    const [transaction, setTransaction] = useState([

        {
            name: 'Dr Devi Shetty',
            date: ' 24 Dec 2023',
            price: '₹ 1000'
        },
        {
            name: 'Dr Devi Shetty',
            date: ' 20 Dec 2023',
            price: '₹ 1000'
        },
        {
            name: 'Dr Devi Shetty',
            date: ' 24 jan 2022',
            price: '₹ 900'
        },
        {
            name: 'Dr Devi Shetty',
            date: ' 24 Dec 2023',
            price: '₹ 1000'
        },
        {
            name: 'Dr Devi Shetty',
            date: ' 24 Feb 2025',
            price: '₹ 1500'
        },

        {
            name: 'Dr Roy Shetty',
            date: ' 24 Feb 2025',
            price: '₹ 1500'
        },
    ]);
async function getData() {
    let res = await HomeService.payment({
        "user_id": 2,
    })
    console.log('ttt',res);
    if (res.status == true) {
        setTransaction(res.data)
    }
}
    useEffect(() => {
        getData()
    }, [])

    const renderData = ({ item }) => {
        return (
            <View style={{
                width: '80%',
                height: mdscale(70),
                // backgroundColor: 'red',
                alignSelf: 'center',
                marginTop: 5
            }}>

                {/* <Text style={{
                    color: "#000000",
                    fontSize: mdscale(14)
                }}>{item.date}</Text> */}

                {/**iner Card */}
                <View style={{
                    width: '90%',
                    height: 50,
                    backgroundColor: '#93c9d8',
                    alignSelf: 'center',
                    borderRadius: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    borderColor: '#EDEDED',
                    elevation: 1.5

                }}>
                    <Text style={{
                        color: '#0451b7',
                        fontFamily: Font.Medium,
                        fontSize: 14
                    }}>{item.patient_name}</Text>
                    <Text style={{
                        color: '#000000',
                        fontFamily: Font.Medium,
                        fontSize: 14,
                        marginLeft: 20
                    }}>{item.fees}</Text>

                </View>
            </View>
        );
    };


    /////////////
    const DropwownMenu = () => {
        const [filter, setFilter] = useState();
        return (

            <Picker
                style={{
                    width: '100%',
                    color: "#000000",
                }}
                selectedValue={filter}
                onValueChange={(itemValue, itemIndex) =>
                    setFilter(itemValue)
                }>

                <Picker.Item label="Filter" value="Filter"
                    style={{ fontFamily: 'Poppins-Regular', }} />
                <Picker.Item label="Resent" value="res" />
                <Picker.Item label="January" value="jan" />
                <Picker.Item label="February" value="feb" />
                <Picker.Item label="March" value="mar" />

            </Picker>

        );

    }









    return (
        <View style={{ flex: 1, backgroundColor: '#afddf7' }}>
            <Header
                name='Transaction'
            />

            {/**Picker filter */}

            {/* <View style={styles.pickerBox}>
                <DropwownMenu />
            </View> */}

            <View style={styles.roundContainer}>

                <FlatList
                    //columnWrapperStyle={{}}
                    showsVerticalScrollIndicator={false}
                    //numColumns={2}
                    data={transaction}
                    renderItem={renderData}
                    //console.log(renderData ))
                    keyExtractor={item => item.id}
                />

            </View>

        </View>
    )
}

export default Transaction_Index

const styles = StyleSheet.create({
    pickerBox: {
        width: mdscale(140),
        height: mdscale(40),
        //backgroundColor: 'green',
        borderBottomWidth: 1,
        borderColor: '#000000',
        marginTop: 20,
        alignSelf: 'flex-end',
        marginRight: mdscale(30)
    },

    roundContainer: {
        width: '93%',
        height: height - 200,
        backgroundColor: COLORS.thimColor,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        //marginTop: 20,
        // alignItems: 'center',
        paddingTop: 5,


    },
})