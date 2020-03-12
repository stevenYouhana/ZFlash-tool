import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native';
const formatTopicName = (topic) => {
  if (topic && typeof topic === 'string')
    return topic.charAt(0).toUpperCase() +
      topic.slice(1, topic.length).toLowerCase();
}
const Topic = props => {

  return(
    <TouchableOpacity
    childKey={props.childKey}
    onPress={() => props.handleTopic(props.topicName)}
     style={styles.topic}>
         <Text key={props.textKey}>{formatTopicName(props.topicName)}</Text>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  topicsView: {
    width: 300,
  },
  topic: {
    textAlign: 'center',
     marginVertical: 1,
     borderStyle: 'solid',
     borderWidth: .5,
     alignItems: 'center',
     padding: 15,
     backgroundColor: 'lightblue'
  },
});

export default Topic;
