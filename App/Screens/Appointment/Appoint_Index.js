// import {
//     StyleSheet, Text, View, Image,
//     FlatList, Pressable, ScrollView, SafeAreaView,
//     Animated, LayoutAnimation, TouchableOpacity, Dimensions
// } from 'react-native'

// import React, { useState, useEffect, useRef } from 'react'
// import { COLORS } from '../../Constant/Colors'
// import Header from '../../Component/Global/Header'

// import { mdscale } from '../../PixelRatio';

// const { width } = Dimensions.get('window');

// import LinearGradient from 'react-native-linear-gradient';

// //vectoricon
// import Entypo from 'react-native-vector-icons/Entypo';

// import Navigation from '../../Service/Navigation';

// //Import Tab Screen Components
// import Pathology from './Tab_Pathology';

// import Pharmacy from './Pharmacy';

// const headers = ['Online', 'Home Visit', 'Clinic Visit', 'Pathology', 'Pharmacy']

// let animationActive = true;

// let animationActiveRef;



// const Appoint_Index = () => {

//     {/*** For animated Hadder Tab start */ }
//     const [headerWidths, setWidths] = useState([])
//     const [active, setActive] = useState(0)
//     const scrollX = useRef(new Animated.Value(0)).current;
//     const barTranslate = Animated.multiply(scrollX, -1)
//     const barTranslate1 = useRef(new Animated.Value(0)).current;
//     const headerScrollView = useRef();
//     const itemScrollView = useRef();



//     useEffect(() => {
//         let leftOffset = 0
//         for (let i = 0; i < active; i += 1) {
//             leftOffset += headerWidths[i]
//         }
//         headerScrollView.current.scrollToIndex({ index: active, viewPosition: 0.5 });
//         Animated.spring(barTranslate1, {
//             toValue: leftOffset,
//             useNativeDriver: true, bounciness: 0
//         }).start()
//     }, [active])

//     const onPressHeader = (index) => {
//         if (animationActiveRef) { clearTimeout(animationActiveRef) }
//         if (active != index) {
//             animationActive = false
//             animationActiveRef = setTimeout(() => {
//                 animationActive = true
//             }, 500);
//             itemScrollView.current.scrollToIndex({ index })
//             LayoutAnimation.easeInEaseOut()
//             setActive(index);
//         }
//     }


//     const onScroll = (e) => {
//         const x = e.nativeEvent.contentOffset.x;
//         let newIndex = Math.floor((x / width) + 0.5)
//         if (active != newIndex && animationActive) {
//             LayoutAnimation.easeInEaseOut()
//             setActive(newIndex)
//         }
//     }

//     const onHeaderLayout = (width, index) => {
//         let newWidths = [...headerWidths];
//         newWidths[index] = width
//         setWidths(newWidths)
//     }

//     {/*** animated Hadder Tab end */ }






//     const [tabData, setTabData] = useState([
//         {
//             nameh: 'Online',
//             status: 'true'
//         },

//         {
//             nameh: 'Home Visit',
//             status: 'false'
//         },
//         {
//             nameh: 'Clinic Visit',
//             status: 'false'
//         },
//         {
//             nameh: 'Pathology',
//             status: 'false'
//         },
//         {
//             nameh: 'Pharmacy',
//             status: 'false'
//         },

//     ]);

//     const [data, setData] = useState([

//         {
//             statuscode: 0,
//             image: require('../../Assetes/Images/doctorcircle.jpg'),
//             name: 'MRC',
//             date: '2022-06-11  06:25 pm',
//             time: '06:25 pm',
//             location: 'Nagaland',
//             status: 'Pending'
//         },
//         {
//             statuscode: 0,
//             image: require('../../Assetes/Images/doctorcircle.jpg'),
//             name: 'MRC',
//             date: '2022-06-11  06:25 pm',
//             time: '06:25 pm',
//             location: 'Nagaland',
//             status: 'Pending'
//         },
//         {
//             statuscode: 0,
//             image: require('../../Assetes/Images/doctorcircle.jpg'),
//             name: 'MRC',
//             date: '2022-06-11  06:25 pm',
//             time: '06:25 pm',
//             location: 'Nagaland',
//             status: 'Pending'
//         },
//         {
//             statuscode: 0,
//             image: require('../../Assetes/Images/doctorcircle.jpg'),
//             name: 'MRC',
//             date: '2022-06-11  06:25 pm',
//             time: '06:25 pm',
//             location: 'Nagaland',
//             status: 'Pending'
//         },
//         {
//             statuscode: 0,
//             image: require('../../Assetes/Images/doctorcircle.jpg'),
//             name: 'MRC',
//             date: '2022-06-11  06:25 pm',
//             time: '06:25 pm',
//             location: 'Nagaland',
//             status: 'Pending'
//         },
//         {
//             statuscode: 0,
//             image: require('../../Assetes/Images/doctorcircle.jpg'),
//             name: 'MRC',
//             date: '2022-06-11  06:25 pm',
//             time: '06:25 pm',
//             location: 'Nagaland',
//             status: 'Pending'
//         },
//         {
//             statuscode: 0,
//             image: require('../../Assetes/Images/doctorcircle.jpg'),
//             name: 'MRC',
//             date: '2022-06-11  06:25 pm',
//             time: '06:25 pm',
//             location: 'Nagaland',
//             status: 'Pending'
//         },

//         {
//             statuscode: 1,
//             image: require('../../Assetes/Images/womendoctor.jpg'),
//             name: 'MRC',
//             date: '2022-06-11  06:25 pm',
//             time: '06:25 pm',
//             location: 'Mizoram',
//             status: 'Try Again'
//         },
//         {
//             statuscode: 0,
//             image: require('../../Assetes/Images/doctorcircle.jpg'),
//             name: 'MRC',
//             date: '2022-06-11  06:25 pm',
//             time: '06:25 pm',
//             location: 'Tripura',
//             status: 'Pending'
//         },


//     ]);

//     const renderTabData = ({ item }) => {
//         return (
//             <View style={{
//                 flexDirection: 'row',
//                 marginLeft: mdscale(6),
//                 alignSelf: 'center',
//             }}>
//                 <Pressable
//                     onPress={() => Navigation.navigate('Pharmacy')}
//                     style={styles.smallBox2}>
//                     <Text style={{ color: '#ffffff', fontSize: 12 }}>{item.nameh} </Text>
//                 </Pressable>
//             </View>
//         );
//     };


//     const renderData = ({ item }) => {
//         return (
//             <LinearGradient
//                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
//                 colors={['#b993d6', '#8ca6db']}
//                 style={styles.card}>

//                 <View style={{
//                     width: 100,
//                     //backgroundColor: 'green',
//                     //flex: 1
//                 }}>
//                     <Image source={item.image}
//                         style={{ width: 80, height: 80, borderRadius: 100 }}
//                     />
//                 </View>

//                 <View style={{
//                     marginLeft: 20,
//                     flex: 1
//                 }}>
//                     <Text style={{
//                         fontsize: 14,
//                         color: '#000000',

//                     }}>{item.name}</Text>

//                     <Text style={{
//                         fontsize: 14,
//                         color: '#000000',

//                     }}>{item.date}</Text>

//                     <View style={{ flexDirection: 'row', marginVertical: 5 }}>
//                         <Entypo name='location-pin' color={'#ffffff'}
//                             size={mdscale(20)} style={{ marginLeft: -4 }}
//                         />
//                         <Text style={{ color: '#000000' }}>{item.location}</Text>
//                     </View>
//                     {item.status != "Pending" ?
//                         <View

//                             style={

//                                 {
//                                     width: 100, height: 30,
//                                     backgroundColor: '#276dc6',
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                     borderRadius: 10,
//                                     marginTop: 10,
//                                 }}
//                         >


//                             <Text
//                                 style={item.status === "Pending" ? { color: "#000000", fontSize: mdscale(14), fontWeight: "bold" } :
//                                     { color: "#ffffff", fontSize: mdscale(14), fontWeight: "bold" }
//                                 }
//                             >{item.status}</Text>

//                         </View>
//                         : <Text
//                             style={item.status === "Pending" ? { color: "#000000", fontSize: mdscale(14), fontWeight: "bold" } :
//                                 { color: "#ffffff", fontSize: mdscale(14), fontWeight: "bold" }
//                             }
//                         >{item.status}</Text>
//                     }


//                 </View>

//             </LinearGradient>
//         )

//     }



//     return (
//         <View style={{ flex: 1, backgroundColor: COLORS.thimColor }}>
//             <Header
//                 name=' My Appointments'
//             />
//             <ScrollView showsVerticalScrollIndicator={false}>

//                 {/*** FOR  animated Hadder Tab Start using Flat list  */}
//                 <FlatList
//                     data={headers}
//                     ref={headerScrollView}
//                     keyExtractor={(item) => item}
//                     horizontal
//                     style={styles.headerScroll}
//                     onScroll={Animated.event(
//                         [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//                         { useNativeDriver: false },
//                     )}

//                     contentContainerStyle={{
//                         width: "100%",
//                         flexDirection: "row",
//                         alignItems: "center",
//                         justifyContent: "space-evenly"
//                     }}

//                     ListFooterComponent={() => (<View style={[styles.headerBar, {}]} />)}

//                     renderItem={({ item, index }) => (
//                         <View style={{
//                             marginTop: 10
//                         }}>
//                             {active == index ?
//                                 <TouchableOpacity
//                                     onLayout={(e) => onHeaderLayout
//                                         (e.nativeEvent.layout.width, index)}

//                                     onPress={() => onPressHeader(index)}
//                                     key={item}
//                                     style={styles.smallBox1}

//                                 >
//                                     <Text onPress={() => onPressHeader(index)} style={{
//                                         color: '#fff',
//                                         fontSize: 12,
//                                         fontWeight: "500"
//                                     }}>{item}</Text>
//                                 </TouchableOpacity> :
//                                 <TouchableOpacity
//                                     onLayout={(e) => onHeaderLayout(e.nativeEvent.layout.width, index)}
//                                     onPress={() => onPressHeader(index)}
//                                     key={item}
//                                     style={styles.smallBox2}

//                                 >
//                                     <Text onPress={() => onPressHeader(index)} style={{
//                                         color: '#fff',
//                                         fontSize: 12,
//                                         fontWeight: "500"
//                                     }}>{item}</Text>
//                                 </TouchableOpacity>}


//                         </View>
//                     )}
//                 />


//                 <Animated.View style={[styles.headerBar,
//                 {
//                     width: headerWidths[active],
//                     transform: [{ translateX: barTranslate },
//                     { translateX: barTranslate1 }]
//                 }]} />



//                 {/***  animated Hadder Tab ENDD----- */}


//                 {/*** Animated Body Flatlist Screen Start */}

//                 <FlatList
//                     data={headers}
//                     ref={itemScrollView}
//                     keyExtractor={(item) => item}
//                     horizontal
//                     pagingEnabled
//                     decelerationRate='fast'
//                     showsHorizontalScrollIndicator={false}
//                     scrollEnabled={false}
//                     onMomentumScrollEnd={onScroll}
//                     viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
//                     renderItem={({ item, index }) => (
//                         <View style={{
//                             // flex: 1,
//                             width: width,
//                             paddingTop: 10
//                         }}>
//                             {item == 'Pathology' ?
//                                 <Pathology /> :
//                                 <Pharmacy />}
//                         </View>
//                     )}
//                 />


//                 {/*** Animated Body Flatlist Screen END------ */}




//                 {/* 
//                 <View style={{

//                     width: '100%',
//                     alignSelf: 'center',
//                     //paddingHorizontal: 20,
//                     //backgroundColor: 'red',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: 24,

//                 }}>

//                     <FlatList
//                         horizontal
//                         showsHorizontalScrollIndicator={false}

//                         data={tabData}
//                         renderItem={renderTabData}
//                         //console.log(renderTabData ))
//                         keyExtractor={item => item.id}
//                     />

//                 </View>




//                 <FlatList
//                     //columnWrapperStyle={{}}
//                     showsVerticalScrollIndicator={false}
//                     //numColumns={2}
//                     data={data}
//                     renderItem={renderData}
//                     //console.log(renderData ))
//                     keyExtractor={item => item.id}
//                 />
//  */}

//             </ScrollView>


//         </View>
//     )
// }

// export default Appoint_Index

// const styles = StyleSheet.create({

//     headerScroll: {
//         flexGrow: 0,

//     },
//     headerItem: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     mainItem: {
//         width: width,
//         borderWidth: 5,
//         borderColor: '#fff',
//         backgroundColor: 'orange',
//         alignItems: 'center',
//         justifyContent: 'space-evenly',
//     },
//     headerBar: {
//         height: 0,
//         backgroundColor: '#fff',
//         position: 'absolute',
//         bottom: 1,
//     },

//     card: {
//         width: '93%',
//         height: 130,
//         // backgroundColor: '#afddf7',
//         marginTop: 20,
//         alignSelf: 'center',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 13,
//         paddingLeft: 10,
//         flexDirection: 'row',


//     },

//     smallBox1: {
//         height: 40,
//         width: 64,
//         borderRadius: 15,
//         backgroundColor: '#43cea2',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },

//     smallBox2: {
//         height: 40,
//         width: 64,
//         borderRadius: 15,
//         backgroundColor: '#7b7e7f',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
// })

import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'

const { width } = Dimensions.get('window');
import { vrscale, mdscale } from '../../PixelRatio';
import Header from '../../Component/Global/Header'
import TopBar from '../../Component/TopBar'
import WaitingComponent from './WaitingComponent';
import Appoiment from '../../Component/Appoiment';
import HomeService from '../../Service/HomeService';
import { useDispatch, useSelector } from 'react-redux';
const Appoint_Index = ({navigation}) => {
  const { userData } = useSelector(state => state.User);
  const [Data, setData] = useState([
    { type: 'Waiting', Component: WaitingComponent, id: 0 },
  ])


  async function getVisitData() {
    let res = await HomeService.visit({
      "user_id": userData.id,
    })
    if (res.status == true) {
      console.log('{item.type}', res.data);
      // setHeaders(res.data)
      setData(res.data.map(item => {
        return {
          Component: Appoiment,
          ...item
        }
      }))
    }
  }

  useEffect(() => {
    getVisitData()
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('tab change');
      getVisitData()
    });
    return unsubscribe;
  }, [])
console.log('navigation',navigation);
  return (
    <View style={{
      flex: 1
    }}>
      <Header name='My Appointments' />
      <TopBar
      navigation ={navigation}
        headers={Data}
        contentContainerStyle={styles.tabView}
        renderItem={(item, index, active) => (
          <>
            {index == active ?
              <View style={{
                ...styles.btn,
                backgroundColor: '#1FCDCB',
              }}>
                <Text style={{
                  color: '#fff',
                  ...styles.tabText
                }}>{item.type}</Text>
              </View> :
              <View style={{
                ...styles.btn,
                backgroundColor: '#7C939B',
              }}>
                <Text style={{
                  color: '#fff',
                  ...styles.tabText
                }}>{item.type}</Text>
              </View>
            }

          </>

        )} />
    </View>
  )
}

export default Appoint_Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    // alignItems: 'center',
  },
  tabView: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-around',
    paddingHorizontal: mdscale(5),
    marginBottom: mdscale(10),
    marginTop: 10,
    // // paddingHorizontal: 5,
    // // width: 85,
    // height: vrscale(40),
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: mdscale(20),
    // marginHorizontal: mdscale(5)
  },
  btn: {
    height: vrscale(40),
    width: width / 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mdscale(18),
    marginHorizontal: mdscale(2)
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: mdscale(9),
    fontFamily: 'SourceSerifPro-Regular',
    margin: mdscale(10)
  }
})