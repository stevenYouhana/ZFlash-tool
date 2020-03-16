import React, { Component } from 'react';
<<<<<<< HEAD
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const Verse = (props) => {
  return(
    <TouchableOpacity style={styles.verseView} onPress={() => props.handleVerse(props.verseRef)}>
=======
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
<<<<<<< HEAD
      onLongPress={() => deleteVerse()}>
>>>>>>> dev
=======
      onLongPress={() => {
        deleteVerse();
      }}>
>>>>>>> dev
      <Text>{props.verseRef}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  verseView: {
<<<<<<< HEAD
    padding: 10,
    backgroundColor: '#A1F792'
=======
    padding: 9,
    borderStyle: 'solid',
    borderWidth: .2,
    borderBottomWidth: 1.2,
    borderLeftWidth: 1.2
    // backgroundColor: '#A1F792'
>>>>>>> dev
  }
});
export default Verse;
