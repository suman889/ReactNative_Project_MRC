import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ImageBackground, Image, Animated, Dimensions, FlatList, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
const { height, width } = Dimensions.get('screen');
let animationActive = true;
let animationActiveRef;
let SingleComp = ({ name }) => (
    <View style={{
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Text style={{
            color: "#fff",
            fontStyle: 25
        }}> {name}</Text>
    </View>
)
let AllData = [
    { type: 'Online', Component: (<SingleComp name={'Online'} />) },
    { type: 'Home Visit', Component: (<SingleComp name={'Home Visit'} />) },
    { type: 'Clinic Visit', Component: (<SingleComp name={'Clinic Visit'} />) },
    { type: 'Pathology', Component: (<SingleComp name={'Pathology'} />) },
    { type: 'Pharmacy', Component: (<SingleComp name={'Pharmacy'} />) },
]
let renderData = (item, index, active) => (
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
        }</>)
        
const TopBar = ({ headers , contentContainerStyle , renderItem , scrollEnabled = false,navigation }) => {
    // const [headers, setHeaders] = useState(Data)


    const [headerWidths, setWidths] = useState([])
    const [active, setActive] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current;
    const barTranslate = Animated.multiply(scrollX, -1)
    const barTranslate1 = useRef(new Animated.Value(0)).current;
    const headerScrollView = useRef();
    const itemScrollView = useRef();
    useEffect(() => {
        let leftOffset = 0
        for (let i = 0; i < active; i += 1) {
            leftOffset += headerWidths[i]
        }
        headerScrollView.current.scrollToIndex({ index: active, viewPosition: 0.5 });
        Animated.spring(barTranslate1, { toValue: leftOffset, useNativeDriver: true, bounciness: 0 }).start()
    }, [active])
    const onPressHeader = (index) => {
        if (animationActiveRef) { clearTimeout(animationActiveRef) }
        if (active != index) {
            animationActive = false
            animationActiveRef = setTimeout(() => {
                animationActive = true
            }, 400);
            itemScrollView.current.scrollToIndex({ index })
            LayoutAnimation.easeInEaseOut()
            setActive(index);
        }
    }
    const onScroll = (e) => {
        const x = e.nativeEvent.contentOffset.x;
        let newIndex = Math.floor((x / width) + 0.5)
        if (active != newIndex && animationActive) {
            LayoutAnimation.easeInEaseOut()
            setActive(newIndex)
        }
    }
    const onHeaderLayout = (width, index) => {
        let newWidths = [...headerWidths];
        newWidths[index] = width
        setWidths(newWidths)
    }
    return (
        <View style={{
            flex: 1
        }}>
            <View>
                <FlatList
                    data={headers}
                    ref={headerScrollView}
                    keyExtractor={(item) => item}
                    horizontal
                    style={styles.headerScroll}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false },
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={contentContainerStyle}
                    ListFooterComponent={() => (<View style={[styles.headerBar, {}]} />)}
                    renderItem={({ item, index }) => (
                        <View style={{
                        }}>
                            <TouchableOpacity
                                onLayout={(e) => onHeaderLayout(e.nativeEvent.layout.width, index)}
                                onPress={() => onPressHeader(index)}
                                key={item}
                            >
                                {renderItem(item, index, active)}
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <Animated.View style={[styles.headerBar, { width: headerWidths[active], transform: [{ translateX: barTranslate }, { translateX: barTranslate1 }] }]} />
            </View>
            <FlatList
                data={headers}
                ref={itemScrollView}
                keyExtractor={(item) => item}
                horizontal
                pagingEnabled
                decelerationRate='fast'
                showsHorizontalScrollIndicator={false}
                scrollEnabled={scrollEnabled}
                onMomentumScrollEnd={onScroll}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                renderItem={({ item, index }) => (
                    <View style={{
                        // backgroundColor:"red",
                        width: width,
                        marginTop: 0
                    }}>
                        <>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: 0 }}>
                                <item.Component visit_type={item.id} navigation={navigation} />
                            </ScrollView>
                        </>
                    </View>
                )}
            />
            {/* <Text>kjlshdksdhj</Text>
                <View style={{ height: 20 }} /> */}
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
  
    headerScroll: {
        flexGrow: 0,
    },
    headerItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    mainItem: {
        width: width,
        borderWidth: 5,
        borderColor: '#fff',
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    headerBar: {
        height: 0,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 1,
    },
    addBox: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 20,

    },
})