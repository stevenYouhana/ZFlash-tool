import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import * as Sentry from 'sentry-expo';
import Verse from './Verse';
import AddVerse from './AddVerse';
import AddModal from '../Utility/AddModal';
import Database from '../../database/Database';
import ESVapi from '../../Api/ESVapi';
import Styles from './Styles/Styles';

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
        Sentry.captureException(new Error("Verses.js: handleVerse(verseRef)", err.message));
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
        }) :
        <Text style={Styles.addVerses}>
          {this.props.topic ? `Add verses for <${this.props.topic}>`
            : "Select a topic then add verses"}
        </Text>
  }
  handleNewVerse(newVerse) {
    if (!newVerse || newVerse === ''|| !/\w/.test(newVerse)) return;
    if (newVerse.split('').includes('|')) {
      console.log("Cannot contain the '|' character in verse.")
      alert("Cannot contain the '|' character in verse.");
      return;
    }
    try {
      const formated = newVerse.trim();
      db.addVerseFor(this.props.topic, formated);
      setTimeout(() => {
        this.props.refreshVerses(this.props.topic);
        this.renderVerses();
      }, 500);
    } catch(err) {
      console.error("handleNewVerse(newVerse): ", err)
      Sentry.captureException(new Error("Verses.js: handleNewVerse(newVerse): ", err.message);
      alert("an error occurred: handleNewVerse(newVerse)\ncontact the developer");
    }
  }
  renderScripture() {
    if (this.state.verse === API_ERR) {
        return(
          <Text style={Styles.verseNotFound}>
          Trouble finding verse; either due to a bad internet connection or an incorrect verse reference spelling ...
          </Text>
        );
    }
    else {
      return this.state.verse ? <Text style={Styles.verse}>{this.state.verse}</Text>
        : <Text style={Styles.noVerseSelected}>{'< Select a verse'}</Text>
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
      <View style={Styles.mainView}>
        <AddModal visiblity={this.state.AddVerseVisibility}
          hide={this.hideAddVerseVisibility}
          handleNewTopic={this.handleNewTopic}
          title={this.props.topic ? `Add verses for <${this.props.topic}>` :
            'First, select a topic'}
          purpose={() => <AddVerse topic={this.props.topic}
          handleNewVerse={this.handleNewVerse} />} />
          <View style={Styles.headerView}>
            <Ionicons name="md-add-circle" style={Styles.addVeiw} size={35} color="rgba(111, 209, 58, .7)"
            onPress={() => this.setState({AddVerseVisibility: true })} />
            <View style={{width: 250, height: 50, padding: 10}}>
              <Text style={Styles.verseViewHeading}
                adjustsFontSizeToFit
                numberOfLines={2}
                allowFontScaling>
                  {this.props.topic ? this.props.topic : 'select a topic ^'}
             </Text>
            </View>
          </View>
          <View style={Styles.versesOverall}>
            <ScrollView style={Styles.verseReferences}>
              {this.renderVerses()}
            </ScrollView>
            <ScrollView style={Styles.verseContent}>
              {this.renderScripture()}
            </ScrollView>
          </View>
      </View>
    );
  }
}
