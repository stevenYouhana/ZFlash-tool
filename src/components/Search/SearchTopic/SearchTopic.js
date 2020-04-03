import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class SearchTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: false }
  }
  searchInput = () => {
    console.log("state change")
    return this.state.searchInput ? <TextInput placeholder="search topic" /> : null
  }
  render() {
    return(
      <View>
        <Ionicons name="md-search" size={35}
        color="rgba(0, 0, 0, .6)"
        onPress={() => {
            console.log('state change')
            this.setState({ searchInput: !this.state.searchInput })}
        }
        />
        { this.searchInput() }
      </View>
    );
  }
}
