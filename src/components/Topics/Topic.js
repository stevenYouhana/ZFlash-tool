import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import EditMenu from '../Utility/EditMenu';
import AddModal from '../Utility/AddModal';
import Database from '../../database/Database';
import Bugsnag from '@bugsnag/expo';

// Bugsnag.start();
const ErrorBoundary = Bugsnag.getPlugin('react');

const db = new Database();

const formatTopicName = (topic) => {
  if (topic && typeof topic === 'string')
    return topic.charAt(0).toUpperCase() +
      topic.slice(1, topic.length).toLowerCase();
}
class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editView: false }
  }
  deleteTopic = () => {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete <${this.props.topicName}>?\nAll associated verses will be deleted.`,
      [
        { text: 'Yes',
          onPress: () => {
            db.deleteATopic(this.props.topicName);
            setTimeout(() => this.props.updateParentData(this.props.topicName), 500);
          }
        },
        { text: 'No', onPress: () => console.log('No Pressed') },
      ],
      { cancelable: false }
    );
  }
  editTopic = (newName) => {
      if (newName === this.props.topicName) {
        this.setState({ editView: false });
        return;
      };
      try {
        db.editTopicnName(this.props.topicName, newName);
        this.setState({ editView: false });
        this.props.editTopicName(this.props.topicName, newName);
      } catch (err) {
        console.error("editTopic = (newName) => ", err)
      }
      finally {
        this.setState({ editView: false });
      }
  }
  hideEditMenu = () => {
    this.setState({ editView: false })
  }
  render() {
    return(

        <TouchableOpacity
        childKey={this.props.childKey}
        onPress={() => this.props.handleTopic(this.props.topicName)}
        onLongPress={() => this.setState({ editView: true })}
         style={styles.topic}>

         <AddModal visiblity={this.state.editView}
           hide={this.hideEditMenu}
           title="Edit topic name"
           purpose={() => <EditMenu visiblity={this.state.editView}
           currentTopicTitle={this.props.topicName}
           deleteTopic={this.deleteTopic} editTopic={this.editTopic} />}
         />
         <Text key={this.props.textKey}>{this.props.topicName}</Text>
       </TouchableOpacity>

    );
  }
}
const styles = StyleSheet.create({
  topic: {
    textAlign: 'center',
     marginVertical: 1,
     borderStyle: 'solid',
     borderWidth: .5,
     alignItems: 'center',
     padding: 8,
     backgroundColor: '#eefae1'
  },
});

export default Topic;
