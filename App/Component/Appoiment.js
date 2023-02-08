//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Pressable, Dimensions, Image, RefreshControl, ScrollView } from 'react-native';
// import { mdscale } from '../../PixelRatio';
import { vrscale, mdscale } from '../PixelRatio';
// import AppoinmentSingle from '../../Screen/Appointments/AppoinmentSingle';
// import Auth from '../../Service/Auth';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import HomeService from '../Service/HomeService';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get('window').height;
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import Navigation from '../Service/Navigation';
import Toast from 'react-native-simple-toast';
// create a component
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Appoiment = ({ navigation, visit_type }) => {
    const { userData } = useSelector(state => state.User);
    const [refreshing, setRefreshing] = React.useState(false);
    // console.log("userData", userData);
    const [pharmasy, setPharmasy] = useState([])
    const [ImageUrl, setImageUrl] = useState('')

    const renderPharmesy = ({ item }) => {
        console.log('item...--->>', item);
        return (
            <>
                {visit_type == '5' ? <>
                    <Pressable onPress={() =>
                        item.user_status == null ?
                            // Toast.show('Your Request Not Accept Yet', Toast.SHORT)
                            Navigation.navigate('ViewPharmacy', { item: item })
                            :
                            item.user_status == "APPROOVE" ?
                                Toast.show('Your Payment Completed', Toast.SHORT)
                                :
                                // item.user_status != null ?
                                Navigation.navigate('ViewPharmacy', { item: item })
                    }>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#36d1dc', '#5b86e5']}

                            style={styles.cardT}>
                            <Text style={{
                                color: "#ffffff",
                                fontSize: mdscale(16),
                            }}>patient name : {item.name}</Text>

                            <Text style={{
                                color: "#000000",
                                fontSize: mdscale(15),
                            }}>invoice no : {item.order_id} </Text>
                            <Text style={{
                                color: "#000000",
                                fontSize: mdscale(15),
                            }}>patient age : {item.age}</Text>
                            <Text style={{
                                color: "#000000",
                                fontSize: mdscale(15),
                            }}>patient gender : {item.gender == null ? '_' : item.gender}</Text>
                            <Text style={{
                                color: "#000000",
                                fontSize: mdscale(15),
                            }}> address : {item.address}</Text>
                            <Text style={{
                                color: "#000000",
                                fontSize: mdscale(15),
                            }}> delivery type : {item.delivery_type}</Text>
                            {item.delivery_type != 'Pickup' ?

                                <Text style={{
                                    color: "#000000",
                                    fontSize: mdscale(15),
                                }}>delivery charge : ₹ {item.delivery_charge}</Text> : null}

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    color: "#000000",
                                    fontSize: mdscale(15),
                                }}>prescription : </Text>
                                <Text
                                    onPress={() => {
                                        setImageUrl(item.pesc_img)
                                        toggleModal()
                                    }}
                                    style={{
                                        backgroundColor: "#fff",
                                        color: "#000",
                                        fontSize: mdscale(16),
                                        fontWeight: "600",
                                        paddingHorizontal: 18,
                                        paddingVertical: 3,
                                        borderRadius: 15,
                                    }}>View</Text>
                            </View>
                            {item.user_status ?
                                <Text style={{
                                    color: "#000000",
                                    fontSize: mdscale(15),
                                }}>Status : {item.user_status}</Text> : null}
                        </LinearGradient>
                    </Pressable>
                </> :
                    <Pressable
                        onPress={() => item.status == 'Confirm' ? Navigation.navigate("Doctor", { doctorData: item, visit_type: visit_type }) : ""}
                        style={styles.CardStyle}
                    // onPress={() => { Navigation.navigate('AppoinmentSingle', { data: item }) }}
                    >
                        <View style={{
                            ...styles.imgStyle, backgroundColor: "#fff"
                        }}>
                            <Image
                                source={require('../Assetes/logo.png')}
                                style={styles.imgStyle}
                            />

                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={[styles.boldText]}> {item.patient_name} </Text>
                            <Text style={styles.TextStyle2}>{item.schedule_date}</Text>
                            {/* <Text style={styles.TextStyle2}>{item.schedule_date == null ? '_' :moment(item.schedule_date ).format('MMMM Do YYYY, h:mm:ss a') }</Text> */}
                            <Text style={[styles.boldText2, { color: item.status == 'Confirm' ? 'green' : 'red' }]}>{item.status == 'Booking' ? 'Pending' : item.status}</Text>
                        </View>
                    </Pressable>}
            </>
        );
    };

    async function getAllData() {
        let res = await HomeService.appoinment({
            "user_id": userData.id,
            "visit_type": visit_type
        })
        // let res = await HomeService.appoinment({
        //     "doctor_id": "195",
        //     "visit_type": visit_type
        // })
        // console.log('this is --->',{
        //     "user_id": userData.id,
        //     "visit_type": visit_type
        // });
        if (res.status == true) {
            setPharmasy(res.data)
            console.log('res', res.data);
        }
    }
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            // console.log('CALLL33');
            getAllData()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    // console.log('navigation00', navigation);
    const onRefresh = React.useCallback(() => {
        getAllData()
        console.log('CALLL');
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         // The screen is focused
    //         // Call any action
    //         getAllData()
    //         console.log('call now');
    //     });
    //     // Return the function to unsubscribe from the event so it gets removed on unmount
    //     return unsubscribe;
    // }, [navigation])

    useEffect(() => {
        getAllData()
    }, [])
    return (
        <View style={styles.container}>
            {/* <Text style={styles.TextStyle}>Appoinments not found</Text> */}
            {/* <AppoinmentSingle /> */}
            {pharmasy.length == 0 ?
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {pharmasy.length == 0 ? <View style={{
                        width: '100%',
                        height: 200
                    }}>
                        <Text style={styles.TextStyle}>Appoinments not found</Text>
                    </View> : <></>}
                </ScrollView> : null}

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
                //columnWrapperStyle={{}}
                showsVerticalScrollIndicator={false}
                //numColumns={2}
                data={pharmasy}
                renderItem={renderPharmesy}
                //console.log(renderData ))
                keyExtractor={item => item.id}
            />

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                animationIn={'slideInUp'}
                backdropColor="black"
                hasBackdrop={true}
                deviceWidth={deviceWidth}
                deviceHeight={deviceHeight}
                style={{ marginHorizontal: 0, marginVertical: 0 }}>
                <View style={{
                    width: '90%',
                    height: 300,
                    backgroundColor: "#fff",
                    alignSelf: "center"
                }}>
                    <Image style={{ width: "100%", height: 300 }} source={{ uri: "https://new.easytodb.com/Healthcare/public/Booking_pres_img/" + ImageUrl }} />
                </View>
            </Modal>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

        // backgroundColor: '#2c3e50',
    },
    TextStyle: {
        textAlign: "center",
        color: '#1d8cce',
        fontSize: 18,
        fontFamily: 'SourceSerifPro-Regular',
    },
    cardT: {
        width: '85%',
        paddingVertical: 10,
        paddingLeft: 15,
        // height: 180,
        // backgroundColor: '#afddf7',
        marginTop: 10,
        alignSelf: 'center',
        // justifyContent: 'center',
        //alignItems: 'center',
        borderRadius: 13,

        // flexDirection: 'row'

    },
    TextStyle2: {
        // color: '#1d8cce',
        fontSize: 15,
        fontFamily: 'SourceSerifPro-Regular',
        color: '#777',

    },
    CardStyle: {
        marginHorizontal: 18,
        // height: 100,
        padding: 10,
        backgroundColor: '#daf3fa',
        marginVertical: 5,
        flexDirection: 'row',
        elevation: 4,
        borderRadius: 10,
        alignItems: "center"
    },
    imgStyle: {
        height: 90,
        width: 90,
        resizeMode: 'contain',
        borderRadius: 30
    },
    boldText: {
        color: '#1d8cce',
        fontSize: 17,
        fontFamily: 'Roboto-Bold',
        // color: '#777',

    },
    boldText2: {
        color: '#1d8cce',
        fontSize: 17,
        fontFamily: 'Roboto-Regular',
        // color: '#777',

    }
});

//make this component available to the app
export default Appoiment;



{/* <LinearGradient
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
    colors={['#36d1dc', '#5b86e5']}

    style={styles.cardT}>
    <Text style={{
        color: "#ffffff",
        fontSize: mdscale(16),
    }}>patient name : {item.patient_name}</Text>

    <Text style={{
        color: "#000000",
        fontSize: mdscale(15),
    }}>invoice no : {item.invoice_no} </Text>


    <Text style={{
        color: "#000000",
        fontSize: mdscale(15),
    }}>patient age : {item.patient_age}</Text>

    <Text style={{
        color: "#000000",
        fontSize: mdscale(15),
    }}>patient gender : {item.patient_gender == null ? '_' : item.patient_gender}</Text>

    <Text style={{
        color: "#000000",
        fontSize: mdscale(15),
    }}>fees : {item.fees}</Text>

    <Text style={{
        color: "#aa076b",
        fontSize: mdscale(15),
    }}>schedule date : {item.schedule_date == null ? '_' : item.schedule_date.slice(0, 10)}</Text>
    <View style={{
        flexDirection: "row",
        alignItems: "center"
    }}>
        <Text style={{
            color: "#000000",
            fontSize: mdscale(15),
        }}>prescription : </Text>
        <Text
            onPress={() => {
                setImageUrl(item.upload_prescription)
                toggleModal()
            }}
            style={{
                backgroundColor: "#fff",
                color: "#000",
                fontSize: mdscale(16),
                fontWeight: "600",
                paddingHorizontal: 18,
                paddingVertical: 3,
                borderRadius: 15,
            }}>View</Text>
    </View>

</LinearGradient> */}