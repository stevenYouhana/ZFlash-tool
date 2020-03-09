import React, { Component } from 'react';
import { Platform, Button, TextInput, StyleSheet, Text, View, SafeAreaView } from 'react-native';

const AddVerse = props => {
  let verse;
  return(
    <View>
      <TextInput
        placeholder="new verse"
        style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => verse = text}
        value={verse}
      />
      <Button title="Add" onPress={() => props.handleNewTopic(verse)} />
    </View>
  );
}
export default AddVerse;
