import {
    StyleSheet, Text, View, ScrollView, FlatList,
    Image, Pressable,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'

import { mdscale } from '../../PixelRatio';
import LinearGradient from 'react-native-linear-gradient';
import { Font } from '../../Constant/FontFamily';
import Navigation from '../../Service/Navigation';


//Development Packege
import HomeService from '../../Service/HomeService';
import { TextInput } from 'react-native-gesture-handler';




const Pathology = () => {
    const [Name, setName] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [data, setData] = useState([]);
    const [NewData, setNewData] = useState([])
    const [FilterData, setFilterData] = useState([])
    const [FilterNewData, setFilterNewData] = useState([])








    const fetchPathology = async () => {
        console.log('hello');
        let result = await HomeService.getPathology();
        if (result && result.status) {
            console.log('result00000', result)
            setImgUrl(result.img_path)
            setData(s => [...s, ...result.data])
            setFilterData(s => [...s, ...result.data])
        }
    };
    const getAllTest = async () => {
        // console.log('hello');
        let result = await HomeService.getTest();
        console.log('result00000', result);
        if (result && result.status) {
            console.log('result00000', result)
            // setImgUrl(result.img_path)
            setNewData([...result.data])
            setFilterNewData([...result.data])
        }
    };
    function searchDorctor(e) {
        // console.log('Name',e);
        if (e == '') {
            setData(FilterData)
        } else {
            const SearchItem = FilterData.filter(f => f.package_name.toLowerCase().includes(e.toLowerCase()))
            setData(SearchItem)
        }
        if (e == '') {
            setNewData(FilterNewData)
        } else {
            const SearchItem = FilterNewData.filter(f => f.name.toLowerCase().includes(e.toLowerCase()))
            setNewData(SearchItem)
        }
        setName(e)
    }

    useEffect(() => {
        fetchPathology()
        getAllTest()
    }, [])



    const renderData = ({ item, url, }) => {
        // console.log(item);
        return (
            <Pressable onPress={() => Navigation.navigate('DoctorBooking', { cat_id: 1, servicesId: 4, price: item.package_price, pathology_id: item.id })} >
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#4ec6c6', '#4ec6c6']}
                    style={styles.card}>


                    <Image source={{ uri: imgUrl + item.package_image }}
                        style={{
                            width: '100%',
                            height: mdscale(150),
                            resizeMode: "cover",

                            borderRadius: 4,
                            marginTop: 10,
                            alignSelf: 'center'
                        }}
                    />


                    <View style={{
                        marginLeft: 20,
                        flex: 1,
                        // marginTop: -10,
                        //backgroundColor: 'red'
                    }}>
                        <Text style={{
                            fontsize: mdscale(14),
                            color: '#fff',
                            fontFamily: Font.Bold,
                            marginTop: 5

                        }}>{item.package_name}</Text>

                        <Text style={{
                            fontSize: 14,
                            color: '#000000',
                            fontWeight: 'bold',
                            marginTop: 5
                        }}>₹ {item.package_price}</Text>


                        <View
                            style={{
                                width: '95%',
                                //backgroundColor: 'green',
                                marginVertical: mdscale(9)
                            }}>
                            <Text style={{
                                fontSize: 12, color: '#fff', fontFamily: Font.Medium
                            }}>{item.package_description}</Text>
                        </View>

                        {/* 
                    <Pressable
                        onPress={() => Navigation.navigate('Doctor')}
                        style={{
                            width: '70%',
                            borderRadius: 8,

                            justifyContent: 'center',
                            height: mdscale(30),
                            backgroundColor: '#ff6b00'
                        }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: mdscale(13), fontFamily: Font.Bold,
                            textAlign: 'center'
                        }}>Make an appointment</Text>
                    </Pressable> */}

                    </View>

                </LinearGradient>
            </Pressable>
        )

    }
    const renderNewData = ({ item, url, }) => {
        console.log(item);
        return (
            <Pressable onPress={() => Navigation.navigate('DoctorBooking', { cat_id: 1, servicesId: 'null', price: item.fees, pathology_id: item.id })} >
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#4ec6c6', '#4ec6c6']}
                    style={styles.card}>


                    <Image source={{ uri: 'https://new.easytodb.com/Healthcare/public/test_img/' + item.image }}
                        style={{
                            width: '100%',
                            height: mdscale(150),
                            resizeMode: "cover",

                            borderRadius: 4,
                            marginTop: 10,
                            alignSelf: 'center'
                        }}
                    />


                    <View style={{
                        marginLeft: 20,
                        flex: 1,
                        // marginTop: -10,
                        //backgroundColor: 'red'
                    }}>
                        <Text style={{
                            fontsize: mdscale(14),
                            color: '#fff',
                            fontFamily: Font.Bold,
                            marginTop: 5

                        }}>{item.name}</Text>

                        <Text style={{
                            fontSize: 14,
                            color: '#000000',
                            fontWeight: 'bold',
                            marginTop: 5
                        }}>₹ {item.fees}</Text>


                        <View
                            style={{
                                width: '95%',
                                //backgroundColor: 'green',
                                marginVertical: mdscale(9)
                            }}>
                            <Text style={{
                                fontSize: 12, color: '#fff', fontFamily: Font.Medium
                            }}>{item.description}</Text>
                        </View>

                        {/* 
                    <Pressable
                        onPress={() => Navigation.navigate('Doctor')}
                        style={{
                            width: '70%',
                            borderRadius: 8,

                            justifyContent: 'center',
                            height: mdscale(30),
                            backgroundColor: '#ff6b00'
                        }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: mdscale(13), fontFamily: Font.Bold,
                            textAlign: 'center'
                        }}>Make an appointment</Text>
                    </Pressable> */}

                    </View>

                </LinearGradient>
            </Pressable>
        )

    }

    // return false
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            <Header
                name='Pathology'
            />
            <View style={{
                width: "90%",
                alignSelf: "center",
                height: 50,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginTop: 10,
                elevation: 4
            }}>
                <TextInput
                    value={Name}
                    onChangeText={(a) => searchDorctor(a)}
                    style={{
                        paddingLeft: 10
                    }}
                    placeholder='Search Pathology'
                    placeholderTextColor={'#999'} />
            </View>
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
                <FlatList
                    //columnWrapperStyle={{}}
                    showsVerticalScrollIndicator={false}
                    //numColumns={2}
                    data={NewData}
                    renderItem={renderNewData}
                    //console.log(renderData ))
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({

    card: {
        width: '93%',
        // height: mdscale(150),
        // backgroundColor: '#afddf7',
        marginTop: 20,
        alignSelf: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 13,
        paddingLeft: 10,
        paddingHorizontal: 10
        //flexDirection: 'row',


    },
})

export default Pathology