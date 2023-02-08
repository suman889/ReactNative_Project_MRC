//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, BackHandler, Alert } from 'react-native';
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
import { COLORS } from '../../Constant/Colors';
import Navigation from '../../Service/Navigation';
import Icon from '../../Constant/Icons';

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

var peerServer = new Peer(configuration);
var myStream = null;
var remoteUserId = ''
var remoteUserStream = null
var peerCall = null;
var callNodeId = null;
var hour = 0;
var min = 0;
var sec = 0;
var timerRef = null

const Call = (props) => {
    const { remoteUserData, type, navType } = props.route.params;
    const myUserData = useSelector(state => state.User.userData);
    const [recieved, setRecieved] = useState(false);
    const [callState, setCallState] = useState('Connecting')

    const [remoteUserToken, setRemoteUserToken] = useState('')
    const [refress, setRefress] = useState(false)
    // console.log("myUserData", remoteUserData)
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        getUserMedia();
        if (type == "Incomming") {
            InCallManager.startRingtone('_BUNDLE_');
            // InCallManager.start({ media: 'audio', ringback: '_DTMF_' });
        } else {
            InCallManager.start({ media: 'audio', ringback: '_DTMF_' });
            InCallManager.start({ media: 'audio' });
        }

        return () => {
            InCallManager.stopRingback();
            InCallManager.stopRingtone();
            InCallManager.stop();
            backHandler.remove()
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
            { text: "YES", onPress: () => Navigation.back() }
        ]);
        return true;
    }

    const sendNotification = async (data, token) => {
        const FIREBASE_API_KEY =
            'AAAAWaJ_fh0:APA91bHOOQ2S3sKn5ChiMRrwcgUiDNuUA6GmC3WGpVMkf1zKTnefyRVAQMWjj5n7To1laZfDKjTy728AiHcUgY7FhH7VjoSQ3lmlA8_qOizNijfC4mE_7f6Vx_HahZOOiQUmrvQIVKrr';
        // data.notiType = 'Call';
        console.log('myUserData',myUserData)
        const message = {
            registration_ids: [token],
            priority: 'high',
            data: { ...data, notiType: 'Call', callDataType: 'start' },
            notification: {
                title: myUserData.name,
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
            data: { notiType: 'Call', callDataType: 'end' }
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
                        .ref('/user/' + remoteUserData.userId)
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
                audio: true
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
        peerServer = new Peer();

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
                    .ref('/doctor/' + remoteUserData.userId)
                    .once('value', (snapshot) => {
                        console.log("snapshot", snapshot.val())
                        if (snapshot.exists() && !snapshot.val().onCall) {
                            let remoteToken = snapshot.val().fcmToken
                            setRemoteUserToken(remoteToken);

                            database()
                                .ref(`/doctor/${remoteUserData.userId}`)
                                .update({
                                    onCall: true
                                })

                            database()
                                .ref(`/user/${myUserData.id}`)
                                .update({
                                    onCall: true
                                })

                            let callId = uuid.v4();
                            callNodeId = callId
                            let myData = {
                                userId: remoteUserData.userId,
                                name: `${remoteUserData.name}`,
                                nodeId: callId,
                                time: moment().format(),
                                type: 'Outgoing',
                                status: 'Connecting',
                                endStatus: false
                            }
                            console.log('mydata',myData)
                            database()
                                .ref(`/call/${myUserData.id}/${callId}`)
                                // .ref('/users/' + myUserData.id + '/call/' + callId)
                                .set(myData)
                                .then(() => {
                                    FBGetValue(callId)
                                })

                            let clientData = {
                                userId: myUserData.id,
                                name: myUserData.name,
                                peerId: userId,
                                time: moment().format(),
                                type: 'Incomming',
                                status: 'Connecting',
                                nodeId: callId,
                                endStatus: false
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
                .ref(`/doctor/${remoteUserData.userId}`)
                .update({
                    onCall: false
                })

            database()
                .ref(`/user/${myUserData.id}`)
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
            // console.log("Close Called")
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

    return (
        <View style={styles.container}>
            <View
                style={{ paddingTop: 100, alignItems: 'center', flex: 1 }}
            >
                <Image
                    source={{
                        uri: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                    }}
                    style={{ height: 100, width: 100, borderRadius: 50, resizeMode: 'cover' }}
                />

                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 25,
                        fontWeight: 'bold',
                        letterSpacing: 0.5,
                        color: '#fff'
                    }}
                >{remoteUserData.name}</Text>

                {
                    callState != 'Recieved' ?
                        <Text
                            style={{ marginTop: 5, color: '#eaebeb' }}
                        >
                            {callState} ...
                        </Text>
                        :
                        <Text
                            style={{ marginTop: 5, color: '#eaebeb' }}
                        >
                            {`${hour.toString().padStart(2, '0')} : ${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`}
                        </Text>
                }

            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingVertical: 50
                }}
            >
                <Pressable
                    style={styles.callBtn}
                    onPress={() => {
                        updateMyFb({ endStatus: true })
                        updateClientFb({ endStatus: true });
                    }}
                >
                    <Icon
                        name="call-outline"
                        type="Ionicons"
                        style={{ color: COLORS.white }}
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

            </View>

            {
                remoteUserStream != null ?
                    <RTCView
                        streamURL={remoteUserStream.toURL()}
                    />
                    :
                    null
            }

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    callBtn: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#CB2929',
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

//make this component available to the app
export default Call;
