//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, NativeModules } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Call from '.';
import Auth from '../../Service/Auth';
import { localNotificationService } from '../../Service/Notification/LocalNotificationService';
import { setuser } from '../../Store/reducer/User';

// create a component
const PreCall = (props) => {
    const { data } = props;
    const dispatch = useDispatch();
    const login_status = useSelector(state => state.User.login_status)
    

    useEffect(() => {
        getUserData()
        localNotificationService.cancelAllLocalNotifications()
        const { RingtonePlay } = NativeModules;
        RingtonePlay.stopRingTone()
    }, [])

    const getUserData = async () => {
        let result = await Auth.getAccount();
        if (result != null) {
            dispatch(setuser(result));
        }
    }

    return (
        <View style={styles.container}>
            {
                login_status ?
                    <Call
                        route={{
                            params: {
                                remoteUserData: data,
                                type: 'Incomming',
                                navType: 'close'
                            }
                        }}
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
    },
});

//make this component available to the app
export default PreCall;
