import React, { Component } from 'react';
import { Platform, Button, TextInput, StyleSheet, Text, View, SafeAreaView } from 'react-native';

const AddTopic = props => {
  let topic;
  return(
    <View>
      <TextInput
        placeholder="new topic"
        style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => topic = text}
        value={topic}
      />
      <Button title="Add" onPress={() => props.handleNewTopic(topic)} />
    </View>
  );
}
export default AddTopic;
