import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Database from '../../database/Database';
const db = new Database();

const Verse = (props) => {
  const deleteVerse = () => {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete ${props.verseRef} from ${props.topic}?`,
      [
        { text: 'Yes',
          onPress: () => {
            db.deleteAVerseFrom(props.topic, props.verseRef);
            setTimeout(() => props.refreshVerses(props.topic), 500);
          }
        },
        { text: 'No', onPress: () => console.log('No Pressed') },
      ],
      { cancelable: false }
    );
  }
  return(
    <TouchableOpacity style={styles.verseView} onPress={
      () => props.handleVerse(props.verseRef)}
      onLongPress={() => {
        deleteVerse();
      }}>

      onLongPress={() => {
        deleteVerse();
      }}>
      <Text>{props.verseRef}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  verseView: {

    padding: 9,
    borderStyle: 'solid',
    borderWidth: .2,
    borderBottomWidth: 1.2,
    borderLeftWidth: 1.2
    // backgroundColor: '#A1F792'
  }
});
export default Verse;
