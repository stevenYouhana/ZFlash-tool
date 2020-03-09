import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import AddVerse from './AddVerse';
import Database from '../../database/Database';

const db = new Database();

export default class Verses extends React.Component {
  constructor(props) {
    super(props);
    this.state = { verses: '' };
    // this.fetchVersesFor = this.fetchVersesFor.bind(this);
    this.handleNewVerse = this.handleNewVerse.bind(this);
    this.renderVerses = this.renderVerses.bind(this);
  }
  renderVerses() {
    return this.props.rawVerses.split('|').map((verse, i) => {
      return <Text style={styles.verse} key={`${verse}${i}`}>{verse}</Text>;
    })
  }
  handleNewVerse(newVerse) {
    if (!newVerse || newVerse === '') return;
     db.addVerseFor(this.props.topic, newVerse);
  }
  render() {
    return(
      <View>
        <ScrollView>
          {this.renderVerses()}
        </ScrollView>
        <AddVerse handleNewVerse={this.handleNewVerse} />
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
