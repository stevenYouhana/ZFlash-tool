import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import Verse from './Verse';
import Database from '../../database/Database';
import ESVapi from '../../Api/ESVapi';

const db = new Database();
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
    return this.props.rawVerses.split('|').map((verse, i) => {
      return <Verse key={`${verse}${i}`} verseRef={verse} handleVerse={this.handleVerse} />
    })
  }
  render() {
    return(
      <View>
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
