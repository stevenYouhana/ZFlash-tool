import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Keyboard, ScrollView } from 'react-native';
import Database from '../../database/Database';
import Topics from '../Topics/Topics';
import Verses from '../Verses/Verses';
import Add from '../Utility/Add';

const db = new Database();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      newTopic: '',
      rawVerses: '',
      keyboardHidden: true,
      keyboardOffset: 0,
      editMode: false,
    };
    this.handleTopic = this.handleTopic.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleNewTopic = this.handleNewTopic.bind(this);
    this.handleNewVerse = this.handleNewVerse.bind(this);
  }
  handleTopic(topic) {
    this.setState({topic: topic});
    db.findTopic(topic).then(results => {
      console.log("this.setState({ rawVerses: results[0].verses }): ", results[0].verses)
      this.setState({ rawVerses: results[0].verses })
    });
  }
  handleNewTopic(topic) {
    if (!topic || topic === '') {
      return;
    }
    this.setState({ newTopic: topic });
    db.add(topic);
  }
  handleNewVerse(newVerse) {
    if (!newVerse || newVerse === '') return;
     db.addVerseFor(this.state.topic, newVerse);
  }
  handleAdd() {
    this.setState({ editMode: !this.state.editMode });
    console.log("handleAdd(): ", this.state.editMode)
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow = (event) => {
    this.setState({ keyboardHidden: false, keyboardOffset: event.endCoordinates.height });
  }
  _keyboardDidHide = () => {
    this.setState({ keyboardHidden: true, keyboardOffset: 0 });
  }
  componentDidMount() {
    console.log("this.state.editMode: ",this.state.editMode)
    db.initDB();
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  render() {
    return(
      <SafeAreaView>
        <View style={styles.container}>
        <Add handleAdd={this.handleAdd} handleTopic={this.handleTopic}
        handleNewTopic={this.handleNewTopic}
        handleNewVerse={this.handleNewVerse}
        visiblity={this.state.editMode}
        keyboardOffset={this.state.keyboardOffset} topic={this.state.topic} />
          <Text style={styles.title}>Z Flash</Text>
          <View style={styles.topicsView}>
            <Topics editMode={this.state.editMode} handleTopic={this.handleTopic}
            keyboardHidden={this.state.keyboardHidden} />
          </View>
          <View style={styles.versesView}>
            <Text style={styles.verseViewHeading}>Verses for {this.state.topic}</Text>
            <Verses editMode={this.state.editMode}
            topic={this.state.topic}
            rawVerses={this.state.rawVerses} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  topicsView: {
    height: 300
  },
  versesView: {
    height: 240,
    alignItems: 'center'
  },
  verseViewHeading: {
    fontSize: 18,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: .3
  },
});
