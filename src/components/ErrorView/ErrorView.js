import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ErrorView extends React.Component {
  render() {
        return(
          <View>
            <h2>Something went wrong.</h2>
            <Text style={{ whiteSpace: 'pre-wrap' }}>
              detail message
            </Text>
          </View>
        );
  }
}
