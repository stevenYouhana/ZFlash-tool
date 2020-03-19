import {StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(215, 250, 249, .2)',
    // flexDirection: 'column',
    // width: width,
  },
  title: {
    flex: 1,
    // height: height * .08,
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'normal',
    paddingTop: 24,
    paddingLeft: 120,
    paddingRight: 120,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'rgba(217, 116, 76, .09)'
  },
  topicsView: {
    flex: 7,
    // height: height * .39,
    // height: 100,
    paddingBottom: 1,
    // width: width,
  },
  versesView: {
    flex: 12,
    // height: height * .6,
    // marginTop: 5,
    alignItems: 'center',
    // width: width,
  },
});

export default Styles;
