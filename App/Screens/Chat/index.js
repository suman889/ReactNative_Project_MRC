//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import FBChatCard from '../../Component/Chat/ChatCard';
import {COLORS} from '../../Constant/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import Header from '../../Component/Global/Header';

const {height, width} = Dimensions.get('window');

// create a component
const ChatList = props => {
  const userData = useSelector(state => state.User.userData);

  const [allUser, SetAllUser] = useState([]);
  const [allUserBack, setAllUserBack] = useState([]);
  React.useEffect(() => {
    getfirebase();
    const focusListener = props.navigation.addListener('focus', () => {
      // The screen is focused
      console.log(userData)
      getfirebase();
    });
    return focusListener;
  }, [props.navigation]);

  const getfirebase = () => {
    database()
      .ref(`/chatList/${userData.id}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          let data = Object.values(snapshot.val());
          console.log('fbdata', data);
          SetAllUser(data);
          setAllUserBack(data);
        }
      });
  };
  const sorted = () => {
    let bal = allUser.sort(function (b, a) {
      return b.name.toLowerCase() < a.name.toLowerCase()
        ? -1
        : b.name.toLowerCase() > a.name.toLowerCase()
        ? 1
        : 0;
    });
    // console.log("AllContacts", bal)
    return bal;
  };

  const searchContact = data => {
    let result = allUserBack.filter(it =>
      new RegExp(data.toLowerCase()).test(it.name.toLowerCase()),
    );
    SetAllUser(result);
  };

  return (
    <View style={styles.container}>
      <Header
                name='View Rating'
            />

      <TextInput
        style={styles.input}
        placeholderTextColor={'grey'}
        placeholder="Search People....."
        onChangeText={val => searchContact(val)}
        // autoFocus={true}
      />
      <FlatList
        style={{alignSelf: 'center'}}
        data={sorted()}
        // horizontal={true}
        showsVerticalScrollIndicator={false}
        // numColumns={3}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          return <FBChatCard data={item} connected={true} />;
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: width - 30,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: moderateScale(15),
    height: verticalScale(40),
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
});

//make this component available to the app
export default ChatList;
