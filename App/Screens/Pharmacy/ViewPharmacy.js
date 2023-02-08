import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState, } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Header from '../../Component/Global/Header'
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import HomeService from '../../Service/HomeService';
import Toast from 'react-native-simple-toast';
import Navigation from '../../Service/Navigation';

const RadioBox = ({ show, Change, value }) => {
    return <>
        {show == true ?
            <Pressable >
                <Fontisto name='radio-btn-active' size={20} style={{ marginTop: 3 }} color='#0f82a0' />
            </Pressable>
            :
            <Pressable onPress={() => Change(value)}>
                <Fontisto name='radio-btn-passive' size={20} style={{ marginTop: 3 }} color='#0f82a0' />
            </Pressable>
        }

    </>
}

const ViewPharmacy = (props) => {
    let item = props.route.params.item
    console.log('item...>>', item);
    const [total_price, settotal_price] = useState('')
    const { userData } = useSelector(state => state.User);
    console.log(userData);
    const [PaymentType, setPaymentType] = useState('')

    async function acceptRequest(razorpay_payment_id = '') {
        // let res = await HomeService.payappoinment({
        //     "invoice_no": item.order_id,
        //     "u_status": "Confirm",
        //     "p_mode": PaymentType
        // })
        // if (PaymentType == 'online') {

        // } else {

        // }
        let Data = {
            "invoice_no": item.order_id,
            "u_status": "APPROOVE",
            "p_mode": PaymentType,
            "p_address": item.address,
            "d_charge": item.delivery_charge,
            "price": total_price,
            'razorpay_payment_id': razorpay_payment_id
        }
        console.log('DAta>>>>>>>>>>>>', Data)
        let res = await HomeService.payappoinment(Data)
        console.log('res>>>>>>>>>>>>', res)
        if (res) {
            Toast.show('Order Successfully', Toast.SHORT);
            Navigation.navigate('Home')
            setTimeout(() => {
                Navigation.navigate('Home')
            }, 1);
        } else {
            Toast.show('something went wrong', Toast.SHORT);
        }
        // let res = await HomeService.payappoinment({
        //     "invoice_no": item.order_id,
        //     "u_status": "Confirm",
        //     "p_mode": PaymentType
        // })
        // console.log('ssss-------', res);
        // if (res.status == true) {
        //     Toast.show('Submit Successful ');
        //     Navigation.back()
        // }

    }
    useEffect(() => {
        console.log('item---------------->>>>>>>>>>>>>>>', item)
        let price = 0
        if (item.delivery_type != 'Pickup') {
            price = price + Number(item.delivery_charge)
        }
        item.task_details[0].map((itemData) => {
            price = price + Number(itemData.price)
        })
        settotal_price(price)
    }, [])

    const payment = () => {
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            key: 'rzp_live_rGOZJaP9wh17YN',
            // key: 'rzp_test_NnEIrnpI7mg51n',
            amount: Number(total_price) * 100,
            name: 'MRC Customer',
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
            if (data.razorpay_payment_id) {

                acceptRequest(data.razorpay_payment_id)
            }
        }).catch((error) => {
            // handle failure
            // alert(`Error: ${error.code} | ${error.description}`);
        });
    };
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fff"
        }}>
            <Header name='Bill' />
            <View style={{
                flex: 1,
            }}>
                <ScrollView >
                    <View style={{
                        width: "90%",
                        alignSelf: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 5
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#333",
                            width: '40%',
                        }}>Medcine Name:</Text>
                        <Text style={{
                            fontSize: 17,
                            color: "#333",
                            width: '30%',
                            textAlign: "center"
                        }}> Quantity</Text>
                        <Text style={{
                            fontSize: 17,
                            color: "#333",
                            width: '30%',
                            textAlign: "right"
                        }}> Price</Text>
                    </View>
                    {item.task_details[0].map((itemData) => {
                        console.log('vvv------', itemData);
                        return (
                            <View style={{
                                width: "90%",
                                alignSelf: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginVertical: 5
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "600",
                                    color: "#333",
                                    width: '40%',

                                }}>{itemData.name}</Text>
                                <Text style={{
                                    fontSize: 17,
                                    color: "#333",
                                    width: "30%",
                                    textAlign: "center"
                                }}> {itemData.qty}</Text>
                                <Text style={{
                                    fontSize: 17,
                                    color: "#333",
                                    width: "30%",
                                    textAlign: "right"
                                }}>{itemData.price}</Text>
                            </View>
                        )
                    })}
                    {item.delivery_type != 'Pickup' ?
                        <>
                            <View style={{
                                width: "90%",
                                alignSelf: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginVertical: 5
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "600",
                                    color: "#333",
                                    width: '40%',

                                }}>delivery charge</Text>
                                <Text style={{
                                    fontSize: 17,
                                    color: "#333",
                                    width: "30%",
                                    textAlign: "center"
                                }}> </Text>
                                <Text style={{
                                    fontSize: 17,
                                    color: "#333",
                                    width: "30%",

                                    textAlign: "right"
                                }}>₹{item.delivery_charge}</Text>
                            </View>
                        </>
                        : null}

                    {/* {item.user_status} */}
                    {item.user_status == 'Price Submited' ? <>
                        <View style={{
                            alignSelf: "center",
                            width: '90%',
                            height: 50,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            borderColor: "#666",
                            borderWidth: 1,
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                color: "#00a3e0",
                                fontWeight: "600",
                                fontSize: 17
                            }}>Total Amount</Text>
                            <Text style={{
                                color: "#00a3e0",
                                fontWeight: "600",
                                fontSize: 17
                            }}> {total_price}</Text>
                        </View>
                        <Text style={{
                            color: "#00a3e0",
                            fontWeight: "600",
                            fontSize: 17,
                            marginLeft: "5%",
                            marginTop: 10
                        }}>
                            Payment Type
                        </Text>
                        <View style={{
                            width: "90%",
                            alignSelf: "center",
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#666',
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 10,
                            marginTop: 10
                        }}>

                            <RadioBox
                                show={PaymentType == 'online' ? true : false}
                                Change={(v) => setPaymentType(v)}
                                value='online' />
                            <Text style={{
                                color: "#333",
                                marginRight: 10,
                                marginLeft: 5
                            }}>Online</Text>
                            <RadioBox
                                show={PaymentType == 'cash' ? true : false}
                                Change={(v) => setPaymentType(v)}
                                value='cash' />
                            <Text style={{
                                color: "#333",
                                marginRight: 10,
                                marginLeft: 5
                            }}>Cash</Text>
                        </View>
                    </> : null}
                </ScrollView>
            </View>
            {item.user_status == 'Price Submited' ? <>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    <Pressable
                        // onPress={() => { payment() }}
                        onPress={() => {
                            // Navigation.navigate('HomeTab')
                            // this.ProData()
                            if (PaymentType == 'cash') {
                                acceptRequest();
                            } else if (PaymentType == 'online') {
                                payment();
                            } else if (PaymentType == '') {
                                Toast.show('Please Choose Payment Method!!!', Toast.SHORT);
                            }
                        }}
                        // onPress={() => acceptRequest()}
                        style={{
                            backgroundColor: "#0099ff",
                            width: 100,
                            height: 40,
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            elevation: 3
                        }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 19,
                            fontWeight: "500"
                        }}>
                            Submit
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => Navigation.back()}
                        style={{
                            backgroundColor: "#fe0000",
                            width: 100,
                            height: 40,
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            elevation: 3
                        }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 19,
                            fontWeight: "500"
                        }}>
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </> : null}

        </View>
    )
}

export default ViewPharmacy

const styles = StyleSheet.create({})