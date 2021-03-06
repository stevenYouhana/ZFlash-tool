import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const Styles = StyleSheet.create({
  mainView: {
    // backgroundColor: 'rgba(0, 0, 0, .8)',

  },
  container: {
    borderWidth: 2,
    borderColor: '#deffbf',
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
    // marginLeft: width * .7,
    marginLeft: '80%',
    width: 35,
    paddingTop: 2,
    paddingBottom: 1,
    // padding: 5,
  },
  AddTopic: {
    margin: 10,
  },
  textField: {
    // flex: 1,
    alignContent: 'flex-start',
    height: 35,
    width: '80%',
    borderColor: 'white',
    color: 'white',
    borderWidth: 1,
    paddingLeft: 5,
  },
});

export default Styles;
