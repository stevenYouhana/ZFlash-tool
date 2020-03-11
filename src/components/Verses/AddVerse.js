import React, { Component } from 'react';
import { Platform, Button, TextInput, StyleSheet, Text, View, SafeAreaView } from 'react-native';

const AddVerse = props => {
  let verse;
  let textInput = React.createRef();
  return(
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        ref={input => { textInput = input }}
        placeholder="new verse"
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
export default AddVerse;
