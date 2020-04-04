import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const textInput = null;

export default class SearchTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: false, searchText: '' }
  }
  searchInput = () => {
    return this.state.searchInput ?
      <TextInput placeholder="search topic"
      clearTextOnFocus={false}
      value={this.state.searchText}
      onChangeText={text => {
        this.setState({ searchText: text })
        this.props.setSeachText(text)
        setTimeout(() => this.props.searching(true), 200)
      }}
      onEndEditing={() => {
        this.setState({ searchInput: false })
        this.props.searching(false)
      }}
      style={styles.textField}
      ref={textInput} /> : null
  }
  render() {
    return(
      <View style={styles.container}>
        <Ionicons name="md-search" size={35}
        color="rgba(0, 0, 0, .6)"
        onPress={() => {
            this.setState({ searchInput: !this.state.searchInput })}
        }
        />
        { this.searchInput() }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  textField: {
    marginTop: 2,
    marginLeft: 2,
    paddingLeft: 2,
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, .5)',
    color: 'rgba(0, 0, 0, .7)',
    borderWidth: .3,
    borderRadius: 2
  }
});
