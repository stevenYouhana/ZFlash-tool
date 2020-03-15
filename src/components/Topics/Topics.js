import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Topic from './Topic';
import AddTopic from '../Topics/AddTopic';
import Database from '../../database/Database';
import AddTopicModal from '../Utility/AddTopicModal';

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
       }) : <Text style={styles.noTopicsLoded}>{'no topics loaded...\nClick To load topic'}</Text>
  }
  handleNewTopic(topic) {
    if (!topic || topic === '') {
      return;
    }
    db.add(topic);
    this.setState( {topics: [...this.state.topics, topic]} );
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
      <View>
      <AddTopicModal visiblity={this.state.AddTopicVisibility}
      hide={this.hideAddTopicVisibility}
      handleNewTopic={this.handleNewTopic}
      purpose={() => <AddTopic handleNewTopic={this.handleNewTopic} />} />
        <View style={styles.headerView}>
          <Ionicons name="md-add-circle" style={styles.addVeiw} size={40} color="#76c740"
          onPress={() => this.setState({ AddTopicVisibility:true })} />
          <Text style={styles.verseViewHeading}>Topics</Text>
        </View>

        <ScrollView style={styles.topicsView}>
          {this.getTopics()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  topicsView: {
    width: 300,
    padding: 15,
    // height: 120,
    backgroundColor: 'lightyellow'
  },
  verseViewHeading: {
    fontSize: 16,
    marginLeft: 20,
    padding: 5,
    paddingTop: 10,
    color: 'rgba(0, 0, 0, .5)',
  },
  noTopicsLoded: {
    fontSize: 19,
    padding: 20,
    color: 'rgba(0,0,0,0.5)',
    borderStyle: 'dotted',
    borderWidth: .4
  },
  addVeiw: {
    paddingLeft: 0,
    paddingBottom: 4
  },
});
