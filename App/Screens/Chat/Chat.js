//import liraries
import { Icon } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  SectionList,
  StatusBar,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import MsgComponent from '../../Component/Chat/MsgComponent';

import ChatHeader from '../../Component/ChatHeader';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid'
import moment from 'moment';
import { COLORS } from '../../Constant/Colors';
import { moderateScale, verticalScale } from '../../PixelRatio';

const InnerChat = props => {
  const { name, roomId, remoteId, remoteData,image } = props.route.params;

  const userData = useSelector(state => state.User.userData)

  const [msg, setMsg] = useState('');
  const [allMsg, setAllMsg] = useState([]);
  const [refress, setRefress] = useState(false);
  const [loadMore, setLoadMore] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    getAllMsg()
  }, [])

  const getAllMsg = () => {
    database()
      .ref(`/Chat/${roomId}/messages`)
      .limitToLast(10)
      .once('value', snapshot => {
        // console.log("snapshot.exists()", snapshot.exists())
        if (snapshot.exists()) {
          // console.log("Object.values(snapshot.val())", Object.values(snapshot.val()))
          setAllMsg(Object.values(snapshot.val()))
          getFirebaseListener(Object.values(snapshot.val()))
        } else {
          getFirebaseListener([])
          setLoadMore(false)
          setHasMore(false)
        }
      })
  }

  const msgvalid = txt => txt && txt.replace(/\s/g, '').length;
  const sendMessage = () => {
    if (msg == '' || msgvalid(msg) === 0) {
      return false;
    }
    let utcTime = moment().utc().format().split('Z')
    let smsdata = {
      roomId: roomId,
      msgId: uuid.v4(),
      sender_id: userData.id,
      message: msg,
      send_time: `${utcTime[0]}+00:00`,
      name: `${userData.name}`
    };

    const newReference = database()
      .ref(`/Chat/${roomId}/messages/`)
      .push()

    // console.log("newReference", newReference.key)
    smsdata.nodeId = newReference.key
    newReference
      .set(smsdata)

    database()
      .ref(`/chatList/${userData.id}/${remoteId}`)
      .update({
        lastMsgTime: smsdata.send_time,
        lastMsg: smsdata.message
      })

    database()
      .ref(`/chatList/${remoteId}/${userData.id}`)
      .update({
        lastMsgTime: smsdata.send_time,
        lastMsg: smsdata.message
      })

    setMsg('')
  }

  const sorted = () => {
    let a;
    a = allMsg.sort(function (a, b) {
      return b.send_time < a.send_time ? -1
        : b.send_time > a.send_time ? 1
          : 0
    })
    return a;
  }

  const getFirebaseListener = (oldVal) => {
    database()
      .ref(`/Chat/${roomId}/messages`)
      .limitToLast(1)
      .on('child_added', snapshot => {
        if (snapshot.exists()) {
          let fbData = snapshot.val()
          let msgIndex = oldVal.findIndex(it => it.msgId == fbData.msgId)
          if (msgIndex == -1) {
            setAllMsg(msg => [fbData, ...msg])
          }
        }
      })
  }

  const listFooter = () => {
    return (
      <View style={{ marginVertical: 20 }}>
        {
          loadMore ?
            <ActivityIndicator
              size="small"
              color={COLORS.iaaHeadercolor}
            />
            :
            null
        }

      </View>
    )
  }

  const getNextChat = () => {
    if (hasMore) {
      setLoadMore(true)
      let arrLength = sorted().length
      let lastKeyRef = sorted()[arrLength - 1].nodeId
      // console.log("lastKeyRef", lastKeyRef)
      database()
        .ref(`/Chat/${roomId}/messages`)
        .orderByKey()
        .limitToLast(11)
        .endAt(lastKeyRef)
        .once('value', snapshot => {
          console.log("snapshot", snapshot.exists())
          if (snapshot.exists()) {
            let fbData = Object.values(snapshot.val())
            let finalArr = fbData.filter(it => it.nodeId != lastKeyRef)
            setAllMsg(msg => [...msg, ...finalArr])
            setLoadMore(false)
            if (finalArr.length == 0) {
              setHasMore(false)
            }
          } else {
            setLoadMore(false)
            setHasMore(false)
          }
        })
    }
  }

  // const { UserPic, name, date} = props.route.params;
  return (
    <View style={styles.container}>
      <ChatHeader
        name={name}
        image={image}
        data = {remoteData}
      />
      <StatusBar
        backgroundColor={COLORS.iaaHeadercolor}
        barStyle="light-content" />
      <ImageBackground
        // source = {require('../../Assets/cahtBackground.jpg')}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.4 }}>
        <FlatList
          style={{ flex: 1 }}
          data={sorted()}
          extraData={refress}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({ item }) => {
            return (
              <MsgComponent
                sender={item.sender_id == userData.id}
                massage={item.message}
                time={item.send_time}
                image={image}
              />
            );
          }}

          onEndReached={getNextChat}
          onEndReachedThreshold={0.01}
          ListFooterComponent={listFooter}
        />
      </ImageBackground>

      <View
        style={{
          backgroundColor: 'white',
          height: verticalScale(62),
          //   borderTopWidth: 4,
          borderTopColor: COLORS.black,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 5,
        }}>
        {/* <Image source={require('../../Assets/Chat/camera.png')}
          style={{
            height: verticalScale(18), width: moderateScale(18),
            resizeMode: 'contain'
          }}
        />
        <Image source={require('../../Assets/Chat/gallery.png')}
          style={{
            height: verticalScale(18), width: moderateScale(18),
            resizeMode: 'contain'
          }}
        />
        <Image source={require('../../Assets/Chat/line.png')}
          style={{
            height: verticalScale(24), width: moderateScale(24),
            resizeMode: 'contain'
          }}
        /> */}
        <View style={styles.TextView}>
          <TextInput
            style={{
              // flex: 1,
              width: '90%',
              // backgroundColor: '#F8F8F8',
              paddingHorizontal: 15,
            }}
            placeholder="type a message"
            value={msg}
            onChangeText={(val) => setMsg(val)}
            // placeholderTextColor = {COLORS.darksky}
            multiline={true}
          />
          {/* <Image source={require('../../Assets/Chat/circle.png')}
            style={{
              height: verticalScale(18), width: moderateScale(18),
              resizeMode: 'contain'
            }}
          /> */}
        </View>
        <TouchableOpacity
          onPress={sendMessage}
        >
                    <Image source={require('../../Assetes/Chat/heart.png')}
            style={{
              height: verticalScale(18), width: moderateScale(18),
              resizeMode: 'contain'
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  TextView: {
    width: '65%',
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center'
  }
});

//make this component available to the app
export default InnerChat;
