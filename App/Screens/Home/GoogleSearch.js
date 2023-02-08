import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
// import { TextInput } from 'react-native-paper'
import { useState } from 'react';

const GoogleSearch = ({ onClose, SearchField }) => {
    const [Data, setData] = useState('')
    const [AllFilds, setAllFilds] = useState([])

    async function PlaceSearch(value) {
        setData(value)
        fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=AIzaSyDoTIrlJxHd9rTLoytrigY9piIQk1OcTJk`)
            .then(response => response.json())
            .then(res => {
                console.log(value, JSON.stringify(res));
                setAllFilds(res.predictions)
            }).catch(e => console.log(e))
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Pressable onPress={() => { }} style={{
                width: "90%",
                height: 50,
                backgroundColor: "#ededed",
                alignSelf: "center",
                marginTop: 10,
                elevation: 4,
                paddingHorizontal: 15,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 50
            }}>
                <AntDesign onPress={() => onClose()} name='arrowleft' size={24} color='#333' />
                <TextInput autoFocus={true} style={{
                    flex: 1,
                    color: "#000000",
                    fontSize: 17,
                    fontWeight: "400",
                    height: 50,
                    backgroundColor: "#ededed",
                    // borderWidth: 2,
                    // borderColor:"#000"
                    // borderRadius: 50
                }}
                    value={Data}
                    onChangeText={v => PlaceSearch(v)}
                    placeholder='Seach A Place'
                    placeholderTextColor={'#999'}
                />
                {Data != '' ? <AntDesign onPress={()=> PlaceSearch('')} name='close' size={24} color='#333' /> : null}

            </Pressable>

            {AllFilds.map((item, index) => {
                return (
                    <Pressable onPress={() => {
                        SearchField(item.description)
                        onClose()
                    }} style={{
                        width: "90%",
                        height: 50,
                        // backgroundColor: "#fff",
                        alignSelf: "center",
                        marginTop: 10,
                        // elevation: 4,
                        // paddingHorizontal: 15,
                        flexDirection: "row",
                        alignItems: "center",
                        // borderRadius: 50
                        borderBottomColor: "#adacb1",
                        borderBottomWidth: 1,
                        paddingBottom: 5
                    }}>

                        <View style={{
                            height: 30,
                            width: 30,
                            marginTop: 10,
                            backgroundColor: '#afafaf',
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15,

                        }}>
                            <EvilIcons onPress={() => onClose()} name='location' size={24} color='#fff' />
                        </View>



                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",

                            height: 50,
                            marginLeft: 10
                        }}>
                            <View style={{
                                flex: 1,

                            }}>
                                <Text numberOfLines={1} style={{
                                    fontWeight: '500',
                                    color: "#121212"
                                }}>
                                    {item.structured_formatting.main_text}
                                </Text>
                                <Text numberOfLines={1} style={{
                                    fontWeight: '400',
                                    color: "#adacb1"
                                }}>
                                    {item.structured_formatting.secondary_text}
                                </Text>
                            </View>
                            <Feather name='arrow-up-left' size={24} color='#333' />
                        </View>

                    </Pressable>
                )
            })}

        </View>
    )
}

export default GoogleSearch

const styles = StyleSheet.create({})