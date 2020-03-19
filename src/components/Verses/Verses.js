import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions,SafeAreaView } from 'react-native';
import Verse from './Verse';
import AddVerse from './AddVerse';
import AddModal from '../Utility/AddModal';
import Database from '../../database/Database';
import ESVapi from '../../Api/ESVapi';

import { Ionicons } from '@expo/vector-icons';

const db = new Database();
const esv = new ESVapi();

const API_ERR = 'API error';

export default class Verses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verse: '',
      AddVerseVisibility: false
    };
    this.renderVerses = this.renderVerses.bind(this);
    this.handleVerse = this.handleVerse.bind(this);
    this.renderScripture = this.renderScripture.bind(this);
    this.handleNewVerse = this.handleNewVerse.bind(this);
  }
  handleVerse(verseRef) {
    this.setState({ verse: 'loading ...' });
    esv.fetch(verseRef).then(verse => this.setState({ verse }))
      .catch(err => {
        this.setState({ verse: API_ERR });
      });
  }
  renderVerses() {
    return this.props.rawVerses ?
      this.props.rawVerses.split('|').filter(el => el !== '')
        .map( (verse, i) => {
          return(
            <Verse key={`${verse}${i}`} verseRef={verse}
            handleVerse={this.handleVerse} topic={this.props.topic}
            refreshVerses={this.props.refreshVerses} />
          );
        }):  <Text>No verses loaded yet ...</Text>
  }
  handleNewVerse(newVerse) {
    if (!newVerse || newVerse === ''|| !/\w/.test(newVerse)) return;
    if (newVerse.split('').includes('|')) {
      console.log("Cannot contain the '|' character in verse.")
      alert("Cannot contain the '|' character in verse.");
      return;
    }
     db.addVerseFor(this.props.topic, newVerse);
     setTimeout(() => {
       this.props.refreshVerses(this.props.topic);
       this.renderVerses();
     }, 500);
  }
  renderScripture() {
    if (this.state.verse === API_ERR) {
        return(
          <Text style={styles.verseNotFound}>Trouble finding verse; either due to a bad internet connection or an incorrect verse reference spelling ...</Text>
        );
    }
    else {
      return(
        <Text style={styles.verse}>{this.state.verse ? this.state.verse
          : 'select a verse ...'}</Text>
      );
    }

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
        <AddModal visiblity={this.state.AddVerseVisibility}
          hide={this.hideAddVerseVisibility}
          handleNewTopic={this.handleNewTopic}
          title={this.props.topic ? `Add a new verse for <${this.props.topic}>` :
            'First, select a topic'}
          purpose={() => <AddVerse topic={this.props.topic}
          handleNewVerse={this.handleNewVerse} />} />
          <View style={styles.headerView}>
            <Ionicons name="md-add-circle" style={styles.addVeiw} size={35} color="rgba(111, 209, 58, .8)"
            onPress={() => this.setState({AddVerseVisibility: true })} />
            <View style={{width: 250, height: 50, padding: 10}}>
              <Text style={styles.verseViewHeading}
                adjustsFontSizeToFit
                numberOfLines={2}
                allowFontScaling>
                  {this.props.topic ?
                    formatTopicName(this.props.topic) : 'select a topic'}
             </Text>
            </View>
          </View>
          <View style={styles.versesOverall}>
            <ScrollView style={styles.verseReferences}>
              {this.renderVerses()}
            </ScrollView>
            <ScrollView style={styles.verseContent}>
              {this.renderScripture()}
            </ScrollView>
          </View>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    width: width,
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
    marginTop: 10,
  },
  verseViewHeading: {
    fontSize: 18,
    marginLeft: 20,
    // paddingBottom: 5,
    paddingTop: 12,
    color: 'rgba(0, 0, 0, .5)',
  },
  addVeiw: {
    paddingLeft: 10,
    paddingTop: 15
  },
  versesOverall: {
    flex: 6,
    flexDirection: 'row',
    // paddingTop: 5,
    bottom: 1,
  },
  verseReferences: {
    // flex: 1,
    paddingLeft: 5,
    borderStyle: 'dotted',
    borderWidth: .3,
    borderRightWidth: .8,
    width: width * .3,
    // height: height * .8,
    padding: 2,
    backgroundColor: '#ede5d5',
  },
  verseContent: {
    backgroundColor: 'rgba(237, 237, 164, .2)',
    width: width * .70,
    borderStyle: 'solid',
    borderWidth: .3,
    marginRight: 1,
    padding: 2,
  },
  verse: {
    fontSize: 15,
    paddingBottom: 10,
    marginBottom: 10,
    padding: 5
  },
  verseNotFound: {
    color: 'rgba(255, 0, 0, .5)',
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'red',
    padding: 20,
    fontStyle: 'italic'
  }
});
