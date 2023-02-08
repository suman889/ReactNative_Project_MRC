import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React from 'react'
import Navigation from '../Service/Navigation'

const Card = ({ maindata }) => {

    const CardRender = ({ item, index }) => {
        // console.log(item);
        // "id": 3, "price": "500"
        return (

            <Pressable
                onPress={() => {
                    // if () {
                    //      Navigation.navigate('DoctorBooking',{cat_id:1,servicesId:item.id,price:item.price})
                    // } else {

                    // }
                    Navigation.navigate('DoctorBooking', { cat_id: 1, servicesId: item.id, price: item.price })
                }}
                style={[styles.card, {
                    //backgroundColor: item.color,
                    backgroundColor: '#356bbe'
                }]}>


                <Text
                    style={{
                        fontSize: 11, color: '#ffffff',
                        marginTop: 10, fontFamily: "Poppins-SemiBold"
                    }}
                >{item.type}</Text>

            </Pressable>

        )
    }
    return (
        <>
            <View style={{
                width: '100%',
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-around"
            }} >
                <Pressable
                    onPress={() => {
                        // Navigation.navigate('DoctorBooking', { cat_id: 1, servicesId: 1})
                        Navigation.navigate('HomeCatagory', { servicesId: 1 ,Tittle:'24 x 7 online Consultaion'})
                    }}
                    style={[styles.card, {
                        //backgroundColor: item.color,
                        backgroundColor: '#777cfa'
                    }]}>

                    <Text
                        style={{
                            fontSize: 14, color: '#ffffff',
                            fontFamily: "Poppins-SemiBold",

                        }}
                    >24 x 7 Online {'\n'} Consultation</Text>

                </Pressable>
                <Pressable
                    onPress={() => {
                        Navigation.navigate('Pathology')
                    }}
                    style={[styles.card, {
                        //backgroundColor: item.color,
                        backgroundColor: '#e95624'
                    }]}>

                    <Text
                        style={{
                            fontSize: 14, color: '#ffffff',
                            fontFamily: "Poppins-SemiBold"
                        }}
                    >Pathology</Text>

                </Pressable>
                <Pressable
                    onPress={() => {
                        Navigation.navigate('HomeCatagory', { servicesId: 2,})
                    }}
                    style={[styles.card, {
                        //backgroundColor: item.color,
                        backgroundColor: '#8bd37f'
                    }]}>

                    <Text
                        style={{
                            fontSize: 14, color: '#ffffff',
                            fontFamily: "Poppins-SemiBold"
                        }}
                    >Home Visit</Text>

                </Pressable>
                <Pressable

                    onPress={() => Navigation.navigate('WevView', { link: "https://doctorc.co.in/scans/?utm_source=adwords&utm_medium=cpc&utm_content=DoctorC&utm_campaign=DoctorC&creative=539426494235&keyword=doctor%20c&adgroupid=125364938585&campaignid=1636083052&matchtype=e&gclid=Cj0KCQiA3rKQBhCNARIsACUEW_Z9on2b8pKwAENMd1tbYaGpgpskZEOk_DlUlhPUQVuDX3_61UbSJt8aAmQlEALw_wcB#/" })}

                    style={[styles.card, {
                        //backgroundColor: item.color,
                        backgroundColor: '#e1af18'
                    }]}>

                    <Text
                        style={{
                            fontSize: 14, color: '#ffffff',
                            fontFamily: "Poppins-SemiBold"
                        }}
                    >Radiology</Text>

                </Pressable>
                <Pressable
                    onPress={() => {
                        Navigation.navigate('HomeCatagory', { servicesId: 3,Tittle:'Clinic Visit Consultation'})
                      
                    }}
                    style={[styles.card, {
                        //backgroundColor: item.color,
                        backgroundColor: '#d3a67d'
                    }]}>

                    <Text
                        style={{
                            fontSize: 14, color: '#ffffff',
                            fontFamily: "Poppins-SemiBold"
                        }}
                    >Clinic Visit</Text>

                </Pressable>
                <Pressable
                    onPress={() => {
                        Navigation.navigate("Medicen_booking")
                    }}
                    style={[styles.card, {
                        //backgroundColor: item.color,
                        backgroundColor: '#159387'
                    }]}>

                    <Text
                        style={{
                            fontSize: 14, color: '#ffffff',
                            fontFamily: "Poppins-SemiBold"
                        }}
                    >Pharmacy</Text>

                </Pressable>
            </View>

        </>
    )
}




const styles = StyleSheet.create({
    card: {
        width: '45%',
        height: 52,
        borderRadius: 20,
        // backgroundColor: {color},
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        marginVertical: 3,

    },
})

export default Card;