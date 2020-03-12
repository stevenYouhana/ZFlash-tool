import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddTopic from '../Topics/AddTopic';
import AddVerse from '../Verses/AddVerse';

const AddModal = (props) => {
  return(
    <Modal animationType="slide"
          transparent={false}
          visible={props.visiblity}
          >
          <View style={styles.container}>
          <Ionicons name="md-checkmark" size={32} color="green"
          style={styles.close} onPress={() => props.handleAdd()} />
          <Text>Add topics or verses</Text>
          <AddTopic handleNewTopic={props.handleNewTopic} />
          <AddVerse keyboardOffset={props.keyboardOffset}
          handleNewVerse={props.handleNewVerse}
          topic={props.topic} />
          </View>

    </Modal>
  );
}

export default AddModal;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'flex-start',
    height: 400,
    // backgroundColor: 'red',
    marginLeft: 15,
    marginRight: 15,
  },
  close: {
    // alignContent: 'flex-start',
    // backgroundColor: '#ffd941',
    marginTop: 20,
    width: 45,
    // marginRight: 200,
    padding: 8,
    borderStyle: 'solid',
    borderWidth: .2,
    borderBottomRightRadius: 10,
  },
  Ionicons: {

  }
});
