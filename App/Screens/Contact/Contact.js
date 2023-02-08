import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import Header from '../../Component/Global/Header'
import { COLORS } from '../../Constant/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { mdscale, vrscale } from '../../PixelRatio';
import { Font } from '../../Constant/FontFamily'
import HomeService from '../../Service/HomeService';


const Contact = () => {
    const [AllData, setAllData] = useState({
        address: "",
        phone: "",
        email: "",
    })
    useEffect(() => {
      HomeService.contact_us()
      .then(d =>{
        if (d.status == true) {
            setAllData(d.data);
        }
      })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
            <Header
                name='Contact Us'
            />

            <View style={{
                alignSelf: 'center',
                marginTop: vrscale(50)
            }}>
                <Entypo name='chat' color={'#e86441'}
                    size={mdscale(80)} />
            </View>

            <View style={{
                width: '90%',
                paddingHorizontal: 20
            }}>
                <Text style={{
                    color: COLORS.textColor,
                    fontSize: mdscale(16),
                    fontFamily: Font.Bold,
                    marginTop: 20

                }}> Visit our office:</Text>

                <View style={styles.sectionCard}>
                    <Entypo name='location-pin' color={COLORS.textColor}
                        size={mdscale(20)} style={{ marginLeft: -4 }}
                    />

                    <Text style={{
                        color: '#000000',
                        fontSize: 15,
                        fontFamily: Font.Regular,
                        marginLeft: 8
                    }}>
                          {AllData.address}
                    </Text>

                </View>

                <Text style={{
                    color: COLORS.textColor,
                    fontSize: mdscale(16),
                    fontFamily: Font.Bold,
                    marginTop: 20

                }}> Call us:</Text>

                <View style={styles.sectionCard}>
                    <Entypo name='phone' color={COLORS.textColor}
                        size={mdscale(20)} style={{
                            marginLeft: -4,
                            transform: [{ rotateY: '180deg' }]
                        }}
                    />

                    <Text style={{
                        color: '#000000',
                        fontSize: 15,
                        fontFamily: Font.Regular,
                        marginLeft: 8,
                        marginBottom: 3
                    }}>
                         {AllData.phone}
                    </Text>

                </View>

                <Text style={{
                    color: COLORS.textColor,
                    fontSize: mdscale(16),
                    fontFamily: Font.Bold,
                    marginTop: 20

                }}> Mail us:</Text>

                <View style={styles.sectionCard}>
                    <MaterialIcons name='email' color={COLORS.textColor}
                        size={mdscale(20)} style={{
                            marginLeft: -4,
                            transform: [{ rotateY: '180deg' }]
                        }}
                    />

                    <Text style={{
                        color: '#000000',
                        fontSize: 15,
                        fontFamily: Font.Regular,
                        marginLeft: 8,
                        marginBottom: 3
                    }}>
                           {AllData.email}
                    </Text>

                </View>
            </View>

        </View>
    )
}

export default Contact

const styles = StyleSheet.create({
    sectionCard: {
        flexDirection: 'row',
        marginTop: 20,
        width: '90%',
        //backgroundColor: 'red',
        alignSelf: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
})