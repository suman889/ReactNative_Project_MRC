import {
  StyleSheet, Text, View, Image, Pressable,
  TextInput, ScrollView, ToastAndroid, Alert, Button, ActivityIndicator, Dimensions, Modal,
} from 'react-native'

import React, { useState, useEffect } from 'react'
import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'
import { mdscale, vrscale } from '../../PixelRatio'
import { Font } from '../../Constant/FontFamily';
import { Picker } from '@react-native-picker/picker';
import Navigation from '../../Service/Navigation';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import HomeService from '../../Service/HomeService';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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

const Medicen_booking = () => {
  const [Loader, setLoader] = useState(false)
  const [loader, setloader] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const { userData } = useSelector(state => state.User);
  const [RadioData, setRadioData] = useState('Pickup')
  const [Gender, setGender] = useState('')
  const [imageUri, setImageUri] = useState('');
  const [MedicineName, setMedicineName] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: "",
    n7: "",
    n8: "",
  })
  const [MedicineQuantity, setMedicineQuantity] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: "",
    n7: "",
    n8: "",
  })
  const [AllData, setAllData] = useState({
    patient_id: userData.id,
    patient_name: "",
    age: "",
    gender: "",
    address: "",
    // prescription: "test.img",
    // delivery_type: "",
  })
  // console.log(userData.id);
  async function upLodeImage(image) {
    try {
      let result = await HomeService.UpFile(image, { type: 'prescription' });
      console.log(result);
      setImageUri(result.data);
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


      //props.onChange?.(image);
    });
  };
  async function SendData() {
    for (const key in AllData) {
      if (AllData[key] == '') {
        Toast.show('please enter ' + key, Toast.SHORT, ['UIAlertController']);
        console.log('please enter ' + key);
        return
      }
    }
    // if (checked == false) {
    //   Toast.show('please check the terms and conditions checkbox' , ['UIAlertController']);
    //   // console.log('please enter ' + key);
    //   return
    // }
    let MedicineNameArry = []
    for (const key in MedicineName) {
      if (!MedicineName[key] == '') {
        MedicineNameArry = [...MedicineNameArry, MedicineName[key]]
      }
    }
    let MedicineQuantityArry = []
    for (const key in MedicineQuantity) {
      if (!MedicineQuantity[key] == '') {
        MedicineQuantityArry = [...MedicineQuantityArry, MedicineQuantity[key]]
      }
    }
    console.log(AllData);
    // if (imageUri == '') {
    //   Toast.show('Upload Prescription', Toast.SHORT, ['UIAlertController']);
    //   return
    // }
    console.log('MedicineName', MedicineNameArry);
    console.log('MedicineQuantity', MedicineQuantityArry);
    setLoader(true)
    let res = await HomeService.medicen_booking({
      ...AllData,
      delivery_type: RadioData,
      medicen_name: MedicineNameArry,
      qty: MedicineQuantityArry,
      prescription: imageUri
    })
    console.log('res', res);
    if (res.status == true) {
      setLoader(false)
      Toast.show('Booking Success', Toast.SHORT, ['UIAlertController']);
      Navigation.back()
    } else {
      setLoader(false)
      Alert.alert('Error !', JSON.stringify(res), [
        {
          text: 'OK',
          onPress: () => console.log('ok'),
        },
      ]);
    }
  }
  useEffect(() => {
    setAllData({ ...AllData, gender: Gender })
  }, [Gender])

  return (
    <View style={{
      flex: 1,
    }}>

      <Header
        back={true}
        name='Medicine booking'
      />
      <ScrollView>
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
            value={AllData.patient_name}
            onChangeText={val => setAllData({ ...AllData, patient_name: val })}
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
        <Text style={{
          color: COLORS.textColor,
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: mdscale(10),
          marginLeft: mdscale(20),
          fontFamily: Font.Bold,
        }}> Age</Text>
        <View style={styles.inputBoxS}>
          <TextInput
            value={AllData.age}
            onChangeText={val => setAllData({ ...AllData, age: val })}
            placeholder="Age"
            keyboardType='number-pad'
            placeholderTextColor="#a8aabe"
            style={{
              color: "#000000",
              width: '90%',
              height: '100%',
            }}
          />

        </View>
        <Text style={{
          color: COLORS.textColor,
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: mdscale(10),
          marginLeft: mdscale(20),
          fontFamily: Font.Bold,
        }}> Gender</Text>
        <View style={{
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          alignItems: "center"
        }}>
          <RadioBox
            show={Gender == 'male' ? true : false}
            Change={(v) => setGender(v)}
            value='male' />
          <Text style={{
            color: "#000",
            marginHorizontal: 10
          }}>Male</Text>
          <RadioBox show={Gender == 'female' ? true : false}
            Change={(v) => setGender(v)} value='female' />
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
          fontFamily: Font.Bold,
        }}> Address</Text>
        <View style={styles.inputBoxS}>
          <TextInput
            value={AllData.address}
            onChangeText={val => setAllData({ ...AllData, address: val })}
            placeholder="Address"
            placeholderTextColor="#a8aabe"
            style={{
              color: "#000000",
              width: '90%',
              height: '100%',
            }}
          />
        </View>
        <Text style={{
          color: COLORS.textColor,
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: mdscale(10),
          marginLeft: mdscale(20),
          fontFamily: Font.Bold,
        }}>Delivery Type</Text>
        <View style={{
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          alignItems: "center"
        }}>
          <RadioBox
            show={RadioData == 'Pickup' ? true : false}
            Change={(v) => setRadioData(v)}
            value='Pickup' />
          <Text style={{
            color: "#000",
            marginHorizontal: 10
          }}>Pickup</Text>
          <RadioBox show={RadioData == 'Delivery' ? true : false} Change={(v) => setRadioData(v)} value='Delivery' />
          <Text style={{
            color: "#000",
            marginHorizontal: 10
          }}>Delivery</Text>
        </View>
        <Text style={{
          fontSize: mdscale(16),
          marginLeft: 20,
          marginTop: mdscale(10),
          fontFamily: Font.Medium,
          color: '#a8aabe'
        }}>Upload Prescription</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Pressable
            onPress={() => { openGalary() }}
            style={styles.button}>
            <FontAwesome name='file-photo-o' color={'#fff'} size={15} />
            <Text style={{...styles.buttonText,marginLeft:10}}>Upload</Text>
          </Pressable>
          <Text style={{
            fontSize: mdscale(16),
            fontFamily: Font.Medium,
            color: '#999',
            marginLeft: 10
          }}>
            {imageUri}
          </Text>
          {/* <View style={{
            //backgroundColor: 'red',
            height: 30, width: '60%',
            marginLeft: 8, marginTop: 10
          }}>
            <Image source={{ uri: imageUri }} />
          </View> */}

        </View>
        <Text style={{
          color: COLORS.textColor,
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: mdscale(10),
          marginLeft: mdscale(20),
          fontFamily: Font.Bold,
        }}>If you don't have Prescription, please connect hear :</Text>
        <Pressable
          onPress={() => Navigation.navigate('WevView', { link: "https://calendly.com/myrehabcare/30?month=2022-09" })}
          style={styles.button}>
          {/* <FontAwesome name='file-photo-o' color={'#fff'} size={15} /> */}
          <Text style={styles.buttonText}>Click Here</Text>
        </Pressable>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>

          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineName.n1}
              onChangeText={val => setMedicineName({ ...MedicineName, n1: val })}
              placeholder="Medicine Name"
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
          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineQuantity.n1}
              onChangeText={val => setMedicineQuantity({ ...MedicineQuantity, n1: val })}
              placeholder="Quantity"
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
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>

          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineName.n2}
              onChangeText={val => setMedicineName({ ...MedicineName, n2: val })}
              placeholder="Medicine Name"
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
          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineQuantity.n2}
              onChangeText={val => setMedicineQuantity({ ...MedicineQuantity, n2: val })}
              placeholder="Quantity"
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
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>

          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineName.n3}
              onChangeText={val => setMedicineName({ ...MedicineName, n3: val })}
              placeholder="Medicine Name"
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

          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineQuantity.n3}
              onChangeText={val => setMedicineQuantity({ ...MedicineQuantity, n3: val })}
              placeholder="Quantity"
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
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>

          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineName.n4}
              onChangeText={val => setMedicineName({ ...MedicineName, n4: val })}
              placeholder="Medicine Name"
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
          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineQuantity.n4}
              onChangeText={val => setMedicineQuantity({ ...MedicineQuantity, n4: val })}
              placeholder="Quantity"
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
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>

          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineName.n5}
              onChangeText={val => setMedicineName({ ...MedicineName, n5: val })}
              placeholder="Medicine Name"
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
          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineQuantity.n5}
              onChangeText={val => setMedicineQuantity({ ...MedicineQuantity, n5: val })}
              placeholder="Quantity"
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
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>

          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineName.n6}
              onChangeText={val => setMedicineName({ ...MedicineName, n6: val })}
              placeholder="Medicine Name"
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
          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineQuantity.n6}
              onChangeText={val => setMedicineQuantity({ ...MedicineQuantity, n6: val })}
              placeholder="Quantity"
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
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>

          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineName.n7}
              onChangeText={val => setMedicineName({ ...MedicineName, n7: val })}
              placeholder="Medicine Name"
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
          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineQuantity.n7}
              onChangeText={val => setMedicineQuantity({ ...MedicineQuantity, n7: val })}
              placeholder="Quantity"
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
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>

          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineName.n8}
              onChangeText={val => setMedicineName({ ...MedicineName, n8: val })}
              placeholder="Medicine Name"
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
          <View style={styles.inputBoxS2}>
            <TextInput
              value={MedicineQuantity.n8}
              onChangeText={val => setMedicineQuantity({ ...MedicineQuantity, n8: val })}
              placeholder="Quantity"
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
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
              console.log(checked);
            }}
          />
          <Text style={styles.label}>I/Patient(or Attender) hereby gives
            consesent to the assessment, Treatment and care Plan by the Doctor(s)
            /Professional(s) from "My Rehab Care".
          </Text>
        </View>
        <Pressable
          onPress={() => checked ? SendData() : ""}
          style={styles.buttonImmediate}>
          {
            loader ? <ActivityIndicator size='small' color={'#c0c0c0'} />
              : (<Text style={styles.buttonTextL}>Submit</Text>)
          }
        </Pressable>
        <View style={{
          height: 20
        }} />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Loader}
        onRequestClose={() => {
        }}
        statusBarTranslucent={true}

      >
        <View style={{
          flex: 1,

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

export default Medicen_booking

const styles = StyleSheet.create({
  pickerBox: {
    width: '90%',
    height: mdscale(40),
    //backgroundColor: 'green',
    borderBottomWidth: 1,
    borderColor: '#000000',
    marginTop: 20,
    alignSelf: 'center',
    marginRight: mdscale(30)
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
    marginTop: vrscale(10),
    flexDirection: 'row', alignItems: 'center',
  },
  buttonText: {
    fontSize: mdscale(14),
    //fontWeight: '10',
    color: '#f7f4f5',
    // textAlign: 'center',
    //alignItems: 'center',
    fontFamily: Font.Medium,
    // marginLeft: 10
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
  inputBoxS2: {
    backgroundColor: '#e9ebef',
    //alignSelf: 'center',
    marginLeft: mdscale(20),
    height: vrscale(40),
    width: '43%',
    borderRadius: 4,
    marginTop: 10,
    //alignItems: 'center',
    paddingStart: mdscale(15),
    borderColor: COLORS.HeaderColor,
    borderWidth: 0.7
  },
  buttonImmediate: {
    backgroundColor: COLORS.HeaderColor,
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
    backgroundColor: '#ff6b00',
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
    // height: 50,
    marginTop: 6,
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  label: {
    color: '#000000',
    fontSize: mdscale(12), fontFamily: Font.Regular,

  },
})