import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Topic from './Topic';
import AddTopic from '../Topics/AddTopic';
import Database from '../../database/Database';
import AddModal from '../Utility/AddModal';
import Styles from './Styles/Styles';

const db = new Database();

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topics: [],  topic: '', AddTopicVisibility: false }
    this.getTopics = this.getTopics.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleNewTopic = this.handleNewTopic.bind(this);
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
       }) : <Text style={Styles.noTopicsLoded}>{'no topics loaded...\nClick the top plus button to load a topic'}</Text>
  }
  handleNewTopic(topic) {
    if (!topic || topic === ''|| !/\w/.test(topic)) return;
    if (!this.state.topics.some(el => el.toLowerCase() === topic.toLowerCase())) {
      db.add(topic);
      this.setState( {topics: [...this.state.topics, topic]} );
    }
    else {
      alert("Topic already exists!");
    }
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
  hideAddTopicVisibility = () => {
    this.setState({ AddTopicVisibility: false });
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
      <View style={Styles.container}>
        <AddModal visiblity={this.state.AddTopicVisibility}
          hide={this.hideAddTopicVisibility}
          handleNewTopic={this.handleNewTopic}
          title="Add new topics"
          purpose={() => <AddTopic handleNewTopic={this.handleNewTopic} />}
        />
        <View style={Styles.headerView}>
          <Ionicons name="md-add-circle" style={Styles.addVeiw} size={35}
          color="rgba(111, 209, 58, .7)"
          onPress={() => this.setState({ AddTopicVisibility:true })} />
          <Text style={Styles.verseViewHeading}>Topics</Text>
        </View>

        <ScrollView style={Styles.topicsView}>
          {this.getTopics()}
        </ScrollView>
      </View>
    );
  }
}
