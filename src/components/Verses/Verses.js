import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import Verse from './Verse';
import ESVapi from '../../Api/ESVapi';

const esv = new ESVapi();

export default class Verses extends React.Component {
  constructor(props) {
    super(props);
    this.state = { verse: ''  };
    this.renderVerses = this.renderVerses.bind(this);
    this.handleVerse = this.handleVerse.bind(this);
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
  render() {
    return(
      <View style={styles.mainView}>
        <ScrollView style={styles.versesContainer}>
          {this.renderVerses()}
        </ScrollView>
        <ScrollView style={styles.verseContent}>
          <Text style={styles.verseFont}>{this.state.verse}</Text>
        </ScrollView>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  mainView: {
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
  }
});
