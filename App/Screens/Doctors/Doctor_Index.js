import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput, AppState, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'
import { mdscale, vrscale } from '../../PixelRatio'
import { Font } from '../../Constant/FontFamily';
import { Badge } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
///
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icony from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import HomeService from '../../Service/HomeService'
import Navigation from '../../Service/Navigation'
import Feather from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';

const Doctor_Index = (props) => {
    const { userData } = useSelector(state => state.User);
    const [Comment, setComment] = useState('')
    let doctorData = props.route.params.doctorData
    console.log('doctorData', doctorData);
    const [starCount, setStarCount] = useState('')
    const [FireBaseData, setFireBaseData] = useState({})
    function onStarRatingPress(rating) {
        setStarCount(rating)
        console.log(rating);
    }
    async function submitData() {
        console.log('hffh');
        if (starCount == '') {
            Toast.show('Please Enter rating')
        } else if (Comment == '') {
            Toast.show('Please Enter Comment')
        } else {
            let res = await HomeService.rating({
                "doctor_id": doctorData.id,
                "user_id": userData.id,
                "rating": starCount,
                "review": Comment
            })
            console.log('res -->', res);
            if (res.status == true) {
                Toast.show('review send successfully')
                Navigation.back()
            } else {
                Toast.show('invalid credentials!!!');
            }
        }
    }
    const getfirebase = () => {
        console.log('userId...:::...', userData);
        console.log(doctorData);
        // return false
        console.log('start', `/chatList/${userData.id}/${doctorData.docid}`);
        database()
            .ref(`/chatList/${doctorData.docid}/${userData.id}`)
            .once('value')
            .then(snapshot => {
                // console.log('snapsort', snapshot);
                if (snapshot.exists()) {
                    // let data = Object.values(snapshot.val());
                    console.log('fbdata', snapshot.val());
                    // SetAllUser(data);
                    // setAllUserBack(data);
                    setFireBaseData(snapshot.val())
                }
            });
    };
    useEffect(() => {
        getfirebase()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            {/* <Header
                name='Doctor Contact'
            /> */}
            <View style={{
                width: "100%",
                height: 150,
                backgroundColor: "#00a3e0",
                alignItems: 'center'
            }}>
                <Feather
                    onPress={() => Navigation.back()}
                    name={'chevron-left'}
                    size={mdscale(26)}
                    color={'#ffffff'}
                    style={{
                        position: "absolute",
                        top: 10,
                        left: 10
                    }}
                />

                <View style={{
                    width: mdscale(130),
                    height: mdscale(150),
                    borderRadius: 20,
                    // backgroundColor: "#fff",
                    position: 'absolute',
                    // elevation: 3,
                    bottom: -75
                }}>
                    <View style={{
                        width: mdscale(130),
                        height: mdscale(130),
                        borderRadius: 80,
                        backgroundColor: "#fff"
                    }}>
                        <Image source={require('../../Assetes/logo.png')}
                            style={{
                                width: mdscale(130),
                                height: mdscale(130),
                                borderRadius: 80
                            }} />
                    </View>

                </View>

            </View>
            <View
                showsVerticalScrollIndicator={false}
            >

                {/** profile photo */}
                <View style={{
                    marginTop: 75,
                    alignSelf: 'center'
                }}>

                    <View>

                        {/* <Badge></Badge> */}
                    </View>




                    <Text style={{
                        color: '#333',
                        textAlign: 'center',
                        marginTop: 5,
                        fontSize: mdscale(12),
                        fontFamily: Font.Regular
                    }}> {doctorData.status}</Text>

                    <Text style={{
                        color: '#000000',
                        textAlign: 'center',
                        marginTop: 5,
                        fontSize: mdscale(16),
                        fontFamily: Font.Bold
                    }}> {doctorData.name}</Text>

                    <Text style={{
                        color: '#666',
                        textAlign: 'center',
                        marginTop: 5,
                        fontSize: mdscale(14),
                        fontFamily: Font.Regular
                    }}>  {doctorData.cat_name}</Text>
                    <View style={{
                        marginTop: 10
                    }}>

                        <StarRating
                            starSize={33}
                            disabled={true}
                            // emptyStar={'ios-star-outline'}
                            // fullStar={'star'}
                            // halfStar={'ios-star-half'}
                            // iconSet={'AntDesign'}
                            maxStars={5}
                            rating={doctorData.user_rating == null ? 0 : doctorData.user_rating}
                            selectedStar={(rating) => onStarRatingPress(rating)}
                            fullStarColor={'#f4de18'}
                        />

                    </View>

                </View>

                {/***About */}

                <View style={{
                    width: '90%',
                    alignSelf: 'center'
                }}>

                    <Text style={{
                        color: COLORS.textColor,
                        fontSize: mdscale(16),
                        fontFamily: Font.Bold,
                        marginTop: 20
                    }}> About Doctor:</Text>

                    <View style={{
                        width: '100%',
                        alignSelf: 'center',
                        borderRadius: 8,
                        backgroundColor: "#ededed",
                        padding: 10,
                        marginTop: 10
                    }}>
                        <Text style={{
                            color: '#000000'
                        }}>
                            {doctorData.yourself}
                        </Text>
                    </View>

                    {/**** Icon Contact*/}

                    <Text style={{
                        color: COLORS.textColor,
                        fontSize: mdscale(16),
                        fontFamily: Font.Bold,
                        marginTop: 20
                    }}> Contact by:</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    //alignSelf: 'center',
                    marginTop: 10,
                    width: '100%',
                    alignItems: "center",
                    marginLeft: mdscale(20)
                }}>
                    {props.route.params.visit_type == 1 ? <>
                        <Pressable
                            onPress={() => Navigation.navigate('Calling', { remoteUserData: FireBaseData, type: 'Outgoing' })}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: "#000",
                                alignItems: "center",
                                justifyContent: "center",
                                elevation: 3
                            }}>
                            <Entypo style={{
                            }} name='phone' color={'#fff'} size={36} />
                        </Pressable>
                        <Pressable
                            onPress={() => Navigation.navigate('VideoCall', { remoteUserData: FireBaseData, type: 'Outgoing' })}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: "#057BE4",
                                alignItems: "center",
                                justifyContent: "center",
                                elevation: 3,
                                marginHorizontal: 20
                            }}>
                            <FontAwesome5 style={{
                            }} name='video' color={'#fff'} size={28} />
                        </Pressable>
                        <Pressable
                            onPress={() => Navigation.navigate('Chat', { roomId: FireBaseData.roomId, name: `${FireBaseData.name}`, image: FireBaseData.image, remoteId: FireBaseData.userId, remoteData: FireBaseData })}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: "#F93E08",
                                alignItems: "center",
                                justifyContent: "center",
                                elevation: 3,
                            }}>
                            <MaterialIcons style={{
                            }} name='message' color={'#fff'} size={28} />
                        </Pressable>
                    </> :
                        <>
                            <Pressable onPress={() => Linking.openURL("https://www.google.com/maps/place/" + doctorData?.patient_address)} style={{
                                width: 50,
                                height: 50,
                                borderRadius: 100,
                                backgroundColor: "#fff",
                                alignItems: "center",
                                justifyContent: "center",
                                elevation: 4,
                                marginHorizontal: 10
                            }}>
                                <Image style={{
                                    width: 40,
                                    height: 40
                                }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/854/854878.png" }} />

                            </Pressable>
                        </>}
                    {/* <FontAwesome name='phone-square' color={'#000000'} size={mdscale(30)} /> */}
                    {/* <FontAwesome name='video-camera' color={'#0767a2'} size={mdscale(30)} />
                    <Icony name='message' color={'#e86441'} size={mdscale(30)} /> */}
                    {/* <Text style={{
                        color: "#000000",
                        marginLeft: 10
                    }}>{doctorData.phone}</Text> */}

                </View>

            </View>
            <View style={{ flex: 1 }}>

            </View>
            {/* <View style={{
                    height: 20
                }} /> */}
                {doctorData.user_rating == null?
            <Pressable
                onPress={() => Navigation.navigate('RatingDorctor', { doctorData: doctorData })}
                style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: "#00a3e0",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flexDirection: "row"
                }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "600"
                }}>
                    Next
                </Text>
                <AntDesign
                    name={'arrowright'}
                    size={mdscale(26)}
                    color={'#ffffff'}
                    style={{
                        marginHorizontal: 10
                    }}
                />
            </Pressable>:null}
        </View>
    )
}

export default Doctor_Index

const styles = StyleSheet.create({


    button: {
        backgroundColor: COLORS.HeaderColor,
        width: '100%',
        height: mdscale(40),
        borderRadius: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: 25,
        marginTop: vrscale(20),
        marginBottom: 25

    },
    inputBoxS: {
        backgroundColor: '#e9ebef',
        //alignSelf: 'center',
        height: vrscale(40),
        width: '100%',
        borderRadius: 4,
        marginTop: 10,
        //alignItems: 'center',
        paddingStart: mdscale(15),
        borderColor: COLORS.HeaderColor,
        borderWidth: 0.7
    },
    buttonText: {
        fontSize: mdscale(16),
        //fontWeight: '10',
        color: '#f7f4f5',
        // textAlign: 'center',
        //alignItems: 'center',
        fontFamily: Font.Medium
    },
})