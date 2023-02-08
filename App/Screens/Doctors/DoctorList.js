
import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, FlatList,
    Image, Pressable
} from 'react-native';
import { COLORS } from '../../Constant/Colors';
import { mdscale } from '../../PixelRatio';
import LinearGradient from 'react-native-linear-gradient';
import { Font } from '../../Constant/FontFamily';
import Navigation from '../../Service/Navigation';
import Header from '../../Component/Global/Header';
//vectoricon
import Entypo from 'react-native-vector-icons/Entypo';







const DoctorList = () => {

    const [data, setData] = useState([

        {
            statuscode: 0,
            image: require('../../Assetes/Images/doctorcircle.jpg'),
            name: 'Dr. Achwal Suvarna',
            date: '2022-06-11  06:25 pm',
            time: '06:25 pm',
            location: 'Nagaland',

        },


    ]);


    const renderData = ({ item }) => {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#0197b0', '#69b2e4']}
                style={styles.card}>

                <View style={{
                    width: 100,
                    //backgroundColor: 'green',
                    //flex: 1
                }}>
                    <Image source={item.image}
                        style={{ width: 80, height: 80, borderRadius: 100 }}
                    />
                </View>

                <View style={{
                    marginLeft: 20,
                    flex: 1
                }}>
                    <Text style={{
                        fontsize: 14,
                        color: '#000000',

                    }}>{item.name}</Text>

                    <Text style={{
                        fontsize: 14,
                        color: '#000000',

                    }}>{item.date}</Text>

                    <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                        <Entypo name='location-pin' color={'#ffffff'}
                            size={mdscale(20)} style={{ marginLeft: -4 }}
                        />
                        <Text style={{ color: '#000000' }}>{item.location}</Text>
                    </View>


                </View>

            </LinearGradient>
        )

    }






    return (
        <View style={styles.container}>

            <Header
                name=' Doctor Booking'
            />
            <ScrollView showsVerticalScrollIndicator={false}>

                <FlatList
                    //columnWrapperStyle={{}}
                    showsVerticalScrollIndicator={false}
                    //numColumns={2}
                    data={data}
                    renderItem={renderData}
                    //console.log(renderData ))
                    keyExtractor={item => item.id}
                />


            </ScrollView>
            <Pressable
                onPress={() => Navigation.navigate('DoctorBooking')}
                style={styles.button}>
                <Text style={{
                    color: '#fff',
                    fontSize: mdscale(13), fontFamily: Font.Bold,
                    textAlign: 'center'
                }}>Make an appointment</Text>
            </Pressable>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.thimColor
    },

    card: {
        width: '93%',
        height: 130,
        // backgroundColor: '#afddf7',
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        paddingLeft: 10,
        flexDirection: 'row',


    },
    button: {
        width: '70%',
        height: mdscale(40),
        marginBottom: 20,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center',

        backgroundColor: '#ff6b00',
        position: 'absolute',
        bottom: 0
    }
});

//make this component available to the app
export default DoctorList;
