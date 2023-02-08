import {
    StyleSheet, Text, View, Dimensions,
    Pressable, TextInput
} from 'react-native'
import React from 'react'
import { COLORS } from '../../Constant/Colors'
import Header from '../../Component/Global/Header'
import { mdscale, vrscale } from '../../PixelRatio'
import { Font } from '../../Constant/FontFamily'

const EditAddress = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            <Header  name='Edit Your Address' />
            <View style={{
                marginTop: 20,
                width: '90%',
                //backgroundColor: 'red',
                alignSelf: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10
            }}>



                <Text style={styles.text_view}>Address Line 1</Text>
                <View style={styles.address_view}>

                    <TextInput
                        placeholder="Type Your Address"
                        placeholderTextColor="#c1c1c1"
                        style={{
                            //fontWeight: 'bold',
                            color: "#000000",
                            width: mdscale(220),
                        }}
                    />
                </View>

                {/**City */}

                <Text style={styles.text_view}>City</Text>
                <View style={styles.address_view}>

                    <TextInput
                        placeholder="Ex.Kolkata"
                        placeholderTextColor="#c1c1c1"
                        style={{
                            //fontWeight: 'bold',
                            color: "#000000",
                            width: mdscale(220),
                        }}
                    />
                </View>

                {/** State*/}

                <Text style={styles.text_view}>State</Text>
                <View style={styles.address_view}>

                    <TextInput
                        placeholder="Ex.Bihar"
                        placeholderTextColor="#c1c1c1"
                        style={{
                            //fontWeight: 'bold',
                            color: "#000000",
                            width: mdscale(220),
                        }}
                    />
                </View>


            </View>



            {/** Zip Code*/}
            <View style={{
                marginTop: 20,
                marginLeft: mdscale(35)
            }}>
                <Text style={{
                    color: '#000000',
                    fontSize: mdscale(15), fontFamily: Font.Bold,

                }}>Zip / Pin Code</Text>
                <View style={styles.zip_view}>

                    <TextInput
                        placeholder="741245"
                        placeholderTextColor="#c1c1c1"
                        keyboardType='numeric'
                        style={{
                            //fontWeight: 'bold',
                            color: "#000000",
                            width: mdscale(220),
                        }}
                    />
                </View>

            </View>

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>

        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({

    text_view: {
        color: '#000000',
        fontSize: mdscale(15), fontFamily: Font.Bold,
        marginLeft: 10,
        marginTop: 10
    },

    address_view: {
        backgroundColor: 'white',
        width: '94%',
        alignSelf: 'center',
        marginTop: mdscale(5),
        borderRadius: 7,
        borderColor: COLORS.HeaderColor,
        borderWidth: 0.7,
        height: vrscale(40),
        //elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: mdscale(15),
    },
    zip_view: {
        backgroundColor: 'white',
        width: '40%',
        //alignSelf: 'center',
        marginTop: mdscale(5),
        borderRadius: 7,
        borderColor: COLORS.HeaderColor,
        borderWidth: 0.7,
        height: vrscale(40),
        //elevation: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: mdscale(15),
    },

    button: {
        backgroundColor: COLORS.HeaderColor,
        width: '80%',
        height: mdscale(40),
        borderRadius: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: 25,
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