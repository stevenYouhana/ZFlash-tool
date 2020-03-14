import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddModal from './AddModal';

const Add = (props) => {  
  return(
    <View style={styles.container}>

        <Ionicons name="md-menu" style={styles.addVeiw} size={32} color="green"
        onPress={() => props.handleAdd()} />

      <AddModal visiblity={props.visiblity} handleAdd={props.handleAdd}
      handleNewTopic={props.handleNewTopic} handleNewVerse={props.handleNewVerse}
      topic={props.topic} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // justifyContent: 'flex-start',
    height: 12,
    // backgroundColor: 'red'
  },
  addVeiw: {
    // alignContent: 'flex-start',
    // backgroundColor: '#ffd941',
    marginTop: 20,
    marginRight: 280,
    padding: 8,
    width: 45,
    borderStyle: 'solid',
    borderWidth: .2,
    borderBottomRightRadius: 10,
  }
});
export default Add;
