import React, { Component } from 'react';
import { Button, TextInput, StyleSheet, Text, View } from 'react-native';

const AddTopic = props => {
  let topic;
  let textInput = React.createRef();
  return(
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        ref={input => { textInput = input }}
        placeholder="Topic name"
        onChangeText={text => topic = text}
        value={topic}
        required
      />
      <View style={styles.buttonView}>
        <Button title="Add"
        onPress={() => {
          if (!topic) alert("insert a topic name");
          props.handleNewTopic(topic)
          textInput.clear()
          topic = null;
        }}
        />
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
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    paddingLeft: 5,
  },
  buttonView: {
    width: 80,
    height: 40,
  }
});
export default AddTopic;
