import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Header from '../../Component/Global/Header'
import { mdscale } from '../../PixelRatio'
import StarRating from 'react-native-star-rating';

import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import HomeService from '../../Service/HomeService'
import Navigation from '../../Service/Navigation'
import Feather from 'react-native-vector-icons/Feather';
const UselessTextInput = (props) => {
    return (
        <TextInput

            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={40}

        />
    );
}
const RatingDorctor = (props) => {
    const { userData } = useSelector(state => state.User);
    const [value, onChangeText] = React.useState('');
    let doctorData = props.route.params.doctorData
    console.log('doctorData4', doctorData);
    const [starCount, setStarCount] = useState('')
    function onStarRatingPress(rating) {
        setStarCount(rating)
        console.log(rating);
    }
    async function submitData() {
        console.log('hffh');
        if (starCount == '') {
            Toast.show('Please Enter rating')
        } else if (value == '') {
            Toast.show('Please Enter Comment')
        } else {
            let res = await HomeService.rating({
                "doctor_id": doctorData.id,
                "user_id": userData.id,
                "rating": starCount,
                "review": value
            })

            console.log('res -->', res);
            if (res.status == true) {
                let resElt = await HomeService.adduserrating({
                    "booking_id": doctorData.invoice_no,
                    "rating": starCount,
                    "comment": value
                })
                console.log(resElt);
                if (resElt.status == true) {
                    Toast.show('review send successfully')
                    console.log('subham');
                    setTimeout(() => {
                        Navigation.navigate('Home')
                    }, 1);
                    Navigation.navigate('Home')
                } else {

                }

            } else {
                Toast.show('invalid credentials!!!');
            }
        }
    }
    return (
        <View style={{
            flex: 1,

        }}>
            <Header name='Leave Your Feedback' />
            <View style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",

            }}>
                <Image source={require('../../Assetes/logo.png')}
                    style={{
                        width: mdscale(120),
                        height: mdscale(120),
                        borderRadius: 80,
                        margin: 10
                    }} />
                <View style={{
                    marginLeft: 10
                }}>
                    <Text style={{
                        color: "#000",
                        fontSize: 19,
                        fontWeight: "600"
                    }}>
                        {doctorData.name}
                    </Text>
                    <Text style={{
                        color: "#666",
                        fontSize: 18,
                        fontWeight: "400",
                        marginVertical: 5
                    }}>
                        {doctorData.cat_name}
                    </Text>
                    <StarRating
                        starSize={33}
                        disabled={true}
                        // emptyStar={'ios-star-outline'}
                        // fullStar={'star'}
                        // halfStar={'ios-star-half'}
                        // iconSet={'AntDesign'}
                        maxStars={5}
                        rating={4}
                        selectedStar={(rating) => onStarRatingPress(rating)}
                        fullStarColor={'#f4de18'}
                    />
                </View>
            </View>
            <View style={{
                width: "90%",
                alignSelf: "center",
                height: 1,
                backgroundColor: "#999",
            }}>

            </View>
            <View style={{
                width: 200,
                alignSelf: "center",
                marginTop: 20
            }}>
                <StarRating
                    starSize={36}
                    disabled={false}
                    // emptyStar={'ios-star-outline'}
                    // fullStar={'star'}
                    // halfStar={'ios-star-half'}
                    // iconSet={'AntDesign'}
                    maxStars={5}
                    rating={starCount}
                    selectedStar={(rating) => onStarRatingPress(rating)}
                    fullStarColor={'#f4de18'}
                />


            </View>
            <View style={{
                width: "80%",
                backgroundColor: "#DEDDDD",
                alignSelf: 'center',
                borderColor: "#333",
                borderWidth: 2,
                borderRadius: 10,
                marginTop: 10
            }}>
                <UselessTextInput
                    multiline
                    numberOfLines={4}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    style={{
                        padding: 10,
                        color: "#333",
                        fontSize: 16,
                        textAlignVertical: 'top'
                    }}
                    placeholder={'Write Your Feedback'}
                    placeholderTextColor={'333'}
                />
            </View>
            <Pressable onPress={() => submitData()} style={{
                backgroundColor: "blue",
                width: 100,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10%",
                alignSelf: "flex-end",
                borderRadius: 10,
                marginTop: 10
            }}>
                < Text style={{
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: 18
                }}>
                    Submit
                </Text>
            </Pressable>
        </View>
    )
}

export default RatingDorctor

const styles = StyleSheet.create({})