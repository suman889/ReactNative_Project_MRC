import { StyleSheet, Text, View, ScrollView, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../Constant/Colors';
import Header from '../../Component/Global/Header'

import { mdscale } from '../../PixelRatio';
import LinearGradient from 'react-native-linear-gradient';
import { Font } from '../../Constant/FontFamily';

//Development Packege
import HomeService from '../../Service/HomeService';



const Tab_Pathology = () => {

    const [imgUrl, setImgUrl] = useState('')
    const [data, setData] = useState([]);



    useEffect(() => {
        fetchPathology()
    }, [])




    const fetchPathology = async () => {
        console.log('hello');
        let result = await HomeService.getPathology();
        if (result && result.status) {
            console.log('result00000', result)
            setImgUrl(result.img_path)
            setData(result.data)

        }
    };







    const renderData = ({ item, url, }) => {
        return (
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
        )

    }




    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>

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

export default Tab_Pathology