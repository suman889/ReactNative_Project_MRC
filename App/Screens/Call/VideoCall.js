//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, BackHandler, Alert, Dimensions, StatusBar, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import Peer from "react-native-peerjs";
import {
    RTCView,
    mediaDevices
} from 'react-native-webrtc';
import database from '@react-native-firebase/database';
import moment from 'moment';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import InCallManager from 'react-native-incall-manager';
import Toast from 'react-native-simple-toast'
import Navigation from '../../Service/Navigation';
import { moderateScale, verticalScale } from '../../PixelRatio';
import { Font } from '../../Constant/FontFamily';
import { COLORS } from '../../Constant/Colors';
import Icon from '../../Constant/Icons';

const { height, width } = Dimensions.get('window');

const configuration = {
    "iceServers":
        [
            { "url": "stun:stun.l.google.com:19302" },
            { "url": 'stun:stun1.l.google.com:19302' },
            { "url": 'stun:stun2.l.google.com:19302' },
            { "url": 'stun:stun3.l.google.com:19302' },
            { "url": 'stun:stun4.l.google.com:19302' },
            {
                url: 'turn:numb.viagenie.ca',
                credential: 'Bokachoda@2020',
                username: 'soumya.webhibe@gmail.com',
            }
        ]
};

var peerServer = null;
var myStream = null;
var remoteUserId = ''
var remoteUserStream = null
var peerCall = null;
var callNodeId = null;
var hour = 0;
var min = 0;
var sec = 0;
var timerRef = null

const VideoCall = (props) => {
    const { remoteUserData, type, navType } = props.route.params;
    const myUserData = useSelector(state => state.User.userData);
    const [recieved, setRecieved] = useState(false);
    const [callState, setCallState] = useState('Connecting')
    const [audio, Setaudio] = useState(false)
    const [loudSpeaker, setLoudSpeaker] = useState(false);
    const [remoteUserToken, setRemoteUserToken] = useState('')
    const [refress, setRefress] = useState(false)
    const [mirror, setMirror] = useState(true)
    // console.log("myUserData", myUserData)
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        getUserMedia();
        if (type == "Incomming") {
            InCallManager.startRingtone('_BUNDLE_');
            // InCallManager.start({ media: 'audio', ringback: '_DTMF_' });
        } else {
            InCallManager.start({ media: 'audio', ringback: '_DTMF_' });
            InCallManager.start({ media: 'audio' });
            // InCallManager.setMicrophoneMute(false);
            InCallManager.turnScreenOn();
        }

        return () => {
            InCallManager.stopRingback();
            InCallManager.stopRingtone();
            InCallManager.stop();
            backHandler.remove();
        };
    }, [])

    useEffect(() => {
        if (callState == 'Recieved') {
            // console.log("call start")
            startTimer()
        }
    }, [callState])

    const startTimer = () => {
        // console.log("charge", charge)
        let re = false
        timerRef = setInterval(() => {
            if (sec < 59) {
                sec = sec + 1
            } else {
                min = min + 1
                sec = 0
            }

            if (min == 60) {
                min = 0
                hour = hour + 1
            }
            setRefress(!re)
            re = !re
        }, 1000);
    }

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to End Call ?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => endCall(false) }
        ]);
        return true;
    }

    const sendNotification = async (data, token) => {
        const FIREBASE_API_KEY =
            'AAAAVOTpQjA:APA91bEqHgbJcLLJU30-1M9spBLMT5p_bWNLjVDDXcqCb8HwnytP_A7ZijxPiXGbOLqZQuT_ofB6ueMVYUxALkbBYDq-VfqYCfzTXFXQc5euq6u0odPlLx-ZR-9jTXYFG_qI11m8d7sf';
        // data.notiType = 'Call';
        const message = {
            registration_ids: [token],
            priority: 'high',
            data: { ...data, notiType: 'Call', callDataType: 'start' },
            notification: {
                title: myUserData.displayName,
                body: 'Incoming Call',
                vibrate: 1,
                sound: 1,
                show_in_foreground: true,
                priority: 'high',
                content_available: true,
            },
        };

        let headers = new Headers({
            'content-type': 'application/json',
            Authorization: 'key=' + FIREBASE_API_KEY,
        });
        let response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers,
            body: JSON.stringify(message),
        });
        response = await response.json();
        console.log('response55555', response, message);
    };

    const sendNotificationEnd = async (token) => {
        const FIREBASE_API_KEY =
            'AAAAVOTpQjA:APA91bEqHgbJcLLJU30-1M9spBLMT5p_bWNLjVDDXcqCb8HwnytP_A7ZijxPiXGbOLqZQuT_ofB6ueMVYUxALkbBYDq-VfqYCfzTXFXQc5euq6u0odPlLx-ZR-9jTXYFG_qI11m8d7sf';
        // data.notiType = 'Call';
        const message = {
            registration_ids: [token],
            priority: 'high',
            data: { notiType: 'Call', callDataType: 'end' },
            title:''
        };

        let headers = new Headers({
            'content-type': 'application/json',
            Authorization: 'key=' + FIREBASE_API_KEY,
        });
        let response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers,
            body: JSON.stringify(message),
        });
        response = await response.json();
        console.log('response55555', response, message);
    };

    const FBGetValue = async (nodeId) => {
        database()
            .ref(`/call/${myUserData.id}/${nodeId}`)
            .on('value', snapshot => {
                let data = snapshot.val();
                // console.log("datadatadata", data)
                setCallState(data.status)
                if (data.status == "Recieved") {
                    InCallManager.stopRingtone();
                    InCallManager.stopRingback();
                }
                if (data.endStatus) {
                    database()
                        .ref('/users/' + remoteUserData.userId)
                        .once('value', (snapshot) => {
                            let remoteToken = snapshot.val().fcmToken

                            sendNotificationEnd(remoteToken)
                            endCall();
                        })
                }
            });
    }

    const getUserMedia = () => {
        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
            // console.log(sourceInfos);
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }
            mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 640,
                    height: 480,
                    frameRate: 30,
                    facingMode: (isFront ? "user" : "environment"),
                    deviceId: videoSourceId
                }
            })
                .then(stream => {
                    initCall(stream)
                })
                .catch(error => {
                    // Log error
                });
        });
    }

    const initCall = (stream) => {
        myStream = stream;
        peerServer = new Peer(undefined, {
            host: '46.101.86.107',
            port: 9000,
            path: '/',
            secure: false,
            config: configuration
        });

        peerServer.on('open', (userId) => {
            console.log("userId", userId)
            // let data = {
            //     userId,
            //     type: 'connectUser'
            // }
            console.log("remoteUserId", remoteUserData)
            if (type == "Incomming") {
                InCallManager.startRingtone('_BUNDLE_');
                callNodeId = remoteUserData.nodeId
                FBGetValue(remoteUserData.nodeId)
                updateMyFb({ status: 'Ringing' })
                updateClientFb({ status: 'Ringing' });
                // connectUser(remoteUserData.peerId)
            } else {
                database()
                    .ref('/users/' + remoteUserData.userId)
                    .once('value', (snapshot) => {
                        console.log("snapshot", snapshot.val())
                        if (snapshot.exists() && !snapshot.val().onCall) {
                            let remoteToken = snapshot.val().fcmToken
                            setRemoteUserToken(remoteToken);

                            database()
                                .ref(`/users/${remoteUserData.userId}`)
                                .update({
                                    onCall: true
                                })

                            database()
                                .ref(`/users/${myUserData.id}`)
                                .update({
                                    onCall: true
                                })

                            let callId = uuid.v4();
                            callNodeId = callId
                            let myData = {
                                userId: remoteUserData.userId,
                                name: `${remoteUserData.firstname} ${remoteUserData.lastname}`,
                                nodeId: callId,
                                time: moment().format(),
                                type: 'Outgoing',
                                status: 'Connecting',
                                endStatus: false,
                                callType: 'videoCall'
                            }
                            database()
                                .ref(`/call/${myUserData.id}/${callId}`)
                                // .ref('/users/' + myUserData.id + '/call/' + callId)
                                .set(myData)
                                .then(() => {
                                    FBGetValue(callId)
                                })

                            let clientData = {
                                userId: myUserData.id,
                                // name: myUserData.displayName,
                                firstname: myUserData.firstname,
                                lastname: myUserData.lastname,
                                peerId: userId,
                                time: moment().format(),
                                type: 'Incomming',
                                status: 'Connecting',
                                nodeId: callId,
                                endStatus: false,
                                callType: 'videoCall'
                            }
                            database()
                                .ref(`/call/${remoteUserData.userId}/${callId}`)
                                // .ref('/users/' + remoteUserData.userId + '/call/' + callId)
                                .set(clientData)
                                .then(() => {
                                    // clientData.displayName = myUserData.displayName
                                    sendNotification(clientData, remoteToken)
                                    // FBGetValue(myRefId)
                                })
                        } else {
                            // Toast.show('Is an another call');
                            InCallManager.stop({ busytone: '_DTMF_' });
                            setCallState('Busy on another call...')
                            setTimeout(() => {
                                endCall(true)
                            }, 2000);
                        }

                    })
            }
        })

        peerServer.on("call", (call) => {
            // console.log("chk stream", call.peer)
            const conn = peerServer.connect(call.peer);
            call.answer(stream);

            // conn.on('open', () => {
            //     conn.send(myData);
            // });

            call.on('stream', (userStream) => {
                console.log("userStream peer", userStream)
                peerCall = call
                remoteUserStream = userStream
                // let data = {
                //     call: call,
                //     stream: userStream
                // }

                // peers[call.peer] = data
                // dispatch({type: ADD_STREAM, payload : userStream})
                // dispatch({ type: ADD_REMOTE_STREAM, payload: userStream })
                // this.props.dispatch(addRemoteStream(userStream))
            })

            call.on('close', () => {
                console.log("streamstream1")
                // dispatch({ type: REMOVE_REMOTE_STREAM, payload: peers[call.peer].stream.id })
                // this.props.dispatch(removeRemoteStream(peers[call.peer].stream.id))
            })
        })
    }

    const connectUser = (userId) => {
        console.log("called")
        let data = {}
        const conn = peerServer.connect(userId);
        const call = peerServer.call(userId, myStream);

        call.on('stream', (remoteVideoStream) => {
            if (remoteVideoStream) {
                peerCall = call
                console.log("user stream", remoteVideoStream)
                remoteUserStream = remoteVideoStream
                // data.stream = remoteVideoStream;
                // dispatch({ type: ADD_REMOTE_STREAM, payload: remoteVideoStream })
                // this.props.dispatch(addRemoteStream(remoteVideoStream))
            }
        })
        call.on('close', () => {
            // console.log("streamstream")
            // dispatch({ type: REMOVE_REMOTE_STREAM, payload: peers[userId].stream.id })
            // this.props.dispatch(removeRemoteStream(peers[userId].stream.id))
        })
    }

    const reciveCall = () => {
        if (callState == 'Ringing') {
            connectUser(remoteUserData.peerId)
            updateMyFb({ status: 'Recieved' })
            updateClientFb({ status: 'Recieved' });
            setRecieved(true)
        } else {
            Toast.show('Please wait call is connecting !!!')
        }

    }

    const endCall = (busy) => {
        remoteUserStream = null;
        clearInterval(timerRef)
        if (!busy) {
            database()
                .ref(`/users/${remoteUserData.userId}`)
                .update({
                    onCall: false
                })

            database()
                .ref(`/users/${myUserData.id}`)
                .update({
                    onCall: false
                })
        }

        hour = 0;
        min = 0;
        sec = 0;

        if (peerCall != null) {
            peerCall.close()
        }
        if (navType == 'close') {
            console.log("Close Called")
            BackHandler.exitApp()
        } else {
            Navigation.back();
        }

    }

    const updateMyFb = (data) => {
        database()
            .ref(`/call/${myUserData.id}/${callNodeId}`)
            // .ref('/users/' + myUserData.id + '/call/' + callNodeId)
            .update(data)
            .then(() => {
                console.log("done")
            })
    }

    const updateClientFb = (data) => {
        database()
            .ref(`/call/${remoteUserData.userId}/${callNodeId}`)
            // .ref('/users/' + remoteUserData.userId + '/call/' + callNodeId)
            .update(data)
            .then(() => {
            })
    }
    const swithCamera = () => {
        myStream.getVideoTracks()[0]._switchCamera()
        setMirror(!mirror)
    }

    const switchAudio = () => {
        InCallManager.setMicrophoneMute(!audio)
        Setaudio(!audio)
    }

    const Loud = () => {
        InCallManager.setSpeakerphoneOn(!loudSpeaker);
        setLoudSpeaker(!loudSpeaker)
    }
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={COLORS.iaaHeadercolor}
            />
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            {/* <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                padding: moderateScale(14), 
                marginHorizontal: moderateScale(10) 
            }}>
                <Image source={require('../../Assetes/logo.png')} style={{height:50,width:50}} />
                <TouchableOpacity onPress={swithCamera}>
                    <Image source={require('../../Assetes/camera.png')} />
                </TouchableOpacity>
            </View> */}
            {
                remoteUserStream ?
                    <RTCView
                        streamURL={remoteUserStream.toURL()}
                        style={styles.Img}
                        mirror={mirror}
                        objectFit="cover"
                    />
                    :
                    <View
                        style={[styles.Img, {
                            justifyContent: 'center',
                            alignItems: 'center'
                        }]}
                    >
                        {
                            callState != 'Recieved' ?
                                <Text
                                    style={{ marginTop: 5, color: '#eaebeb' }}
                                >
                                    {callState} ...
                                </Text>
                                :
                                null
                        }
                    </View>
            }

            {
                myStream ?
                    <RTCView
                        streamURL={myStream.toURL()}
                        style={styles.Img}
                        mirror={mirror}
                        objectFit="cover"
                    />
                    :
                    null
            }

            {/* <ImageBackground
                source={require('../../Assetes/mConnect/p1.png')}
                resizeMode="contain"
                style={styles.Img}>
                <View style={styles.NameSection}>
                    <Text style={styles.Text}>Alena Bator</Text>
                    <Text style={{
                        ...styles.Text,
                        fontSize:moderateScale(10),
                        fontFamily:Font.Regular,
                        opacity:0.8
                        }}>CEO, Sun foundation
                    </Text>

                </View>
            </ImageBackground> */}
            {/* <ImageBackground
                source={require('../../Assetes/mConnect/p2.png')}
                resizeMode="contain"
                style={styles.Img}>
            </ImageBackground> */}
            {/* <View style={styles.middle}>
            <View style={styles.reactView}>
                <Text 
                style={styles.textStyle}>Loved it!</Text>
            </View>
            <View style={styles.reactView}>
                <Text 
                style={styles.textStyle}>Great job!</Text>
            </View>
            <View style={{...styles.reactView,paddingHorizontal:moderateScale(10)}}>
                <Image source={require('../../Assetes/mConnect/love.png')}/>
            </View>
            <View style={{...styles.reactView,paddingHorizontal:moderateScale(10)}}>
                <Image source={require('../../Assetes/mConnect/like.png')}/>
            </View>
            <View style={{...styles.reactView,paddingHorizontal:moderateScale(10)}}>
                <Image source={require('../../Assetes/mConnect/heart.png')}/>
            </View><View style={{...styles.reactView,paddingHorizontal:moderateScale(10)}}>
                <Image source={require('../../Assetes/mConnect/haha.png')}/>
            </View>
            
            </View> */}
            {/* </ScrollView> */}
            <View style={{
                position: 'absolute',
                width: width - 15,
                alignSelf: 'center',
                justifyContent: 'space-around',
                bottom: 2, 
                flexDirection: 'row',
                paddingVertical:5
            }}>

                <TouchableOpacity
                    style={styles.callBtn}
                    onPress={() => {
                        updateMyFb({ endStatus: true })
                        updateClientFb({ endStatus: true });
                    }}
                >
                    <Icon
                        name="call"
                        type="Ionicons"
                        style={{ color: COLORS.white }}
                    />
                </TouchableOpacity>
                <Pressable
                    style={{...styles.callBtn,backgroundColor:'grey'}}
                    onPress={switchAudio}
                >
                        <Icon
                        style={{ color: audio ? COLORS.primarybutton : COLORS.white, fontSize: 23 }}
                        name={audio ? 'mic-off' : 'mic'}
                        type="Ionicons"
                        />
                </Pressable>
                <Pressable
                    style={{...styles.callBtn,backgroundColor:'grey'}}
                    onPress={Loud}
                >
                         <Icon
                            type="Ionicons"
                            name={
                                loudSpeaker
                                ? 'volume-high'
                                : 'volume-high-outline'
                            }
                            style={{ color: loudSpeaker?COLORS.primarybutton:COLORS.white, fontSize: 23 }}
                            />
                </Pressable>
                {
                    !recieved && type == "Incomming" ?
                        <Pressable
                            style={[styles.callBtn, { backgroundColor: '#33BC12' }]}
                            onPress={reciveCall}
                        >
                            <Icon
                                name="call"
                                type="Ionicons"
                                style={{ color: COLORS.white }}
                            />
                        </Pressable>
                        :
                        null
                }
                {/* <Image source={require('../../Assetes/mConnect/calling.png')} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="mic" type="Feather"
                        style={{ fontSize: moderateScale(22), color: COLORS.white, opacity: 0.6 }}
                    />
                    <Text style={styles.text}>Mute</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../Assetes/mConnect/arrow.png')} />
                    <Text
                        style={{
                            maxWidth: moderateScale(40),
                            textAlign: 'center',
                            color: COLORS.white,
                            fontSize: moderateScale(10),
                            opacity: 0.6
                        }}>Share Screen</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="ios-videocam-outline" type="Ionicons"
                        style={styles.icon} />
                    <Text style={styles.text}>Stop Video</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="dots-three-vertical" type="Entypo"
                        style={styles.icon} />
                    <Text style={styles.text}>More</Text>
                </View> */}
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.iaaHeadercolor
    },
    icon: {
        fontSize: moderateScale(22),
        color: COLORS.white,
        opacity: 0.6,
        fontSize: moderateScale(18)
    },
    middle: {
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: moderateScale(35),
        flexDirection: 'row',
        width: width - 10,
        alignSelf: 'center'
    },
    text: {
        color: COLORS.white,
        fontSize: moderateScale(10),
        opacity: 0.6
    },
    Img: {
        width: width-30,
        height: height/2.8,
        alignSelf: 'center',
        marginVertical: moderateScale(5),
        borderRadius:10
    },
    textStyle: {
        fontSize: moderateScale(12),
        padding: moderateScale(5),
        color: COLORS.white,
        paddingHorizontal: moderateScale(10),
    },
    reactView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        height: verticalScale(28),
        // opacity:0.1,
        backgroundColor: '#414141'
    },
    NameSection: {
        height: '25%',
        width: '95%',
        backgroundColor: COLORS.iaaHeadercolor,
        alignSelf: 'center',
        marginTop: moderateScale(180),
        opacity: 0.9,
        padding: moderateScale(10),
    },
    Text: {
        fontFamily: Font.Bold,
        color: COLORS.white
    },
    callBtn: {
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: '#CB2929',
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

//make this component available to the app
export default VideoCall;
