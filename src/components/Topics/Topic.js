import React, { Component } from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native';
=======
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Database from '../../database/Database';
const db = new Database();

>>>>>>> dev
const formatTopicName = (topic) => {
  if (topic && typeof topic === 'string')
    return topic.charAt(0).toUpperCase() +
      topic.slice(1, topic.length).toLowerCase();
}
const Topic = props => {
<<<<<<< HEAD

=======
  const deleteTopic = () => {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete ${props.topicName}?\nAll associated verses will be deleted.`,
      [
        { text: 'Yes',
          onPress: () => {
            db.deleteATopic(props.topicName);
            setTimeout(() => props.updateParentData(props.topicName), 500);
          }
        },
        { text: 'No', onPress: () => console.log('No Pressed') },
      ],
      { cancelable: false }
    );
  }
>>>>>>> dev
  return(
    <TouchableOpacity
    childKey={props.childKey}
    onPress={() => props.handleTopic(props.topicName)}
<<<<<<< HEAD
=======
    onLongPress={() => deleteTopic()}
>>>>>>> dev
     style={styles.topic}>
         <Text key={props.textKey}>{formatTopicName(props.topicName)}</Text>
   </TouchableOpacity>
  );
}
<<<<<<< HEAD

const styles = StyleSheet.create({
  topicsView: {
    width: 300,
  },
  topic: {
    textAlign: 'center', 
     marginVertical: 1,
     borderStyle: 'solid',
     borderWidth: .5,
     // alignItems: 'center',
=======
const styles = StyleSheet.create({
  topic: {
    textAlign: 'center',
     marginVertical: 1,
     borderStyle: 'solid',
     borderWidth: .5,
     alignItems: 'center',
<<<<<<< HEAD
>>>>>>> dev
     padding: 15,
=======
     padding: 10,
>>>>>>> dev
     backgroundColor: 'lightblue'
  },
});

export default Topic;
