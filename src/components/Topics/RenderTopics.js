import React, { Component } from 'react';
import {Text, ScrollView} from 'react-native';
import Topic from './Topic';
import Styles from './Styles/Styles';

export default class RenderTopics extends React.Component {
  constructor(props) {
    super(props);
  }
  _filteredTopicsFor = searchText => {
      return this.props.topics.filter(topic => topic.toLowerCase()
        .includes(searchText.toLowerCase()) );
  }
  _renderTopics = (topicList, noTopicsMsg) => {
    return topicList && topicList.length > 0 ?
      topicList.map((topic, i) => {        
        return(
            <Topic key={`Topic${i}`} childKey={`childKey${i}`}
             textKey={`textKey${i}`} topicName={topic}
             handleTopic={this.props.handleTopic}
             updateParentData={this.props.updateParentData}
             editTopicName={this.props.editTopicName} />
       );
     }) : <Text style={Styles.noTopicsLoded}>{noTopicsMsg}</Text>
  }
  getTopics = () => {
    if (this.props.searching) {
      return this._renderTopics(this._filteredTopicsFor(this.props.searchText),
        "No topics found ...");
    }
    else {
      return this._renderTopics(this.props.topics,
        'no topics loaded...\nClick the top plus button to load a topic');
    }
  }
  render() {
    return(
      <ScrollView style={Styles.topicsView} keyboardShouldPersistTaps={'always'}>
          {this.getTopics()}
      </ScrollView>
    );
  }
}
