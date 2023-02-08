import { View, Text, Platform,NativeModules } from 'react-native'
const { RingtonePlay } = NativeModules;
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useDispatch, useSelector } from 'react-redux';
import { setuser } from './App/Redux/Reducer/User';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyDoTIrlJxHd9rTLoytrigY9piIQk1OcTJk");
//
import Navigation from './App/Service/Navigation';
import { vrscale } from './App/PixelRatio';
import DrawerContent from './App/Component/Drawer/DrawerContent';


{/** Vector icon */ }
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import Palet from 'react-native-vector-icons/AntDesign'



{/** Screen's path */ }

import Login from './App/Screens/Auth/Login.js';
import Signup from './App/Screens/Auth/SignUp';
import Home from './App/Screens/Home/HomeIndex';
import Profile from './App/Screens/Profile/Index';
import EditProfile from './App/Screens/Profile/EditProfile';

///
import Appointment from './App/Screens/Appointment/Appoint_Index';
import Doctor from './App/Screens/Doctors/Doctor_Index';
import DoctorBooking from './App/Screens/Doctors/DoctorBooking';
// import DoctorList from './App/Screens/Doctors/DoctorList';
//
import Transaction_Index from './App/Screens/Transaction/Transaction_Index';
import Payment from './App/Screens/PayNow/Payment';
import Rating from './App/Screens/Rating/Ratings';
import Contact from './App/Screens/Contact/Contact';
import Support from './App/Screens/Contact/Support';

import Pharmacy from './App/Screens/Appointment/Pharmacy';

import HomeCatagory from './App/Screens/Home/HomeCareCatagory';
import EditAddress from './App/Screens/Home/EditAddress';
import AuthService from './App/Service/AuthService';
import DoctorList from './App/Screens/Doctors/DoctorList';
import Pathology from './App/Screens/Pathology/Pathology';
import Medicen_booking from './App/Screens/Medicen/Medicen_booking';
import WevView from './App/Component/WevView';
import AllDoctor from './App/Screens/Doctors/AllDoctor';
import ChatList from './App/Screens/Chat';
import Chat from './App/Screens/Chat/Chat';
import Call from './App/Screens/Call';
import VideoCall from './App/Screens/Call/VideoCall';

import { fcmService } from './App/Service/Notification/FCMService';
import { localNotificataionService, localNotificationService } from './App/Service/Notification/LocalNotificationService';
import RatingDorctor from './App/Screens/Doctors/RatingDorctor';
import GoogleMap from './App/Screens/Home/GoogleMap';
import { COLORS } from './App/Constant/Colors';
import ViewPharmacy from './App/Screens/Pharmacy/ViewPharmacy';





// const Stack = createNativeStackNavigator();

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const SwitchStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



function DrawerNav(props) {
  return (

    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{
        activeTintColor: '#1D3557', /* font color for active screen label */
        activeBackgroundColor: 'transparent', /* bg color for active screen */

      }}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { color: "#000000" },
        //drawerActiveBackgroundColor: "#e94241"

      }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          drawerIcon: ({ }) => (
            <Ionicons
              name="home"
              style={{ color: '#000000', fontSize: 18 }}

            />

          ),
        }}
        labelStyle={{ color: '#FFFFFF', }}
        name="Home"
        component={Tabs}

      />

      {/* <Drawer.Screen name="Booking" component={Home} /> */}
    </Drawer.Navigator>
  )
}

function Tabs() {
  return (
    <Tab.Navigator


      initialRouteName="Home"
      tabBarOptions={{

        showLabel: false,

      }}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        tabBarStyle: {
          backgroundColor: '#00a3e0',
          height: vrscale(50)
        },

      }}
    >
      <Tab.Screen name='Home' component={Home}
        options={{
          //tabBarLabel: 'Home',
          showLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon name={'home'} color={focused ? "#ffffff" : "#515151"} size={26}

            />
          ),

        }}
      />


      <Tab.Screen name="AllDoctor" component={AllDoctor}
        options={{
          //tabBarLabel: 'Mycourse',
          showLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon name={'hearto'} color={focused ? "#ffffff" : "#515151"} size={26} />
          ),

        }}
      />


      <Tab.Screen name="Appointment" component={Appointment}
        options={{
          tabBarLabel: 'Appointment',
          tabBarIcon: ({ focused }) => (
            <Icon name={'calendar'} color={focused ? "#ffffff" : "#515151"} size={26} />
          ),

        }}
      />

      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Icon name={'user'} color={focused ? "#ffffff" : "#515151"} size={26} />
          ),

        }}
      />
    </Tab.Navigator>
  );
}

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,

      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name='Signup' component={Signup} />
    </AuthStack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName="DrawerNav"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        // ...TransitionPresets.ModalTransition,
      }}>
      {/* <MainStack.Screen name="Splash" component={Splash} /> */}
      <MainStack.Screen name='Home' component={DrawerNav} />
      <MainStack.Screen name='Profile' component={Profile} />
      <MainStack.Screen name='EditProfile' component={EditProfile} />
      <MainStack.Screen name=' Appointment' component={Appointment} />
      <MainStack.Screen name='Transaction_Index' component={Transaction_Index} />
      <MainStack.Screen name='Payment' component={Payment} />
      <MainStack.Screen name='Rating' component={Rating} />
      <MainStack.Screen name='Contact' component={Contact} />
      <MainStack.Screen name='Doctor' component={Doctor} />
      <MainStack.Screen name='DoctorList' component={DoctorList} />
      <MainStack.Screen name='DoctorBooking' component={DoctorBooking} />
      <MainStack.Screen name='Medicen_booking' component={Medicen_booking} />
      <MainStack.Screen name='Pharmacy' component={Pharmacy} />
      <MainStack.Screen name='Support' component={Support} />
      <MainStack.Screen name='EditAddress' component={EditAddress} />
      {/* <MainStack.Screen name='GoogleMap' component={GoogleMap} /> */}
      <MainStack.Screen name='WevView' component={WevView} />
      <MainStack.Screen name='RatingDorctor' component={RatingDorctor} />
      {/***Home Care Catagory */}
      <MainStack.Screen name='HomeCatagory' component={HomeCatagory} />
      <MainStack.Screen name='Pathology' component={Pathology} />
      <MainStack.Screen name="ChatList" component={ChatList} />
      <MainStack.Screen name="Chat" component={Chat} />
      <MainStack.Screen name="Calling" component={Call} />
      <MainStack.Screen name="VideoCall" component={VideoCall} />
      <MainStack.Screen name="ViewPharmacy" component={ViewPharmacy} />
    </MainStack.Navigator>
  );
};


const App = () => {

  const dispatch = useDispatch();
  const [isSignedIn, setIsSignIn] = useState(true);
  const { login_status } = useSelector(state => state.User);

  useEffect(() => {
    // SplashScreen.hide();
    getUserdata();
  }, []);
  React.useEffect(() => {
    if (login_status == true) {
      fcmService.registerAppWithFCM();
      fcmService.register(onRegister, onNotification, onOpenNotification);
      localNotificationService.configure(onOpenNotification);
    }
  }, [login_status]);
  const getUserdata = async () => {
    let result = await AuthService.getAccount();
    //console.log('userdata', result);
    if (result != null) {
      dispatch(setuser(result));
      setIsSignIn(false);
    } else {
      setIsSignIn(false);
    }
  };
  const onRegister = token => {
    console.log('token [App]:', token);
  };
  const onNotification = async notify => {
    console.log('notify[onNotification]', notify);
    // EventRegister.emit('myCustomEvent', 'Fetch');
    console.log('notify.notification.title',notify.notification.title)

    const options = {
      soundName: 'default',
      playSound: true,
    };
    localNotificationService.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify.data,
      options,
    );
  };

  const onOpenNotification = notify => {
    // console.log("App notify[onOpenNotification]", typeof (notify.nodeId) != 'undefined', notify.notiType == 'Call')
    if (typeof notify.nodeId != 'undefined' && notify.notiType == 'Call') {
      setTimeout(() => {
        if (notify.callType == 'videoCall') {
          Navigation.navigate('VideoCall', {
            remoteUserData: notify,
            type: 'Incomming',
          });
        } else {
          Navigation.navigate('Calling', {
            remoteUserData: notify,
            type: 'Incomming',
          });
        }

        localNotificationService.cancelAllLocalNotifications();
        if (Platform.OS == "android") {
          RingtonePlay.stopRingTone();
        }
      }, 1000);
    }
  };
  return (
    <NavigationContainer ref={r => {
      Navigation.setTopLevelNavigator(r);
    }}>
      {
        Platform.OS == "ios" ?

          <View style={{ height: 30, backgroundColor: COLORS.HeaderColor }} />
          :
          null
      }
      <SwitchStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
        {!login_status ? (
          <SwitchStack.Screen name="Authh" component={AuthStackNavigator} />
        ) : (
          <SwitchStack.Screen name="Main" component={MainStackNavigator} />
        )}
      </SwitchStack.Navigator>

    </NavigationContainer>
  )
}

export default App