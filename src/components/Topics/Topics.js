import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native';
import Topic from './Topic';
import AddTopic from '../Topics/AddTopic';
import Database from '../../database/Database';
const db = new Database();

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topics: [], newTopic: '' }
    this.getTopics = this.getTopics.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  getTopics() {
    return this.state.topics && this.state.topics.length > 0 ?
      this.state.topics.map((topic, i) => {
        return(
          <Topic key={`Topic${i}`} childKey={`childKey${i}`}
           textKey={`textKey${i}`} topicName={topic}
           handleTopic={this.props.handleTopic} />
       );
     }) : <Text style={styles.noTopicsLoded}>no topics loaded ...</Text>
  }
  updateData() {
    let lastIndex = this.state.topics.length > 0 ? this.state.topics.length : 0;
    db.setDataUpToDate().then(results => {
      setTimeout(() => {
        console.log("results[lastIndex]: ", results[lastIndex])
        this.setState({topics: [...this.state.topics, results[lastIndex].topicName] });
      }, 10);

    });
  }
  handleNewTopic(topic) {
    if (!topic || topic === '') {
      return;
    }
    this.setState({ newTopic: topic });
    db.add(topic);
    setTimeout(() => this.updateData(), 5);
  }
  componentDidMount() {
    // db.clearDB();
    db.setDataUpToDate().then(results => {
      console.log("componentDidMount() Topics.js: ", results);
      results.map(result => {
        this.setState({ topics: [...this.state.topics, result.topicName] });
      })
    })
  }
  render() {
    return(
      <View>
        <AddTopic handleNewTopic={this.handleNewTopic.bind(this)} />
        <ScrollView style={styles.topicsView}>
          {this.getTopics()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topicsView: {
    width: 300,
    padding: 15
  },
  noTopicsLoded: {
    fontSize: 19,
    padding: 20,
    color: 'rgba(0,0,0,0.5)',
    borderStyle: 'dotted',
    borderWidth: .4
  }
});
