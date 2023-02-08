import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import Header from './Global/Header';

const WevView = (props) => {
    console.log(props.route.params.link);
  return (
    <View style={{
        flex:1
    }}>
      <Header title="" />
    <WebView source={{ uri: props.route.params.link }} />
    </View>
  )
}

export default WevView

const styles = StyleSheet.create({})