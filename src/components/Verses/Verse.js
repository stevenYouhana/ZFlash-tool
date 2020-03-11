import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const Verse = (props) => {
  return(
    <TouchableOpacity style={styles.verseView} onPress={() => props.handleVerse(props.verseRef)}>
      <Text>{props.verseRef}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  verseView: {
    padding: 10,
    backgroundColor: '#A1F792'
  }
});
export default Verse;
