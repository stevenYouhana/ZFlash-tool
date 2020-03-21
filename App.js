import React, { Component } from 'react';
import { ScreenOrientation } from 'expo';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import Home from './src/components/Home/Home';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignSelf: 'stretch',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
});
