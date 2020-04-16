import React, { Component } from 'react';
import { ScreenOrientation } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Home/Home';


export default class App extends Component {
  componentDidMount() {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignSelf: 'stretch',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
});
