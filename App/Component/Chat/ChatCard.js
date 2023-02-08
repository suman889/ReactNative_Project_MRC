//import liraries
import { Icon, Item } from 'native-base';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../Constant/Colors';
import { Font } from '../../Constant/FontFamily';
import { moderateScale } from '../../PixelRatio';
import Navigation from '../../Service/Navigation';

const { height, width } = Dimensions.get('window');

// create a component
const FBChatCard = (props) => {
  const { data } = props;
  const userData = useSelector(state => state.User.userData)

  const goToSingleChat = () => {
      Navigation.navigate('Chat', {roomId: data.roomId, name: `${data.name}`,image:data.image , remoteId: data.userId, remoteData: data})
  }

  return (
    <Pressable
      // onPress={() => Navigation.navigate('FeedProfile', { 'singleData': props.data })}
      onPress = {goToSingleChat}
      style={styles.ViewStyle}>
      <Image
        source={{
          uri: props.data.image
        }}
        style={styles.imgStyle}
      />
      <View style={{ width: '60%' }}>
        <Text style={styles.TextBold}>{props.data.name}</Text>
        <Text style={styles.TextLight} numberOfLines={1}>{props.data.lastMsg}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '20%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>

      </View>
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({
  ViewStyle: {
    // backgroundColor:'red',
    width: width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: moderateScale(10),
    borderBottomWidth:1,
    borderColor:'lightgrey'
  },
  imgStyle: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor:COLORS.black
  },
  TextBold: {
    fontSize: moderateScale(12),
    fontFamily: Font.Bold,
    color: '#000',
  },
  TextLight: {
    fontSize: moderateScale(10),
    marginTop:moderateScale(5),
    fontFamily: Font.Light,
    color: '#323232',
  },
  IconStyle: {
    fontSize: moderateScale(16),
    color: '#888888',
  },
});

//make this component available to the app
export default FBChatCard;
