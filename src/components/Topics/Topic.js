import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Database from '../../database/Database';

const db = new Database();

const formatTopicName = (topic) => {
  if (topic && typeof topic === 'string')
    return topic.charAt(0).toUpperCase() +
      topic.slice(1, topic.length).toLowerCase();
}
const Topic = props => {
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
  return(
    <TouchableOpacity
    childKey={props.childKey}
    onPress={() => props.handleTopic(props.topicName)}
    onLongPress={() => deleteTopic()}
     style={styles.topic}>
         <Text key={props.textKey}>{formatTopicName(props.topicName)}</Text>
   </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  topic: {
    textAlign: 'center',
     marginVertical: 1,
     borderStyle: 'solid',
     borderWidth: .5,
     alignItems: 'center',
     padding: 8,
     backgroundColor: 'rgba(247, 237, 164, .3)'
  },
});

export default Topic;
