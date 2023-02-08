
import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, FlatList, TextInput,
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
import HomeService from '../../Service/HomeService';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../Constant/Icons';
import StarRating from 'react-native-star-rating';


const AllDoctor = ({ navigation }) => {
    const { userData } = useSelector(state => state.User);
    console.log('userdata>>>>>>>>>>>>>>......', userData)
    const [TextValue, setTextValue] = useState('')
    const [data, setData] = useState([]);
    const [mainData, setMainData] = useState([])
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllDoctor()
        });
        return unsubscribe;
    }, [navigation]);

    function searchDorctor(e) {
        if (e == '') {
            setData(mainData)
        } else {
            const SearchItem = mainData.filter(f => f.dname.toLowerCase().includes(e.toLowerCase()))
            setData(SearchItem)
        }
        setTextValue(e)
    }
    const renderData = ({ item }) => {
        // console.log('doctorItem',item.rating);
        return (
            <Pressable >
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#0197b0', '#69b2e4']}
                    style={styles.card}>

                    <View style={{
                        width: 100,
                        //backgroundColor: 'green',
                        //flex: 1
                    }}>
                        <View style={{
                            width: 80, height: 80, borderRadius: 100, backgroundColor: "#fff"
                        }}>
                            <Image source={require('../../Assetes/logo.png')}
                                style={{ width: 80, height: 80, borderRadius: 100 }}
                            />
                        </View>
                    </View>

                    <View style={{
                        marginLeft: 10,
                        flex: 1
                    }}>
                        <Text style={{
                            // fontsize: 300,
                            color: '#fff',
                            fontWeight: "bold",
                            fontSize: 17
                        }}>{item.dname}</Text>

                        <Text style={{
                            fontSize: 15,
                            color: '#000000',
                            marginTop: 10
                        }}>{item.catname}</Text>

                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <StarRating
                                starSize={26}
                                disabled={true}
                                // emptyStar={'ios-star-outline'}
                                // fullStar={'star'}
                                // halfStar={'ios-star-half'}
                                // iconSet={'AntDesign'}
                                maxStars={5}
                                rating={item.rating == null ? 0 : item.rating}
                                selectedStar={(rating) => onStarRatingPress(rating)}
                                fullStarColor={'#fff'}
                            />
                        </View>


                    </View>

                </LinearGradient>
            </Pressable>
        )
    }

    async function getAllDoctor() {
        let res = await HomeService.mydoctor({
            "patient_id": userData.id
        })
     
        if (res.status == true) {
            let fData = res.data.filter(a => a.catname !== null)
          
            setData(fData)
            setMainData(fData)
        }
    }

    useEffect(() => {
        getAllDoctor()
    }, [])

    return (
        <View style={styles.container}>
            {/* <Header
                name='All Doctor '
            /> */}
            <View style={{
                width: "90%",
                alignSelf: "center",
                height: 50,
                borderRadius: 10,
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: "#999",
                marginTop: 15,
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 10
            }}>
                <TextInput style={{
                    flex: 1,
                    fontSize: 18,
                }}
                    value={TextValue}
                    onChangeText={(e) => searchDorctor(e)}
                    placeholder='Search'
                    placeholderTextColor={'#999'}
                />
                <Icon type={'AntDesign'} name='search1' size={26} color='#999' />
            </View>
            <View style={{
                width: "90%",
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10
            }}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: "600",
                    color: "#000"
                }}>Search Dorctors</Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Icon type={'AntDesign'} name='filter' size={20} color='#00a3e0' />
                    <Text style={{
                        paddingHorizontal: 7,
                        fontSize: 17,
                        fontWeight: "400",
                        color: "#00a3e0"
                    }}>filter by name</Text>
                    <Icon type={'AntDesign'} name='arrowdown' size={20} color='#00a3e0' />
                </View>
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


            </ScrollView>
            {/* <Pressable
                onPress={() => Navigation.navigate('DoctorBooking')}
                style={styles.button}>
                <Text style={{
                    color: '#fff',
                    fontSize: mdscale(13), fontFamily: Font.Bold,
                    textAlign: 'center'
                }}>Make an appointment</Text>
            </Pressable> */}
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
export default AllDoctor;
