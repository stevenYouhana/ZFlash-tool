import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native';
import Topic from './Topic';
import AddTopic from '../Topics/AddTopic';
import Database from '../../database/Database';
const db = new Database();

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topics: [],  topic: '' }
    this.getTopics = this.getTopics.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateUponRemoval = this.updateUponRemoval.bind(this);
  }
  getTopics() {
      return this.state.topics && this.state.topics.length > 0 ?
        this.state.topics.map((topic, i) => {
          return(
            <Topic key={`Topic${i}`} childKey={`childKey${i}`}
             textKey={`textKey${i}`} topicName={topic}
             handleTopic={this.props.handleTopic} updateParentData={this.updateUponRemoval} />
         );
       }) : <Text style={styles.noTopicsLoded}>{'no topics loaded...\nClick To load topic'}</Text>      
  }
  updateUponRemoval(topicRemoved) {
    this.setState({ topics: this.state.topics.filter(el => el !== topicRemoved) });
  }
  updateData() {
    if (this.state.topics) {
      let lastIndex = this.state.topics.length > 0 ? this.state.topics.length : 0;

      db.setDataUpToDate().then(results => {
        setTimeout(() => {
          if (results[lastIndex])
            this.setState({topics: [...this.state.topics,
              results[lastIndex].topicName] });
        }, 10);
      });
    }
  }
  componentDidMount() {
    // db.clearDB();
    db.setDataUpToDate().then(results => {
      results.map(result => {
        this.setState({ topics: [...this.state.topics, result.topicName] });
      })
    })
  }
  render() {
    return(
      <View>
        <TouchableOpacity style={{width: 70, marginTop: 15}} onPress={
          () => this.updateData()}>
          <Text style={{padding: 10, borderStyle: 'solid', borderWidth: .2}}>
            Refresh
          </Text>
        </TouchableOpacity>
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
