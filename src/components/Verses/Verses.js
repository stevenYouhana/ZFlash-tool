import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';

export default class Verses extends React.Component {
  constructor(props) {
    super(props);
    this.fetchVerses = this.fetchVerses.bind(this);
  }
  fetchVerses() {
    console.log("fetchVerses() for "+this.props.topic);
    return ['verse1', 'verse2', 'verse3',]
      .map((verse, i) => {
        return(
          <View key={`view${verse}${i}`} style={styles.versesContainer}>
            <Text key={`text${verse}${i}`} style={styles.verse}>{verse}</Text>
          </View>

        );
      });
  }
  render() {
    return(
      <ScrollView>
        {this.fetchVerses()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  versesContainer: {
    width: 300,
    alignItems: 'center',
    padding: 2
  },
  verse: {
    fontSize: 17,
  }
});
