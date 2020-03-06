import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native';

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topics: ['topic 1','topic 2', 'topic 3','topic 1','topic 2', 'topic 3','topic 2', 'topic 3','topic 2', 'topic 3'] }
    this.getTopics = this.getTopics.bind(this);
  }
  getTopics() {    
    return this.state.topics ?
      this.state.topics.map((topic, i) => {
        return(
          <TouchableOpacity
          key={`topic${i}`}
          onPress={() => this.props.handleTopic(topic)}
           style={styles.topic}>
               <Text key={i}>{topic}</Text>
         </TouchableOpacity>
       );
      }) : [];
  }
  render() {
    return(
      <ScrollView style={styles.topicsView}>
        {this.getTopics()}
      </ScrollView>
    );
  }
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
     padding: 15
  },

});
