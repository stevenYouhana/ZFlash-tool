import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, TextInput, Button,
   Keyboard, ScrollView, Dimensions } from 'react-native';
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
  refreshVerses = (topic) => {
    db.findTopic(topic).then(results => {
      this.setState({ rawVerses: results[0].verses })
    });
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
            rawVerses={this.state.rawVerses}
            refreshVerses={this.refreshVerses} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    width: width,
  },
  title: {
    height: height * .08,
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'normal',
    paddingTop: 30,
    paddingLeft: 120,
    paddingRight: 120,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'rgba(217, 116, 76, .1)'
  },
  topicsView: {
    height: height * .39,
    // height: 100,
    paddingBottom: 1,
    // width: width,
  },
  versesView: {
    height: height * .6,
    marginTop: 5,
    alignItems: 'center',
    // width: width,
  },
});
