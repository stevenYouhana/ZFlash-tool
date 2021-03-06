import React, { Component } from 'react';
import { Platform, Button, TextInput, StyleSheet, Text, View, SafeAreaView }
  from 'react-native';
let bottomStyle = 0;

const AddVerse = props => {
  let verse;
  let textInput = React.createRef();

  return(
    <View style={styles.container}>
      <View style={styles.addVerseHolder}>
        <TextInput
          style={{
            alignContent: 'flex-start',
            height: 35,
            width: 215,
            borderColor: `${props.topic ? 'white' : 'black'}`,
            color: 'white',
            borderWidth: 1,
            paddingLeft: 5,
          }}
          ref={input => { textInput = input }}
          placeholder={props.topic ? "e.g. Jn 1: 1-5" : ""}
          onChangeText={text => verse = text}
          value={verse}
          editable={props.topic ? true : false}
        />
        <View style={styles.buttonView}>
          <Button title="Add" onPress={() => {
            props.handleNewVerse(verse)
            textInput.clear()
            verse = null;
          }}
          disabled={props.topic ? false : true} />
        </View>
      </View>
    </View>
  );
}

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
  buttonView: {
    width: 80,
    height: 40,
  }
});

export default AddVerse;
