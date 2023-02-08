import { Pressable, StyleSheet, Text, View, TextInput, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker, Overlay } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import { useEffect } from 'react';
// import { } from 'react-native-paper';
import Geocoder from 'react-native-geocoding';
import GoogleSearch from './GoogleSearch';


const GoogleMap = ({ changeAddress, onClose }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [Reigoin, setReigoin] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [Address, setAddress] = useState('')
    async function sendLocation() {
        //   let location =await Geolocation.getCurrentPosition();
        let location;
        Geolocation.getCurrentPosition(info => {
            console.log('data', info);
            location = {
                location: {
                    type: 'Point',
                    coordinates: [info.coords.longitude, info.coords.latitude],
                },
            };
            setReigoin({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
        });
    }
    function submitAddress() {
        // latLong(Reigoin)
        changeAddress(Address)
        onClose()
    }
    useEffect(() => {
        sendLocation()
    }, [])
    async function SearchField(address) {
        console.log('address',address);
        fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyDoTIrlJxHd9rTLoytrigY9piIQk1OcTJk`)
            .then(response => response.json())
            .then(res => {
                console.log(address, JSON.stringify(res));
                // setAllFilds(res.predictions)
                setReigoin({
                    latitude: res.candidates[0].geometry.location.lat,
                    longitude: res.candidates[0].geometry.location.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
            }).catch(e => console.log(e))
    }

    useEffect(() => {
        // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${Reigoin.latitude},${Reigoin.longitude}&key=AIzaSyDoTIrlJxHd9rTLoytrigY9piIQk1OcTJk`)
        // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=37.78825,-122.4324&key=AIzaSyDoTIrlJxHd9rTLoytrigY9piIQk1OcTJk`)
        Geocoder.from({
            latitude: Reigoin.latitude,
            longitude: Reigoin.longitude
        })
            .then(a => {
                console.log('aaa', JSON.stringify(a))
                console.log('aaa', a.results[0].formatted_address)
                setAddress(a.results[0].formatted_address)
                // fetch(`${a.url}`).then(res => console.log('address', res))

            })
            // .then((response) => response.json())
            // .then((data) => console.log('ddd', data))
            .catch(e => console.log(e))

    }, [Reigoin])
    return (
        <View style={{
            flex: 1,
        }}>
            <Pressable onPress={() => { setModalVisible(true) }} style={{
                width: "90%",
                height: 50,
                backgroundColor: "#fff",
                alignSelf: "center",
                position: "absolute",
                zIndex: 139,
                marginTop: 10,
                elevation: 4,
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 50
            }}>
                {/* <TextInput onPressIn={() => setModalVisible(true)} style={{
                    flex: 1,
                    color: "#333",
                    fontSize: 17,
                    fontWeight: "500"
                }}
                    placeholder='Seach A Place'
                    placeholderTextColor={'#999'}
                /> */}
                <Text style={{
                    color: "#999",
                    fontSize: 17,
                    fontWeight: "500",
                    flex: 1
                }}>
                    Seach A Place
                </Text>
                <AntDesign name='search1' size={24} color='#333' />
            </Pressable>

            <View style={{
                flex: 1
            }}>
                <View style={{
                    position: "absolute",
                    width: 40,
                    height: 40,
                    // backgroundColor: "#fff",
                    zIndex: 28998,
                    top: "50%",
                    left: "50%",
                    transform: [{ translateX: -20 }, { translateY: -20 }]
                }}>
                    <Image resizeMode='contain' style={{
                        width: 40,
                        height: 40,

                    }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149059.png" }} />
                </View>
                <MapView
                    onPress={(e) => console.log(e)}
                    style={{ flex: 1 }}
                    provider={'google'}
                    initialRegion={Reigoin}
                    region={Reigoin}
                    onRegionChangeComplete={(e) => {
                        // console.log(e)
                        setReigoin(e)
                    }}
                >

                    {/* <Marker

                        key={2}
                        coordinate={Reigoin}
                        style={{
                            width: 40,
                            height: 40
                        }}
                   
                    >
                        <Image resizeMode='contain' style={{
                            width: 40,
                            height: 40,

                        }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149059.png" }} />
                    </Marker> */}


                </MapView>
            </View>
            <View style={{
                width: "100%",
                backgroundColor: "#fff",
                paddingVertical: 20
            }}>
                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",

                }}>
                    <MaterialIcons name='my-location' color={'#00a3e0'} style={{
                        marginHorizontal: 10
                    }} size={36} />
                    <Text style={{
                        color: "#00a3e0",
                        fontSize: 17,
                        flex: 1
                    }}>
                        {Address}
                    </Text>
                </View>
                <Pressable onPress={submitAddress} style={{
                    width: "90%",
                    height: 40,
                    backgroundColor: "#00a3e0",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    borderRadius: 10
                }}>
                    <Text style={{
                        color: "#fff",
                        fontSize: 17,
                        textAlign: "center"
                    }}>
                        Submit
                    </Text>
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <>
                    <GoogleSearch SearchField={(a) => SearchField(a)} onClose={() => setModalVisible(false)} />
                </>
            </Modal>
        </View>
    )
}

export default GoogleMap

const styles = StyleSheet.create({})