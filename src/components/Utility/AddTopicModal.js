import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddTopic from '../Topics/AddTopic';

const AddTopicModal = (props) => {
  return(
    <View style={styles.mainView}>
      <Modal animationType="slide"
            transparent={true}
            visible={props.visiblity}
            >
            <View style={styles.container}>
              <Ionicons name="md-checkmark" size={32} color="green"
              style={styles.close} onPress={() => props.hide()} />
              <View style={styles.AddTopic}>
                <Text>{props.title}</Text>
                {props.purpose()}
              </View>
            </View>
      </Modal>
    </View>

  );
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  mainView: {
    // backgroundColor: 'rgba(0, 0, 0, .8)',

  },
  container: {
    borderWidth: 6,
    borderColor: 'lightyellow',
    marginLeft: 15,
    marginRight: 15,
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, .7)'
  },
  close: {
    // alignContent: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, .8)',
    marginTop: 20,
    marginLeft: width * .7,
    width: 45,
    padding: 8,
    borderStyle: 'solid',
    borderWidth: .2,
    borderBottomRightRadius: 10,
  },
  AddTopic: {
    margin: 10,
  }
});
export default AddTopicModal;
