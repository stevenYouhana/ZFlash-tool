import React, { Component } from 'react';
import { Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import Styles from './Styles.js';

import Database from '../../database/Database';
import Topics from '../Topics/Topics';
import Verses from '../Verses/Verses';

const db = new Database();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      rawVerses: '',
    };
    this.handleTopic = this.handleTopic.bind(this);
    this.updateTopicName = this.updateTopicName.bind(this);
  }
  handleTopic(topic) {
    const formated = topic.trim();
    this.setState({ topic:  formated });
    setTimeout(() => {
      db.findTopic(formated).then(results => {
        this.setState({ rawVerses: results[0].verses })
      }).catch(err => {
        console.error("handleTopic(topic) > db.findTopic(topic).then(results =>", err);
        alert("handleTopic(topic) error. Contact developer");
      });
    }, 100);
  }
  updateTopicName(newName) {
    this.setState({ topic: newName })
  }
  refreshVerses = (topic) => {
    db.findTopic(topic).then(results => {
      this.setState({ rawVerses: results[0].verses })
    });
  }
  componentDidMount() {
    db.initDB();
  }
  render() {
    return(
      <SafeAreaView style={Styles.container}>
        <View style={Styles.title}>
            <Text>Z Flash</Text>
        </View>
        <View style={Styles.topicsView}>
            <Topics handleTopic={this.handleTopic}
            keyboardHidden={this.state.keyboardHidden}
            updateTopicName={this.updateTopicName} />
        </View>
        <View style={Styles.versesView}>
          <Verses
            topic={this.state.topic}
            rawVerses={this.state.rawVerses}
            refreshVerses={this.refreshVerses} />
        </View>
      </SafeAreaView>
    );
  }
}
