// import moment from 'moment';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import moment from 'moment';
import { moderateScale } from '../../PixelRatio';
import { COLORS } from '../../Constant/Colors';
import { Font } from '../../Constant/FontFamily';

const MsgComponent = props => {
  const {sender, massage, roomId, sendTime, time, tstatus, image} = props;
  // console.log('senderrrrrrrr', moment(time).format());

  return (
    <View style={{marginVertical: 5}}>
      {/* <View
                style={[styles.TriangleShapeCSS,
                sender ?
                    styles.right
                    :
                    [styles.left]
                ]}
            /> */}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: sender ? 'flex-end' : 'flex-start',
        }}>
        {!sender ? (
          <View
            style={[
              styles.time,
              {
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginLeft: moderateScale(10),
                // borderWidth:1,
                // backgroundColor: sender ? '#C9C9C9' : '#DADADA'
              },
            ]}>
            <Image
              source={{uri: image}}
              style={{
                borderRadius: 40,
                opacity: 0.8,
                height: 40,
                width: 40,
                resizeMode: 'cover',
              }}
            />
          </View>
        ) : null}
        <View
          style={[
            styles.masBox,
            {
              // borderWidth: 1,
              backgroundColor: sender
                ? COLORS.HeaderColor
                : COLORS.white,
              borderBottomLeftRadius: sender ? 16 : 0,
              borderBottomRightRadius: sender ? 0 : 16,
            },
          ]}>
          <Text
            style={{
              paddingLeft: 5,
              color: sender ? COLORS.white : '#0C0020',
              fontFamily: Font.Medium,
              fontSize: 12,
              lineHeight: moderateScale(15),
            }}>
            {massage}
          </Text>
        </View>
      </View>
      <View
          style={{
            alignSelf: sender ? 'flex-end' : 'flex-start',
            marginLeft: sender ?15:65,
            marginRight: 15,
          }}>
          <Text style={{...styles.timeText, color: '#000'}}>
            {moment(time).format('hh:mm a')}
          </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  masBox: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    minWidth: 80,
    maxWidth: '70%',
    paddingHorizontal: 10,
    marginVertical: 5,
    padding: moderateScale(10),
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  Img: {
    position: 'absolute',
    top: moderateScale(22),
    left: moderateScale(22),
  },
  time: {
    alignSelf: 'flex-end',
  },
  timeText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 7
},
  dayview: {
    alignSelf: 'center',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.white,
    borderRadius: 30,
    marginTop: 10,
  },
  iconView: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLORS.themecolor,
  },
  TriangleShapeCSS: {
    position: 'absolute',
    // top: -3,
    width: 0,
    height: 0,
    // borderBottomLeftRadius:5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 5,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // borderBottomColor: '#757474'
  },
  left: {
    // borderBottomColor: COLORS.darksky,
    left: 2,
    bottom: 10,
    transform: [{rotate: '0deg'}],
  },
  right: {
    borderBottomColor: 'green',
    right: 2,
    // top:0,
    bottom: 5,
    transform: [{rotate: '103deg'}],
  },
});

export default MsgComponent;
