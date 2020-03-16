import React, { Component } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { Platform, Button, TextInput, StyleSheet, Text, View, SafeAreaView } from 'react-native';
<<<<<<< HEAD
=======
=======
import { Platform, Button, TextInput, StyleSheet, Text, View, SafeAreaView }
  from 'react-native';
>>>>>>> dev
let bottomStyle = 0;
>>>>>>> dev
=======
import { Platform, Button, TextInput, StyleSheet, Text, View, SafeAreaView }
  from 'react-native';
let bottomStyle = 0;
>>>>>>> dev

const AddVerse = props => {
  let verse;
  let textInput = React.createRef();
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> dev
  bottomStyle = props.keyboardOffset;
  // bottomStyle = 0;
  const styles = StyleSheet.create({
    title: {
      color: 'white',
      fontSize: 16,
      paddingBottom: 10
    },
    addVerseHolder : {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
    },
    textField: {
      alignContent: 'flex-start',
      height: 35,
      width: 215,
      borderColor: 'gray',
      color: 'white',
      borderWidth: 1,
      paddingLeft: 5,
    },
    buttonView: {
      width: 80,
      height: 40,
    }
  });

<<<<<<< HEAD
>>>>>>> dev
  return(
<<<<<<< HEAD
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        ref={input => { textInput = input }}
<<<<<<< HEAD
        placeholder="new verse"
=======
        placeholder={`new verse for ${props.topic}`}
>>>>>>> dev
        onChangeText={text => verse = text}
        value={verse}
      />
      <View style={styles.buttonView}>
        <Button title="Add" onPress={() => {
          props.handleNewVerse(verse)
          textInput.clear()
          verse = null;
        }} />
=======
=======
  return(
>>>>>>> dev
    <View style={styles.container}>      
      <View style={styles.addVerseHolder}>
        <TextInput
          style={styles.textField}
          ref={input => { textInput = input }}
          placeholder="e.g. Jn 1: 1"
          onChangeText={text => verse = text}
          value={verse}
        />
        <View style={styles.buttonView}>
          <Button title="Add" onPress={() => {
            props.handleNewVerse(verse)
            textInput.clear()
            verse = null;
          }} />
        </View>
<<<<<<< HEAD
>>>>>>> dev
=======
>>>>>>> dev
      </View>
    </View>
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  textField: {
    alignContent: 'flex-start',
    height: 35,
    width: 215,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5
  },
  buttonView: {
    width: 80,
    height: 40,
  }
});
=======

>>>>>>> dev
=======

>>>>>>> dev
export default AddVerse;
