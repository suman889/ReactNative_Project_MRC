import { StyleSheet, Text, View, FlatList, Image, Pressable,Dimensions } from 'react-native'
import React from 'react';
import { COLORS } from '../../Constant/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { mdscale, moderateScale } from '../../PixelRatio';
import Navigation from '../../Service/Navigation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CatagoryCard = ({ passData, url,servicesId,Tittle }) => {

    const CardRender = ({ item, index }) => {
        // console.log('sssss',  item);
        return (
            <Pressable onPress={() =>{
                if (item.name == 'Pharmacy') {
                    Navigation.navigate("Medicen_booking")
                }else{
                 Navigation.navigate('DoctorBooking', { cat_id: item.id, servicesId: servicesId ,price:item.price ,item:item,Tittle:Tittle?Tittle:null })
                }
                 }}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#00b6ff', '#00b6ff']}
                    style={styles.smallBox}>
                    <Image source={{ uri: url + item.image }}
                        style={{
                            height: 50, width: 50, borderRadius: 100,
                            marginHorizontal:15
                            //photoModeResize: 'content'
                        }}
                    />

                    <Text
                        numberOfLines={2}
                        style={{
                            color: '#ffffff',
                            fontSize: 15, textAlign: 'center',fontWeight:"600"
                        }}> {item.name}</Text>

                </LinearGradient>
            </Pressable>
        );
    };






    return (
        <View style={{}}>
            <FlatList
                contentContainerStyle={
                    {
                        alignItems:"center",
                        justifyContent:"center",

                    }
                }
                showsVerticalScrollIndicator={false}
                data={passData}
                renderItem={CardRender}
                //console.log(CardRender)
                keyExtractor={item => item.id}
                style={{marginBottom:61}}
            />
           
        </View>
    )
}

export default CatagoryCard

const styles = StyleSheet.create({
    smallBox: {
        width: windowWidth-20,
        height: 70,
        backgroundColor: COLORS.HeaderColor,
        borderRadius: 7,
        alignItems: 'center',
        flexDirection:"row",
        padding: 5,
        marginVertical:7,
        elevation:3,

    },
})