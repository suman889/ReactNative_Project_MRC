import PushNotification from "react-native-push-notification"
import { NativeModules } from "react-native";

class LocalNotificationService { 
    configure = (onOpenNotification) => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
            //   console.log("TOKEN:", token);
            },
          
            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
              console.log("NOTIFICATION:", notification);

                if (!notification?.data) {
                    return
                }
                notification.userInteraction = true;
                // onOpenNotification(notification);
            },
          
            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
              console.log("ACTION:", notification.action);
              console.log("NOTIFICATION:", notification);
          
              // process the action
            },
          
            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function(err) {
              console.error(err.message, err);
            },
          
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
              alert: true,
              badge: true,
              sound: true,
            },
          
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
          
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    }

    unregister = () => {
        PushNotification.unregister();
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Android Only Properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            title : title || "",
            message : message || "",
            playSound : options.playSound || false,
            soundName : options.soundName || 'default',
            userInteraction : false , // BOOLEAN : If notification was opened by the user from notification
            channelId: "32",
            badge : true, 
        });
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel : true,
            largeIcon : options.largeIcon || "ic_launcher",
            smallIcon : options.smallIcon || "ic_notification",
            bigText : message || '',
            subText : title || '',
            vibrate : options.vibrate || true,
            vibration : options.vibration || 300,
            priority : 'high',
            importance : 'high',
            data : data,
        }
    }

    cancelAllLocalNotifications = () => {
        PushNotification.cancelAllLocalNotifications();
    }

    removeDeliveredNotificationByID = (notificationId) => {
        console.log("[LocalNotificationService] removeDeliveredNotificationByID:", notificationId);
        PushNotification.cancelLocalNotifications({id: `${notificationId}`})
    }

    // applicationBadge = () => {
    //     // PushNotification.setApplicationIconBadgeNumber(2);
    //     // const ShortcutBadger = NativeModules.ShortcutBadger;
    //     // let count = 1;
    //     // ShortcutBadger.applyCount(count);
    // }
}

export const localNotificationService = new LocalNotificationService();