import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Styles from './Styles';

class EditMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newName: this.props.currentTopicTitle }
  }
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.editView}>
          <TextInput style={Styles.textField} value={this.state.newName}
          onChangeText={ text => this.setState({ newName: text })} />
          <View style={styles.buttonSave}>
            <Button title="Save"
              onPress={() => this.props.editTopic(this.state.newName)} />
          </View>
        </View>
        <View style={styles.deleteView}>
          <Button style={styles.buttonDelete} title="delete topic" color='#ff6a53'
            onPress={() => this.props.deleteTopic()} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container : {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  editView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  deleteView: {
    marginVertical: 10,
  },
  textField: {    
    alignContent: 'flex-start',
    height: 35,
    width: '80%',
    borderColor: 'gray',
    color: 'white',
    borderWidth: 1,
    paddingLeft: 5,
  },
  buttonSave: {
    width: '18%',
    alignContent: 'flex-end',
  },
});
export default EditMenu;
