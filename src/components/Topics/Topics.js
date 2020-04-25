import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Topic from './Topic';
import RenderTopics from './RenderTopics';
import AddTopic from '../Topics/AddTopic';
import Database from '../../database/Database';
import AddModal from '../Utility/AddModal';
import SearchTopic from '../Search/SearchTopic/SearchTopic';
import Styles from './Styles/Styles';

const db = new Database();

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      topic: '',
      AddTopicVisibility: false,
      searching: false,
      searchText: ''
    }
    this.updateData = this.updateData.bind(this);
    this.handleNewTopic = this.handleNewTopic.bind(this);
    this.updateUponRemoval = this.updateUponRemoval.bind(this);
    this.editTopicName = this.editTopicName.bind(this);
  }
  handleNewTopic(topic) {
    if (!topic || topic === ''|| !/\w/.test(topic)) return;
    if (!this.state.topics.some(el => el.toLowerCase() === topic.trim().toLowerCase())) {
      db.add(topic);
      this.setState( { topics: [...this.state.topics, topic.trim()] } );
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
  editTopicName(topicName, newName) {
    const formatedName = newName.trim();
    if (this.state.topics.some(topic =>
      topic.toLowerCase() === formatedName.toLowerCase())) {
        alert("Topic already exists!\nEnding process.");
        return;
    }
    let topics = [...this.state.topics]
    let i = 0;
    for (i; i<topics.length; i++)
      if (topics[i] === topicName) {
        topics[i] = formatedName;
        break;
      }
    this.setState({ topics: topics, topic: formatedName });
    this.props.updateTopicName(formatedName);
  }
  hideAddTopicVisibility = () => {
    this.setState({ AddTopicVisibility: false });
  }
  componentDidMount() {    
    db.setDataUpToDate().then(results => {
      results.map(result => {
        this.setState({ topics: [...this.state.topics, result.topicName] });
      });
    });
  }
  render() {
    const searchingInProgress = (searching) => {
      this.setState({ searching: searching});
    }
    const setSeachText = (text) => {
      this.setState({ searchText: text });
    }
    return(
      <View style={Styles.container}>
        <AddModal visiblity={this.state.AddTopicVisibility}
          hide={this.hideAddTopicVisibility}
          title="Add new topics"
          purpose={() => <AddTopic handleNewTopic={this.handleNewTopic} />}
        />
        <View style={Styles.headerView}>
         <View style={Styles.addVeiwContainer}>
           <Ionicons name="md-add-circle" size={35}
           color="rgba(111, 209, 58, .7)"
           onPress={() => this.setState({ AddTopicVisibility: true })} />
           <Text style={Styles.verseViewHeading}>Topics</Text>
         </View>
          <View style={Styles.searchViewContainer}>
            <SearchTopic searching={searchingInProgress}
            setSeachText={setSeachText} />
          </View>
        </View>
        <View style={Styles.topicListView}>
          <RenderTopics topics={this.state.topics}
            handleTopic={this.props.handleTopic}
            updateParentData={this.updateUponRemoval}
            editTopicName={this.editTopicName}
            searching={this.state.searching}
            searchText={this.state.searchText}
            topicDeleted={this.props.topicDeleted}
          />
        </View>
      </View>
    );
  }
}
