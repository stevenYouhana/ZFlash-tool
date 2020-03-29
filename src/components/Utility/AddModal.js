import React, { Component } from 'react';
import { Modal, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Styles from './Styles';
import AddTopic from '../Topics/AddTopic';


const AddModal = (props) => {
  return(
    <View style={Styles.mainView}>
      <Modal animationType="slide"
            transparent={true}
            visible={props.visiblity}
            >
            <View style={Styles.container}>
              <Ionicons name="md-remove" size={60} color="white"
              style={Styles.close} onPress={() => props.hide()} />
              <View style={Styles.AddTopic}>
                <Text style={Styles.title}>{props.title}</Text>
                {props.purpose()}
              </View>
            </View>
      </Modal>
    </View>

  );
}

export default AddModal;
