import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import AddVerse from './AddVerse';
import Verse from './Verse';
import Database from '../../database/Database';
import ESVapi from '../../Api/ESVapi';

const db = new Database();
const esv = new ESVapi();

export default class Verses extends React.Component {
  constructor(props) {
    super(props);
    this.state = { verse: ''  };    
    this.handleNewVerse = this.handleNewVerse.bind(this);
    this.renderVerses = this.renderVerses.bind(this);
    this.handleVerse = this.handleVerse.bind(this);
  }
  handleVerse(verseRef) {
    esv.fetch(verseRef).then(verse => this.setState({ verse }));
  }
  renderVerses() {
    return this.props.rawVerses.split('|').map((verse, i) => {
      return <Verse key={`${verse}${i}`} verseRef={verse} handleVerse={this.handleVerse} />
    })
  }
  handleNewVerse(newVerse) {
    if (!newVerse || newVerse === '') return;
     db.addVerseFor(this.props.topic, newVerse);
  }
  render() {
    return(
      <View>
        <AddVerse handleNewVerse={this.handleNewVerse} />
        <ScrollView>
          {this.renderVerses()}
          <Text>{this.state.verse}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  versesContainer: {
    width: 300,
    alignItems: 'center',
    padding: 2
  },
  verse: {
    fontSize: 16,
    color: 'blue'
  }
});
