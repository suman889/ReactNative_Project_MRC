import {
    StyleSheet, Text, View, StatusBar, Image, Pressable,
    Platform, PermissionsAndroid, ToastAndroid, Modal,ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react';
import Header from '../../Component/Global/Header';
import { COLORS } from '../../Constant/Colors';
import { vrscale, mdscale } from '../../PixelRatio';
import Geocoder from 'react-native-geocoding';
import Swiper from 'react-native-swiper';
import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
import Card from '../../Component/Card';
{/**** VEctor Icon */ }
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Pen from 'react-native-vector-icons/MaterialCommunityIcons';
import { Font } from '../../Constant/FontFamily';
import Navigation from '../../Service/Navigation';
// import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';



//Development Packege
import HomeService from '../../Service/HomeService';
import CatagoryCard from '../../Component/Global/CatagoryCard';
import GoogleMap from './GoogleMap';
import SimpleToast from 'react-native-simple-toast';



const Index = () => {
    const [Address, setAddress] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [cdata, setcData] = useState([]);

    const [ShowSearchModal, setShowSearchModal] = useState(false)
    async function sendLocation() {
        //   let location =await Geolocation.getCurrentPosition();
        let location;
        Geolocation.getCurrentPosition(info => {
            console.log('data', info);

            Geocoder.from({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })
                .then(a => {
                    // console.log('aaa', JSON.stringify(a))
                    console.log('aaa', a.results[0].formatted_address)
                    setAddress(a.results[0].formatted_address)
                })
        });
    }

    useEffect(() => {
        fetchCatagory()
        sendLocation()
    }, [])

    const fetchCatagory = async () => {
        console.log('call');
        let result = await HomeService.getCatagory();
        if (result && result.status) {
            console.log('result00000', result)
            setImgUrl(result.img_path)
            setcData(result.data)

        }
    };



    {/*** For Location Data  */ }


    const hasPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }
        check(PERMISSIONS.IOS.LOCATION_ALWAYS)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                // …
            });
        if (status === PermissionsAndroid.RESULTS.DENIED) {
            SimpleToast.show(
                'Location permission denied by user.',
                SimpleToast.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            SimpleToast.show(
                'Location permission revoked by user.',
                SimpleToast.LONG,
            );
        }

        return false;
    };


    // Function Get The user Location
    const getLocation = async () => {

        const locationPermissions = await hasPermission();
        if (!locationPermissions) return;
        Geolocation.getCurrentPosition(position => {
            setPosition(position)
            //console.warn(position)
        }, error => {
            setPosition(null)
            console.log(error)
        },
            {
                accuracy: {
                    android: 'high',
                },
                enableHighAccuracy: true,
                //timeout: 15000,
                // maximumAge: 10000
            }
        )

    }


    // const getAddress = async (lat, lng) => {

    //     await Geocoder.fallbackToGoogle(MY_KEY);
    //     let ret = await Geocoder.geocodePosition({ lat, lng })
    //     let addr = (res[0].formattedAddress)

    //     this.setState({
    //         currentAddress: addr
    //     })
    // }
    useEffect(() => {
        getLocation();
    })







    const [position, setPosition] = useState(null)
    const [data, setData] = useState([])



    useEffect(() => {
        fetchLookingData()
    }, [])

    const fetchLookingData = async () => {

        let result = await HomeService.getLookingFor()
        console.log('result --> ', result);
        if (result && result.status) {
            setData(result.data)
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={ShowSearchModal}
                statusBarTranslucent={false}
                onRequestClose={() => {
                    setShowSearchModal(!ShowSearchModal);
                }}
            >
                <GoogleMap onClose={() => setShowSearchModal(false)} changeAddress={(a) => setAddress(a)} />
            </Modal>
            <StatusBar
                backgroundColor='#00a3e0'
            />
            <Header
                Home
                back={false}
                name='Home'
            />

            <ScrollView>


                {/****** Geo Location */}
                <View style={styles.locationBox}>


                    <EvilIcons name='location' color={COLORS.HeaderColor}
                        size={mdscale(26)}
                        style={{}}
                    />
                    {/** for text */}
                    <View style={{
                        backgroundColor: "#ffffff",
                        width: '75%',
                        marginLeft: 20
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: COLORS.HeaderColor,
                            fontFamily: Font.Regular
                        }}>
                            {Address}
                        </Text>
                    </View>

                    <Pressable onPress={() => setShowSearchModal(!ShowSearchModal)}>
                        <Pen name='pencil-circle' size={mdscale(26)}
                            color={COLORS.HeaderColor} />
                    </Pressable>

                </View>

                <Text style={{
                    color: COLORS.textColor,
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: mdscale(20),
                    marginLeft: mdscale(20),
                    fontFamily: Font.Bold

                }}> Offers for you</Text>


                {/*** Slider Add */}

                <View style={styles.sliderBox}>

                    <Swiper
                        dotStyle={{
                            backgroundColor: '#BEBEBE',
                            height: mdscale(6),
                            width: mdscale(6),
                            borderRadius: mdscale(3),
                            marginHorizontal: mdscale(2),
                        }}
                        showsPagination={true}
                        loop={true}
                        removeClippedSubviews={false}
                        autoplay={true}
                        // autoplayTimeout={2}
                        style={styles.wrapper}
                    >

                        <View style={styles.slide1}>
                            <Image source={require('../../Assetes/Images/banner1.jpg')} style={styles.sliderImg} />
                        </View>
                        <View style={styles.slide2}>
                            <Image source={require('../../Assetes/Images/banner2.jpg')} style={styles.sliderImg} />
                        </View>
                        <View style={styles.slide3}>
                            <Image source={require('../../Assetes/Images/banner1.jpg')} style={styles.sliderImg} />
                        </View>
                    </Swiper>



                </View>



                {/***** Home Care Catagory */}

                <View style={{
                    marginTop: 20, flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',

                    alignSelf: 'center'
                }}>
                    <Text style={{
                        color: COLORS.textColor,
                        fontFamily: Font.Bold, fontSize: 15,
                        fontWeight: 'bold'

                    }}>Near You </Text>
                    {/* <Pressable onPress={() => Navigation.navigate('HomeCatagory', { servicesId: 2, })}>
                        <Text style={{
                            color: COLORS.textColor,
                            fontFamily: Font.Regular,
                        }}>View all  </Text>
                    </Pressable> */}

                </View>


                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{
                    // width: '100%',
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginTop: 10,
                }}>

                    {/* <CatagoryCard
                        passData={cdata.slice(0,3)}
                        url={imgUrl}
                    /> */}
                    {/* <Pressable onPress={() => Navigation.navigate('DoctorBooking', { cat_id: 1, servicesId: 2, price: 100 })}>

                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#43cea2', '#46b1ce']}

                            style={styles.smallBox}>
                            <Image source={require('../../Assetes/Images/doctor.png')}
                                style={{ height: 35, width: 35, borderRadius: 100 }}
                            />
                            <Text style={{ color: '#ffffff', fontSize: 12 }}> Doctor</Text>

                        </LinearGradient>
                    </Pressable> */}

                    <Pressable 
                       onPress={() => Navigation.navigate('WevView', { link: "https://www.easymapmaker.com/map/b91174b54708e63210a72d612ee2fa0a" })}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#43cea2', '#46b1ce']}

                            style={styles.smallBox}>
                            <Image source={require('../../Assetes/Images/bag.jpg')}
                                style={{ height: 35, width: 35, borderRadius: 100 }}
                            />
                            <Text style={{ color: '#ffffff', fontSize: 12 }}> Ambulance</Text>

                        </LinearGradient>
                    </Pressable>

                    <Pressable onPress={() => Navigation.navigate('DoctorBooking', { cat_id: 1, servicesId: 23, price: 100 })} style={styles.smallBox}>
                        <Image source={require('../../Assetes/Images/bag.jpg')}
                            style={{ height: 35, width: 35, borderRadius: 100, }}
                        />
                        <Text style={{ color: '#ffffff', fontSize: 12 }}> Nurses</Text>

                    </Pressable>
             
                    <Pressable 
                      onPress={() => Navigation.navigate('WevView', { link: "https://www.easymapmaker.com/map/042627ae52b8232d63e219a443687d1a" })}
                     style={styles.smallBox}>
                        <Image source={require('../../Assetes/Images/bag.jpg')}
                            style={{ height: 30, width: 30, borderRadius: 100, }}
                        />
                        <Text style={{ color: '#ffffff', fontSize: 12,textAlign:"center" }}> Blood Donors </Text>

                    </Pressable>
                </ScrollView>

                <Text style={{
                    color: COLORS.textColor,
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: mdscale(10),
                    fontFamily: Font.Bold,
                    width: '90%',
                    alignSelf: 'center',

                }}>You are looking for</Text>

                <View style={{
                    marginTop: 10,
                    width: '100%',
                    alignSelf: 'center',
                    marginBottom: 10
                }}>


                    <Card
                        maindata={data}

                    />

                </View>
            </ScrollView>

        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    locationBox: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '90%',
        paddingVertical: 10,
        alignSelf: 'center',
        marginTop: vrscale(20),
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: '#ededed',
        borderWidth: 0.6,
        elevation: 2
    },

    sliderBox: {
        backgroundColor: '#EDEDED',
        marginTop: 10,
        borderRadius: 10,
        width: '90%', height: vrscale(160),
        alignSelf: 'center'
    },
    smallBox: {
        width: 100,
        height: 70,
        backgroundColor: COLORS.HeaderColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:10
    },

    card: {
        width: '45%',
        borderRadius: 10,
        // backgroundColor: {color},
        alignItems: 'center',
        marginHorizontal: '2.5%',
        marginVertical: 3,
        paddingBottom: 10
    },

    wrapper: {
        borderRadius: 10
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
        borderRadius: 20
        //backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#92BBD9'
    },
    sliderImg: {
        height: vrscale(150), width: '98%',
    }
})