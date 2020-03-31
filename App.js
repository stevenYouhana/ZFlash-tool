import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import Home from './src/components/Home/Home';


export default class App extends Component {
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
