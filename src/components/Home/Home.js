import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Database from '../../database/Database';
import Topics from '../Topics/Topics';
import Verses from '../Verses/Verses';

const db = new Database();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topic: '' };
    this.handleTopic = this.handleTopic.bind(this);
  }
  handleTopic(topic) {
    this.setState({topic: topic})    
  }
  componentDidMount() {
    db.initDB();
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
            <Verses topic={this.state.topic} />
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
  }
});
