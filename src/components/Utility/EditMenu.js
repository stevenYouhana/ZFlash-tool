import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TextInput, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Styles from './Styles';
import AddTopic from '../Topics/AddTopic';


const EditMenu = (props) => {
  console.log("currentTopicTitle: ",currentTopicTitle)
  return(
    <View style={Styles.mainView}>
      <Modal animationType="slide"
            transparent={true}
            visible={true}
            >
            <View style={Styles.container}>
              <Ionicons name="md-remove" size={60} color="white"
              style={Styles.close} onPress={() => props.hide()} />
              <View>
                <Text style={Styles.title}>{props.title}</Text>
                {() => {
                  return(
                    <View>
                      <Text>Edit Topic</Text>
                      <TextInput value={props.currentTopicTitle} />
                      <Button title="Save" onPress={() => alert("new name saved!")} />
                      <Button title="Delete" onPress={() => alert("deleting...")} />
                    </View>
                  )
                }}
              </View>
            </View>
      </Modal>
    </View>

  );
}

export default EditMenu;
