import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React from 'react'
import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'
import { mdscale, vrscale } from '../../PixelRatio'
import { Font } from '../../Constant/FontFamily'
import RazorpayCheckout from 'react-native-razorpay';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Toast from 'react-native-simple-toast';
import HomeService from '../../Service/HomeService'
import Navigation from '../../Service/Navigation'

const Payment = () => {
    const { userData } = useSelector((state) => state.User)
    const [Ammount, setAmmount] = useState('')
    const [Comment, setComment] = useState('')

    const payment = () => {
        if (Ammount == '') {
            Toast.show('Please Enter Vaild Ammount');
            return false
        }
        if (Comment == '') {
            Toast.show('Please Enter Comment');
            return false
        }
        var options = {
            description: 'Credits towards consultation',
            image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
              key: 'rzp_live_rGOZJaP9wh17YN',
            // key: 'rzp_test_NnEIrnpI7mg51n',
            amount: Number(Ammount) * 100,
            name: 'MRC',
            // order: 'order_DslnoIgkIDL8Zt',
            prefill: {
                email: userData.email,
                contact: userData.phone,
                name: userData.name
            },
            theme: { color: '#00BFFF' },
        };
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            // alert(`Success: ${data.razorpay_payment_id}`);
            // console.log('Success', data.razorpay_payment);

            if (data.razorpay_payment_id) {
                HomeService.userpayment({
                    "price": Ammount,
                    "description": Comment,
                    "user_id": userData.id,
                    'razorpay_payment': data.razorpay_payment_id
                }).then((res) => {
                    console.log('res--->', res);
                    Toast.show('Price Update Success')
                    Navigation.back()
                })
            }


            // acceptRequest()
        }).catch((error) => {

            // handle failure
            // alert(`Error: ${error.code} | ${error.description}`);
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            <Header
                name='Pay Now'
            />

            <View style={styles.card}>

                <Text style={{
                    color: COLORS.textColor,
                    fontSize: mdscale(14),
                    fontFamily: Font.Bold,
                    marginTop: 20

                }}> Amount:</Text>

                <View style={styles.inputBox}>
                    <TextInput
                        placeholder="Enter Ammount"
                        placeholderTextColor="#a8aabe"
                        value={Ammount}
                        keyboardType={'numeric'}
                        onChangeText={(a) => setAmmount(a)}
                        style={{
                            //fontWeight: 'bold',   
                            color: "#000000",
                            width: mdscale(200),
                        }}
                    />
                </View>
                <Text style={{
                    color: COLORS.textColor,
                    fontSize: mdscale(14),
                    fontFamily: Font.Bold,
                    marginTop: 20
                }}> Remark:(Service details you paid for)</Text>

                <View style={styles.inputBoxL}>
                    <TextInput
                        placeholder="Comment.."
                        placeholderTextColor="#a8aabe"
                        style={{
                            color: "#000000",
                            width: mdscale(200),
                        }}
                        value={Comment}
                        onChangeText={(a) => setComment(a)}
                    />

                </View>

                <Pressable onPress={payment}
                    style={styles.button}>
                    <Text style={styles.buttonText}> Pay Now </Text>

                </Pressable>

            </View>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    card: {
        marginTop: vrscale(30),
        width: '90%',
        backgroundColor: '#ffffff',
        borderColor: '#ededed',
        borderWidth: 0.7,
        elivation: 5,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 20
    },
    inputBox: {
        backgroundColor: '#e9ebef',
        alignSelf: 'center',
        height: vrscale(45),
        width: '90%',
        borderRadius: 4,
        marginTop: 10,
        //alignItems: 'center',
        paddingStart: mdscale(15),
        borderColor: COLORS.grayColor,
        borderWidth: 0.5
    },
    inputBoxL: {
        backgroundColor: '#e9ebef',
        alignSelf: 'center',
        height: vrscale(100),
        width: '90%',
        borderRadius: 4,
        marginTop: 10,
        //alignItems: 'center',
        paddingStart: mdscale(15),
        borderColor: COLORS.grayColor,
        borderWidth: 0.5
    },

    button: {
        backgroundColor: COLORS.HeaderColor,
        width: '90%',
        height: mdscale(40),
        borderRadius: 8,

        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: 25,
        // paddingVertical: 10,
        // paddingHorizontal: 12,

        marginTop: vrscale(20),
        marginBottom: 25

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