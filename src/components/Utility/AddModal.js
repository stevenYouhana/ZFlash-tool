import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddTopic from '../Topics/AddTopic';

const AddModal = (props) => {
  return(
    <View style={styles.mainView}>
      <Modal animationType="slide"
            transparent={true}
            visible={props.visiblity}
            >
            <View style={styles.container}>
              <Ionicons name="md-remove" size={60} color="white"
              style={styles.close} onPress={() => props.hide()} />
              <View style={styles.AddTopic}>
                <Text style={styles.title}>{props.title}</Text>
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
  title: {
    color: 'white',
    fontSize: 16,
    paddingBottom: 10
  },
  close: {
    // backgroundColor: 'rgba(255, 255, 255, .8)',
    // marginTop: 5,
    marginLeft: width * .7,
    width: 35,
    paddingTop: 2,
    paddingBottom: 2,
    padding: 5,
    // borderStyle: 'solid',
    // borderWidth: .2,
    // borderRadius: 6,
    // borderBottomRightRadius: 10,
  },
  AddTopic: {
    margin: 10,
  }
});
export default AddModal;
