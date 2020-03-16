import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions,SafeAreaView } from 'react-native';
import Verse from './Verse';
import AddVerse from './AddVerse';
import AddModal from '../Utility/AddModal';
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
          handleVerse={this.handleVerse} topic={this.props.topic}
          refreshVerses={this.props.refreshVerses} />
        );
      }) :  <Text>No verses loaded yet ...</Text>
  }
  handleNewVerse(newVerse) {
    console.log("handleNewVerse(newVerse) for ", this.props.topic)
    if (!newVerse || newVerse === '') return;
     db.addVerseFor(this.props.topic, newVerse);
     setTimeout(() => {
       this.props.refreshVerses(this.props.topic);
       this.renderVerses();
     }, 500);
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
          title={`Add a new verse for ${this.props.topic}`}
          purpose={() => <AddVerse topic={this.props.topic}
          handleNewVerse={this.handleNewVerse} />} />
          <View style={styles.headerView}>
            <Ionicons name="md-add-circle" style={styles.addVeiw} size={40} color="#76c740"
            onPress={() => this.setState({AddVerseVisibility: true })} />
            <View style={{width: 250, height: 50, padding: 10}}>
              <Text style={styles.verseViewHeading}
              adjustsFontSizeToFit
              numberOfLines={2}
              allowFontScaling>
                {this.props.topic ?
                  formatTopicName(this.props.topic) : 'select a topic'}</Text>
            </View>
          </View>
          <View style={styles.versesOverall}>
            <ScrollView style={styles.verseReferences}>
              {this.renderVerses()}
            </ScrollView>
            <ScrollView style={styles.verseContent}>
              <Text style={styles.verse}>{this.state.verse}</Text>
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
    flexDirection: 'column'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  verseViewHeading: {
    fontSize: 15,
    marginLeft: 20,
    paddingTop: 5,
    color: 'rgba(0, 0, 0, .7)',
  },
  versesOverall: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    // height: height * .7,
  },
  verseReferences: {
    borderStyle: 'dotted',
    borderRightWidth: .8,
    width: width * .30,
    padding: 2,
    backgroundColor: '#ede5d5'
  },
  verseContent: {
    backgroundColor: 'lightyellow',
    width: width * .70,
    // height: 100,
    paddingBottom: 0,
    borderStyle: 'solid',
    borderWidth: .3,
    marginRight: 1,
  },
  verse: {
    fontSize: 16,
    paddingBottom: 10,
    marginBottom: 10
  },
  addVeiw: {
    paddingLeft: 10,
    paddingBottom: 4
  },
});
