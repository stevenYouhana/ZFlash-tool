import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import Database from '../../database/Database';
import Topics from '../Topics/Topics';
import Verses from '../Verses/Verses';

const db = new Database();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topic: '', rawVerses: '' };
    this.handleTopic = this.handleTopic.bind(this);
  }
  handleTopic(topic) {
    this.setState({topic: topic});
    db.findTopic(topic).then(results => {
      this.setState({ rawVerses: results[0].verses })
    });
  }
  componentWillUnmount() {
  this.keyboardDidShowListener.remove();
  this.keyboardDidHideListener.remove();
}

_keyboardDidShow() {
  alert('Keyboard Shown');
}

_keyboardDidHide() {
  alert('Keyboard Hidden');
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
            <Topics handleTopic={this.handleTopic} />
          </View>
          <View style={styles.versesView}>
            <Text style={styles.verseViewHeading}>Verses for {this.state.topic}</Text>
            <Verses topic={this.state.topic} rawVerses={this.state.rawVerses} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    alignContent: 'flex-start',
    height: 35,
    width: 215,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,
    // bottom: 50,  TO KEYBOAD TOP
  },
  buttonView: {
    width: 80,
    height: 40,
  },
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
  form: {
    flex: 1,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
});
