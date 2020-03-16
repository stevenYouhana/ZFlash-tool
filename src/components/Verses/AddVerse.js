import React, { Component } from 'react';
import { Platform, Button, TextInput, StyleSheet, Text, View, SafeAreaView }
  from 'react-native';
let bottomStyle = 0;

const AddVerse = props => {
  let verse;
  let textInput = React.createRef();
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

  return(
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
      </View>
    </View>
  );
}

export default AddVerse;
