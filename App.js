import React, { Component } from 'react';
import { ScreenOrientation } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import Home from './src/components/Home/Home';

Sentry.init({
  dsn: 'https://65b10035649b42b4a48059653271b1a5@o379931.ingest.sentry.io/5205288',
  enableInExpoDevelopment: true,
  debug: true,
});
Sentry.setRelease(Constants.manifest.revisionId);

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
  },
});
