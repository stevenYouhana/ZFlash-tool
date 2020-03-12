import React, { Component } from 'react';
import { Platform, Button, TextInput, StyleSheet, Text, View, SafeAreaView } from 'react-native';
let bottomStyle = 0;

const AddVerse = props => {
  let verse;
  let textInput = React.createRef();
  bottomStyle = props.keyboardOffset;
  // bottomStyle = 0;
  const styles = StyleSheet.create({
    container : {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      bottom: bottomStyle,
    },
    textField: {
      height: 35,
      width: 215,
      borderColor: 'gray',
      borderWidth: 1,
      paddingLeft: 5,
    },
    buttonView: {
      width: 80,
      height: 40,      
    }
  });

  return(
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        ref={input => { textInput = input }}
        placeholder={`new verse for ${props.topic}`}
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
    </View>
  );
}

export default AddVerse;
