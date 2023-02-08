import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'
import Icon from 'react-native-vector-icons/AntDesign';
import { Font } from '../../Constant/FontFamily';
import { useEffect } from 'react';
import HomeService from '../../Service/HomeService';
import { useSelector, useDispatch } from 'react-redux'


const Ratings = () => {
    const { userData } = useSelector((state) => state.User)
    const [RattingData, setRattingData] = useState([])
    const [rating, setRating] = useState([
        {
            name: 'Dr Devi Shetty',
            comment: 'Hello there',
            rating: 5
        }
    ]);


    async function getRattingData() {
        let res = await HomeService.userrating({
            "user_id": userData.id
        })
        if (res.status) {
            setRattingData(res.data)
        }
        console.log('res', res);
    }

    useEffect(() => {
        getRattingData()
    }, [])


    const renderRating = ({ item }) => {
        return (
            <View style={{
                width: '90%',
                // height: 50,
                backgroundColor: '#93c9d8',
                borderRadius: 10,
                alignSelf: 'center',
                marginTop: 15,
                paddingHorizontal: 20
                //alignItems: 'center',
            }}>

                <Text style={{
                    color: '#0451b7',
                    fontFamily: Font.Medium,
                    fontSize: 14,
                    marginVertical: 10
                }}>Doctor Name : {item.doc_name}</Text>

                <Text style={{
                    color: '#0451b7',
                    fontFamily: Font.Medium,
                    fontSize: 14,
                    marginVertical: 5
                }}>Comment : {item.review}</Text>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                        color: '#0451b7',
                        fontFamily: Font.Medium,
                        fontSize: 14,
                        marginVertical: 5,
                        marginRight: 5,
                    }}> {item.rating} /5</Text>

                    <Icon name='star' color={'#f4de18'} size={16}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            <Header
                name='View Rating'
            />
            {RattingData.length == 0 ? <Text style={{
                color: "#333",
                fontWeight: "600",
                alignSelf: 'center',
                textAlign: "center",
                marginTop:20,
                fontSize:19
            }}>No Rating Found</Text> : null}
            <FlatList
                //columnWrapperStyle={{}}
                showsVerticalScrollIndicator={false}
                //numColumns={2}
                data={RattingData}
                renderItem={renderRating}
                //console.log(renderData ))
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Ratings

const styles = StyleSheet.create({})