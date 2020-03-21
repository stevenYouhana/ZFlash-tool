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
        { text: 'No', onPress: () => null },
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
      <Text style={{color: 'black'}}>{props.verseRef}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  verseView: {

    padding: 9,
    marginBottom: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, .5)',
    borderWidth: .3,
    borderBottomWidth: 1.9,
    borderLeftWidth: 1.8,    
    backgroundColor: 'rgba(255, 237, 164, .7)'
  }
});
export default Verse;
