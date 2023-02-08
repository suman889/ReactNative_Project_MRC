import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../Constant/Colors';
import { mdscale } from '../../PixelRatio';
import { Font } from '../../Constant/FontFamily';
import Header from '../../Component/Global/Header';

const Pharmacy = () => {


    const [pharmasy, setPharmasy] = useState([
        {
            name: 'Applo Store',
            pnone: 9378230772,
            address: 'kolkata',
            deliverytype: 'Pickup',
            payment: 'Cash',
            status: 'ACCEPTED'
        },
        {
            name: 'Flipkart Store',
            pnone: 9378230772,
            address: 'kolkata',
            deliverytype: 'Pickup',
            payment: 'Online',
            status: 'ACCEPTED'
        },
        {
            name: 'Frankrose Store',
            pnone: 9378230772,
            address: 'kolkata',
            deliverytype: 'Pickup',
            payment: 'Cash',
            status: 'ACCEPTED'
        },
        {
            name: 'Helth Store',
            pnone: 9378230772,
            address: 'kolkata',
            deliverytype: 'Pickup',
            payment: 'Cash',
            status: 'ACCEPTED'
        },
        {
            name: 'Helth Store',
            pnone: 9378230772,
            address: 'kolkata',
            deliverytype: 'Pickup',
            payment: 'Cash',
            status: 'ACCEPTED'
        },
        {
            name: 'Helth Store',
            pnone: 9378230772,
            address: 'kolkata',
            deliverytype: 'Pickup',
            payment: 'Cash',
            status: 'ACCEPTED'
        },
    ]);

    const renderPharmesy = ({ item }) => {
        return (


            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#36d1dc', '#5b86e5']}

                style={styles.cardT}>
                <Text style={{
                    color: "#ffffff",
                    fontSize: mdscale(16), fontFamily: Font.Bold
                }}>{item.name}</Text>

                <Text style={{
                    color: "#000000",
                    fontSize: mdscale(15), fontFamily: Font.Regular
                }}>Phone Np : {item.pnone}</Text>


                <Text style={{
                    color: "#000000",
                    fontSize: mdscale(15), fontFamily: Font.Regular
                }}>Address : {item.address}</Text>

                <Text style={{
                    color: "#000000",
                    fontSize: mdscale(15), fontFamily: Font.Regular
                }}>Delivery Type : {item.deliverytype}</Text>

                <Text style={{
                    color: "#000000",
                    fontSize: mdscale(15), fontFamily: Font.Regular
                }}>Payment Type : {item.payment}</Text>

                <Text style={{
                    color: "#aa076b",
                    fontSize: mdscale(15), fontFamily: Font.Bold
                }}>{item.status}</Text>

            </LinearGradient>

        );
    };
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            {/* <Header
                name='Pharmacy'
            /> */}

            <FlatList
                //columnWrapperStyle={{}}
                showsVerticalScrollIndicator={false}
                //numColumns={2}
                data={pharmasy}
                renderItem={renderPharmesy}
                //console.log(renderData ))
                keyExtractor={item => item.id}
            />

        </View>
    )
}

export default Pharmacy

const styles = StyleSheet.create({
    cardT: {
        width: '85%',
        paddingVertical: 10,
        paddingLeft: 15,
        //height: 130,
        // backgroundColor: '#afddf7',
        marginTop: 20,
        alignSelf: 'center',
        // justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: 13,

        // flexDirection: 'row'

    },
})