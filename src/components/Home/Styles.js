import {StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(215, 250, 249, .2)',
    // height: height,
    // flexDirection: 'column',
    // width: width,
  },
  title: {
    flex: 1,
    width: '82%',
    paddingRight: '15%',
    paddingLeft: '15%',
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'normal',
    paddingTop: 24,
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'rgba(217, 116, 76, .09)'
  },
  topicsView: {
    flex: 7,
    paddingBottom: 1,
  },
  versesView: {
    flex: 12,
    alignItems: 'center',
  },
});

export default Styles;
