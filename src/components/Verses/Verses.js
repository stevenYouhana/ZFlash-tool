import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import Verse from './Verse';
import AddVerse from './AddVerse';
import AddTopicModal from '../Utility/AddTopicModal';
import Database from '../../database/Database';
import ESVapi from '../../Api/ESVapi';

import { Ionicons } from '@expo/vector-icons';
// import { Overlay } from 'react-native-elements';

const db = new Database();
const esv = new ESVapi();

export default class Verses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verse: '',
      verses: [],
      AddVerseVisibility: false
    };
    this.renderVerses = this.renderVerses.bind(this);
    this.handleVerse = this.handleVerse.bind(this);
    this.handleNewVerse = this.handleNewVerse.bind(this);
  }
  handleVerse(verseRef) {
    esv.fetch(verseRef).then(verse => this.setState({ verse }));
  }
  renderVerses() {
    return this.props.rawVerses ?
      this.props.rawVerses.split('|').map((verse, i) => {
        return(
          <Verse key={`${verse}${i}`} verseRef={verse}
          handleVerse={this.handleVerse} topic={this.props.topic} />
        );
      }) :  <Text>No verses loaded yet ...</Text>
  }
  handleNewVerse(newVerse) {
    console.log("handleNewVerse(newVerse) for ", this.props.topic)
    if (!newVerse || newVerse === '') return;
     db.addVerseFor(this.props.topic, newVerse);
     setTimeout(() => this.renderVerses(), 500);
  }
  hideAddVerseVisibility = () => {
    this.setState({ AddVerseVisibility: false });
  }
  render() {
    const formatTopicName = (topic) => {
      if (topic && typeof topic === 'string')
        return topic.charAt(0).toUpperCase() +
          topic.slice(1, topic.length).toLowerCase();
    }
    return(
      <View style={styles.mainView}>
        <AddTopicModal visiblity={this.state.AddVerseVisibility}
          hide={this.hideAddVerseVisibility}
          handleNewTopic={this.handleNewTopic}
          purpose={() => <AddVerse topic={this.props.topic}
          handleNewVerse={this.handleNewVerse} />} />
          <View style={styles.headerView}>
            <Ionicons name="md-add-circle" style={styles.addVeiw} size={40} color="#76c740"
            onPress={() => this.setState({AddVerseVisibility: true })} />
            <Text style={styles.verseViewHeading}>{this.props.topic ?
              formatTopicName(this.props.topic) : 'select a topic'}</Text>
          </View>
          <View style={styles.versesOverall}>
            <ScrollView style={styles.versesContainer}>
              {this.renderVerses()}
            </ScrollView>
            <ScrollView style={styles.verseContent}>
              <Text style={styles.verseFont}>{this.state.verse}</Text>
            </ScrollView>
          </View>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 5
  },
  verseViewHeading: {
    fontSize: 16,
    marginLeft: 20,
    padding: 5,
    paddingTop: 10,
    color: 'rgba(0, 0, 0, .5)',
  },
  versesOverall: {
    flex: 1,
    flexDirection: 'row',
  },
  versesContainer: {
    borderStyle: 'dotted',
    borderRightWidth: .8,
    width: width * .30,
    padding: 2,
    backgroundColor: '#ede5d5'
  },
  verseContent: {
    backgroundColor: 'lightyellow',
    width: width * .70,
    padding: 5,
  },
  verseFont: {
    fontSize: 16,
  },
  addVeiw: {
    paddingLeft: 10,
    paddingBottom: 4
  },
});
