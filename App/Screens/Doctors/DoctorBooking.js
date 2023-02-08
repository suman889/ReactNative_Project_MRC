import {
    StyleSheet, Text, View, Image, Pressable,
    TextInput, ScrollView, ToastAndroid, Alert, Button, ActivityIndicator, TouchableOpacity, Modal, Dimensions
} from 'react-native'

import { Checkbox } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'
import { mdscale, vrscale } from '../../PixelRatio'
import { Font } from '../../Constant/FontFamily';
import { Picker } from '@react-native-picker/picker';
import Navigation from '../../Service/Navigation';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment'
// import Modal from "../../Component/Global/Modal";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Audio } from 'react-loader-spinner'
import RazorpayCheckout from 'react-native-razorpay';
////Development Packege
import HomeService from '../../Service/HomeService';
import { useDispatch, useSelector } from 'react-redux';

import Toast from 'react-native-simple-toast';


//vector icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { color } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function formatDate(date) {
    var year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        morning = hour < 12 ? "am" : "pm";

    return month + "/" + day + "/" + year + " " + hourFormatted + ":" +
        minuteFormatted + morning;
}
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
const DoctorBooking = (props) => {
    // let eighteenYearsAgo = new Date();
    const [Loader, setLoader] = useState(false)
    const [minYear, setMinYear] = useState('')
    const [CupponModal, setCupponModal] = useState(false)
    const [AllData, setAllData] = useState({})
    const [Allcopun, setAllcopun] = useState([])
    const [CouponCode, setCouponCode] = useState('')
    // const [Date, setDate] = useState('')

    {/*** all useState */ }
    // console.log(props.route.params.servicesId);
    const dispatch = useDispatch();
    const [ShowFilter, setShowFilter] = useState(true)
    {/** Date Time & Modal  start*/ }
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // const showDatePicker = () => {
    //     setDatePickerVisibility(true);
    // };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        // setDate(date)
        hideDatePicker();
        const d = moment(date).format('YYYY-MM-DD')
        const Time = moment(date).format('HH:mm:ss ')
        console.log('date', d);
        // return false
        setSLoding(true)
        scheduleVisit(d, Time, 'Schedule')
    };
    {/** Date Time & Modal  End*/ }

    const { userData } = useSelector(state => state.User);

    const [data, setData] = useState([])

    const [filter, setFilter] = useState('');
    const [problem, setProblem] = useState('');
    const [age, setAge] = useState('');
    const [patientName, setPatientName] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [price, setPrice] = useState('')
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [checked, setChecked] = React.useState(false);
    const [doctorId, setDoctorId] = useState([]);

    const [loading, setloading] = React.useState(false);
    const [SLoding, setSLoding] = useState(false)


    async function ImmediateVisit() {
        // const d = new Date();
        // console.log(d);
        const d = moment().format('YYYY-MM-DD')
        const Time = moment(d).format('HH:mm:ss ')
        console.log('date', d);
        console.log('date', d);

        scheduleVisit(d, Time, 'Immediate')
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);

    };
    {/*** All Function here */ }
    // console.log('ssSSS', props.route.params.cat_id);
    useEffect(() => {
        fetchLookingData()
    }, [])
    useEffect(() => {
        // console.log('ssss--->>',props.route.params.price);
        // console.log('ssss3--->>',props.route.params.item);
        if (props.route.params.servicesId == null) {
            setShowFilter(true)
        } else {
            if (props.route.params.servicesId == 1) {
                setPrice(600)
                console.log('Price', 600);
            } else if (props.route.params.servicesId == 2) {
                setPrice(600)
                console.log('Price', 600);
            } else if (props.route.params.servicesId == 3) {
                setPrice(500)
                console.log('Price', 500);
            }
            else {
                setPrice(props.route.params.price)
            }

            console.log('Type', props.route.params.servicesId);
            setShowFilter(false)
            setFilter(props.route.params.servicesId)

        }
    }, [])

    useEffect(() => {
        console.log('filterData', data);
        data.map(d => {
            if (d.id == filter) {
                setPrice(d.price)
                console.log(d.price);
            }
        })
    }, [filter])


    useEffect(() => {
        // fetchDoctor()
        getCopunCode()
    }, [])





    const DropwownMenu = () => {
        return (

            <Picker
                style={{
                    width: '100%',
                    color: "#000000",
                    alignSelf: "center"
                }}
                selectedValue={filter}
                onValueChange={val => setFilter(val)
                }>

                <Picker.Item label="select service" value="" />
                {data.map((d) => <Picker.Item label={d.type} value={d.id} />)}



            </Picker>

        );

    }
    async function upLodeImage(image) {
        try {
            setLoader(true)
            let result = await HomeService.UpFile(image, { type: 'prescription' });
            console.log(result);
            setImageUri(result.data);
            setLoader(false)
        } catch (error) {
            console.log(error);
        }

    }

    const openGalary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 200,
            cropping: true
        }).then(image => {
            console.log(image);
            upLodeImage(image)
            // setImageUri(image.path);
            //props.onChange?.(image);
        });
    };


    const fetchLookingData = async () => {

        let result = await HomeService.getLookingFor()
        if (result && result.status) {
            setData(result.data)
        }

    }


    const requestDoc = async (d) => {
        let data = {
            booking_id: d.invoice_no,
            doctor_id: doctorId,
            user_id: userData.id
        }
        console.log('datareq', data)
        let result = await HomeService.reqdoc(data);
        console.log('dataresult', result)

        if (result && result.status) {
            setloading(false)
            Alert.alert('Success !', 'Booking Successful', [
                {
                    text: 'OK',
                    onPress: () => Navigation.navigate('Home'),
                },
            ]);

        } else {
            Alert.alert('Error !', 'Something Wrong', [
                {
                    text: 'OK',
                    onPress: () => console.log('ok'),
                },
            ]);

        }
    }
    const fetchDoctor = async () => {
        let data = {
            visit_type: 3,

        }

        let result = await HomeService.getDoctot(data);
        // console.log(result);
        if (result && result.status) {

            let arr = result.data.map(element => {
                return element.id
                // console.log(element);


            });
            setDoctorId(arr)
            console.log(arr);
        } else {

        }
    }



    async function onSubmit(Newprice) {

        console.log('Newprice', Newprice);
        // return 
        var options = {
            description: 'Credits towards consultation',
            image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
              key: 'rzp_live_rGOZJaP9wh17YN',
            // key: 'rzp_test_NnEIrnpI7mg51n',
            amount: Number(Newprice ? Newprice : price) * 100,
            name: 'MRC',
            // order: 'order_DslnoIgkIDL8Zt',
            prefill: {
                email: userData.email,
                contact: userData.phone,
                name: userData.name
            },
            theme: { color: '#00BFFF' },
        };
        let payment = await RazorpayCheckout.open(options)
        console.log(payment.error)
        // return
        if (payment.error) {
            return
        }
        setLoader(true)
        let result = await HomeService.bookDoctor({ ...AllData, fees: Newprice ? Newprice : price, razorpay_payment: payment.razorpay_payment_id })
        console.log('res---', result);
        if (result && result.status) {
            setloading(false)
            setSLoding(false)
            setLoader(false)
            Toast.show('Upload Successful & Requesting For Doctor', Toast.SHORT, ['UIAlertController']);
            Navigation.navigate('Home')
            // requestDoc(result.data)  
            // HomeService.bookDoctor(result.data)

        } else {
            // setLoader(false)
            Alert.alert('Error !', JSON.stringify(result), [
                {
                    text: 'OK',
                    onPress: () => console.log('ok'),
                },
            ]);
            Toast.show('All Fields Require!!!', Toast.SHORT, ['UIAlertController']);
        }
    }
    const scheduleVisit = async (schedule_date, time = 'null', p_type) => {
        // if (checked == false) {
        //     Toast.show('please check the terms and conditions checkbox' , ['UIAlertController']);
        //     // console.log('please enter ' + key);
        //     return
        //   }
        // setloading(true)
        console.log('props.route.params', props.route.params);

        let data1 = {
            // props.route.params.cat_id
            cat_id: props.route.params.cat_id,
            visit_type: props.route.params.servicesId,
            patient_id: userData.id,
            patient_name: patientName,
            age: age,
            gender: gender,
            problem: problem,
            address: address,
            prescription: imageUri == '' ? 'null' : imageUri,
            fees: price,
            schedule_date: schedule_date,
            schedule_time: time,
            p_type: p_type,
            pathology_id: props.route.params.servicesId == 0 ? null : props.route.params.pathology_id
        }
        console.log('Send data>>>>', data1);
        // return false
        for (const key in data1) {
            if (data1[key] == '') {
                Toast.show('please enter ' + key, Toast.SHORT, ['UIAlertController']);
                console.log('please enter ' + key);
                return
            }
        }
        console.log('res---', data1);
        setCupponModal(true)
        setAllData(data1)


    }


    async function getCopunCode() {
        let res = await HomeService.coupon()
        console.log('des', res);
        if (res.status) {
            setAllcopun(res.data.filter(f => f.coupon_id != null))
        }
    }

    async function SubmitCoupon() {
        let cop = Allcopun.filter(fdta => fdta.name == CouponCode)
        console.log(cop);
        if (cop.length > 0) {
            // console.log('no no');
            console.log('price', price);
            // let p = 
            if (price > cop[0].discount_value) {
                console.log('enter', price - cop[0].discount_value);
                onSubmit(price - cop[0].discount_value)
            } else {
                Toast.show('No Copuon Available')
            }
        } else {
            Toast.show('No Copuon Available')
        }
    }

    {/** Main Ui Code Body Start */ }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            <Header
                name={props.route.params.Tittle ? props.route.params.Tittle : 'Home Care Doctor Booking'}
            />

            {/* <View style={{
                width: 100,
                height: 100
            }}>
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color='green'
                    ariaLabel='three-dots-loading'
                    wrapperStyle
                    wrapperClass
                />
            </View> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={CupponModal}
                // visible={true}
                statusBarTranslucent={true}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    // setModalVisible(!modalVisible);
                }}
            >
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#000000ab"
                }}>
                    <View style={{
                        width: "90%",
                        paddingBottom: 30,
                        backgroundColor: "#fff",
                    }}>
                        <AntDesign onPress={() => setCupponModal(false)} size={26} color='#333' name='close' style={{
                            position: "absolute",
                            top: 10,
                            right: 10
                        }} />
                        <TextInput
                            value={CouponCode}
                            onChangeText={v => setCouponCode(v)}
                            placeholderTextColor={'#333'}
                            placeholder='Enter Your coupon Code' style={{
                                width: "90%",
                                alignSelf: "center",
                                backgroundColor: "#fff",
                                elevation: 4,
                                borderRadius: 10,
                                marginTop: 40
                            }} />
                        <Pressable onPress={SubmitCoupon} style={{
                            width: "90%",
                            alignSelf: "center",
                            backgroundColor: "#00a3e0",
                            elevation: 4,
                            borderRadius: 10,
                            marginTop: 20,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 19,
                                fontWeight: "600"
                            }} >
                                Submit
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => onSubmit(price)} style={{
                            width: "90%",
                            alignSelf: "center",
                            backgroundColor: "#ff6b00",
                            elevation: 4,
                            borderRadius: 10,
                            marginTop: 20,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 19,
                                fontWeight: "600"
                            }} >
                                Submit without Coupon Code
                            </Text>
                        </Pressable>
                        {/* <Text>kjdhdffdg</Text>
<Text>
    {Allcopun.map(a =>  <Text>{a.name} </Text> )}
</Text> */}
                    </View>
                </View>
            </Modal>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* <Text style={{
                    color: '#000000', fontSize: mdscale(14),
                    fontFamily: Font.Bold, textAlign: 'center',
                    marginTop: mdscale(15)
                }}>
                    Please fill the from below</Text>
                {ShowFilter == true ?
                    <View style={styles.pickerBox}>
                        <DropwownMenu />
                    </View> : <></>} */}

                <Text style={{
                    color: COLORS.textColor,
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: mdscale(10),
                    marginLeft: mdscale(20),
                    fontFamily: Font.Bold

                }}> Patient's Name</Text>

                <View style={styles.inputBoxS}>
                    <TextInput
                        value={patientName}
                        onChangeText={val => setPatientName(val)}
                        placeholder="Name"
                        placeholderTextColor="#a8aabe"
                        style={{
                            //fontWeight: 'bold',
                            color: "#000000",
                            width: '90%',
                            height: '100%',
                            //backgroundColor: 'red',

                        }}
                    />

                </View>

                {/**Age */}

                <Text style={{
                    color: COLORS.textColor,
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: mdscale(10),
                    marginLeft: mdscale(20),
                    fontFamily: Font.Bold

                }}> Patient's Age</Text>

                <View style={styles.inputBoxS}>
                    <TextInput
                        value={age}
                        onChangeText={val => setAge(val)}
                        placeholder="Patient Age"
                        keyboardType='number-pad'
                        placeholderTextColor="#a8aabe"
                        style={{
                            //fontWeight: 'bold',
                            color: "#000000",
                            width: '90%',
                            height: '100%',
                            //backgroundColor: 'red',

                        }}
                    />

                </View>

                {/** Gender */}


                <Text style={{
                    color: COLORS.textColor,
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: mdscale(10),
                    marginLeft: mdscale(20),
                    fontFamily: Font.Bold

                }}> Patient's Gender</Text>

                <View style={{
                    flexDirection: "row",
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center"
                }}>
                    <RadioBox
                        show={gender == 'male' ? true : false}
                        Change={(v) => setGender(v)}
                        value='male' />
                    <Text style={{
                        color: "#000",
                        marginHorizontal: 10
                    }}>Male</Text>
                    <RadioBox show={gender == 'female' ? true : false} Change={(v) => setGender(v)} value='female' />
                    <Text style={{
                        color: "#000",
                        marginHorizontal: 10
                    }}>Female</Text>
                </View>

                <Text style={{
                    color: COLORS.textColor,
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: mdscale(10),
                    marginLeft: mdscale(20),
                    fontFamily: Font.Bold

                }}>Your health problem</Text>

                <View style={styles.inputBoxL}>
                    <TextInput
                        value={problem}
                        onChangeText={val => setProblem(val)}
                        placeholder="Comment.."
                        placeholderTextColor="#a8aabe"
                        style={{
                            //fontWeight: 'bold',
                            color: "#000000",
                            width: '90%',
                            height: vrscale(60),
                            // backgroundColor: 'red',
                            textAlignVertical: 'top'
                        }}
                    />
                </View>

                <Text style={{
                    color: COLORS.textColor,
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: mdscale(10),
                    marginLeft: mdscale(20),
                    fontFamily: Font.Bold

                }}>Address: </Text>

                <View style={styles.inputBoxL}>
                    <TextInput
                        value={address}
                        onChangeText={val => setAddress(val)}
                        placeholder=" Your Address"
                        placeholderTextColor="#a8aabe"
                        style={{
                            //fontWeight: 'bold',
                            color: "#000000",
                            width: '90%',
                            height: '100%',
                            //backgroundColor: 'red',
                            textAlignVertical: 'top'
                        }}
                    />

                </View>



                {/*** Upload Prescription */}

                <Text style={{
                    marginLeft: 20,
                    marginTop: mdscale(10),
                    fontSize: mdscale(16),
                    fontFamily: Font.Medium,
                    color: '#a8aabe'
                }}>Upload Prescription</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Pressable
                        onPress={() => { openGalary() }}
                        style={styles.button}>
                        <FontAwesome name='file-photo-o' color={'#fff'} size={15} />
                        <Text style={styles.buttonText}>Upload</Text>
                    </Pressable>
                    <Text style={{
                        fontSize: mdscale(16),
                        fontFamily: Font.Medium,
                        color: '#999'
                    }}>
                        {imageUri}
                    </Text>
                    {/* <View style={{
                        //backgroundColor: 'red',
                        height: 30, width: 50,
                        marginLeft: 8, marginTop: 10
                    }}>
                        <Image style={{ height: 30, width: 50 }} source={{ uri: "https://new.easytodb.com/Healthcare/public/patient_img/" + imageUri }} />
                    </View> */}

                </View>


                {/** Turms&condition Box */}

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.label}>I/Patient(or Attender) hereby gives
                        consesent to the assessment, Treatment and care Plan by the Doctor(s)
                        /Professional(s) from "My Rehab Care".
                    </Text>
                </View>



                {/*** Main Upload Button **************/}
                {

                }
                <Pressable
                    onPress={() => checked ? ImmediateVisit() : ""}
                    style={{ ...styles.buttonImmediate, backgroundColor: checked == true ? COLORS.HeaderColor : '#a3e5ff', }}>

                    {loading ? (
                        <ActivityIndicator size="small" color={'#c0c0c0'} />
                    ) : (
                        <Text style={styles.buttonTextL}>Immediate Visit</Text>
                    )}

                </Pressable>


                <Pressable
                    onPress={() => checked ? showDatePicker() : ""}
                    style={{ ...styles.buttonSchedule, backgroundColor: checked == true ? '#ff6b00' : '#ff9899', }}>
                    <Text style={styles.buttonTextL}>Schedule Visit</Text>
                </Pressable>

                <DateTimePickerModal
                    minimumDate={new Date()}
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={Loader}
                // visible={true}
                onRequestClose={() => {
                }}
                statusBarTranslucent={true}

            >
                <View style={{
                    flex: 1,
                    // width: windowWidth,
                    // height: windowHeight,
                    backgroundColor: "#000000ab",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <ActivityIndicator size='large' color={'#c0c0c0'} />
                </View>
            </Modal>

        </View>
    )
}

export default DoctorBooking

const styles = StyleSheet.create({

    pickerBox: {
        width: '90%',
        height: mdscale(40),
        //backgroundColor: 'green',
        borderBottomWidth: 1,
        borderColor: '#000000',
        marginTop: 20,
        alignSelf: 'center',
    },
    photoContainer: {
        width: '95%',
        height: mdscale(100),
        marginTop: 10,
        alignSelf: 'center',
        //backgroundColor: '#bbe6ec',
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        backgroundColor: COLORS.HeaderColor,
        width: '27%',
        height: mdscale(40),
        borderRadius: 8,
        justifyContent: 'center',
        marginLeft: mdscale(20),
        alignItems: 'center',
        fontSize: 25,
        flexDirection: 'row',
    },
    buttonTime: {
        backgroundColor: COLORS.HeaderColor,
        width: '27%',
        height: mdscale(44),
        borderRadius: 8,
        justifyContent: 'center',
        marginLeft: mdscale(20),
        alignItems: 'center',
        fontSize: 25,

        flexDirection: 'row', alignItems: 'center',
    },
    buttonText: {
        fontSize: mdscale(14),
        //fontWeight: '10',
        color: '#f7f4f5',
        // textAlign: 'center',
        //alignItems: 'center',
        fontFamily: Font.Medium,
        marginLeft: 10
    },
    inputBoxL: {
        backgroundColor: '#e9ebef',
        alignSelf: 'center',
        height: vrscale(60),
        width: '90%',
        borderRadius: 4,
        marginTop: 10,
        //alignItems: 'center',
        paddingStart: mdscale(15),
        borderColor: COLORS.HeaderColor,
        borderWidth: 0.7
    },
    inputBoxAdd: {},

    inputBoxS: {
        backgroundColor: '#e9ebef',
        //alignSelf: 'center',
        marginLeft: mdscale(20),
        height: vrscale(40),
        width: '90%',
        borderRadius: 4,
        marginTop: 10,
        //alignItems: 'center',
        paddingStart: mdscale(15),
        borderColor: COLORS.HeaderColor,
        borderWidth: 0.7
    },
    buttonImmediate: {

        width: '90%',
        height: mdscale(40),
        borderRadius: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: 25,
        marginTop: vrscale(10),
    },

    buttonSchedule: {

        width: '90%',
        height: mdscale(40),
        borderRadius: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: 25,
        marginTop: vrscale(10),
        marginBottom: 25
    },

    buttonTextL: {
        fontSize: mdscale(16),
        //fontWeight: '10',
        color: '#f7f4f5',
        // textAlign: 'center',
        //alignItems: 'center',
        fontFamily: Font.Medium
    },

    ageInputBox: {
        backgroundColor: '#e9ebef',
        width: '17%',
        height: mdscale(40),
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: mdscale(5),
        marginLeft: mdscale(15),
        alignItems: 'center',
        fontSize: 25,
        borderColor: COLORS.HeaderColor,
        borderWidth: 0.7
    },
    checkboxContainer: {
        flexDirection: 'row',
        width: '95%', alignSelf: 'center',

        marginTop: 6,
        alignItems: 'center',
        //backgroundColor: 'red',
    },
    label: {
        color: '#000000',
        fontSize: mdscale(12), fontFamily: Font.Regular,

    },
})