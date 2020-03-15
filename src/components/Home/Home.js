import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Keyboard, ScrollView } from 'react-native';
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
      keyboardHidden: true,
      keyboardOffset: 0,
      editMode: false,
    };
    this.handleTopic = this.handleTopic.bind(this);
  }
  handleTopic(topic) {
    this.setState({topic: topic});
    db.findTopic(topic).then(results => {
      this.setState({ rawVerses: results[0].verses })
    });
  }
  refreshVerse = () => {

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
          <Text style={styles.title}>Z Flash</Text>
          <View style={styles.topicsView}>
            <Topics editMode={this.state.editMode} handleTopic={this.handleTopic}
            keyboardHidden={this.state.keyboardHidden} />
          </View>
          <View style={styles.versesView}>
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
    height: 280
  },
  versesView: {
    // height: 260,
    alignItems: 'center'
  },
});
