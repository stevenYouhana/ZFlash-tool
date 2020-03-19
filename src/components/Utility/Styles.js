import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const Styles = StyleSheet.create({
  mainView: {
    // backgroundColor: 'rgba(0, 0, 0, .8)',

  },
  container: {
    borderWidth: 6,
    borderColor: 'lightyellow',
    marginLeft: 15,
    marginRight: 15,
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, .7)'
  },
  title: {
    color: 'white',
    fontSize: 16,
    paddingBottom: 10
  },
  close: {
    marginLeft: width * .7,
    width: 35,
    paddingTop: 2,
    paddingBottom: 2,
    padding: 5,
  },
  AddTopic: {
    margin: 10,
  }
});

export default Styles;
