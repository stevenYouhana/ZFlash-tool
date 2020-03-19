import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').width;

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    width: width,
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
    marginTop: 10,
  },
  verseViewHeading: {
    fontSize: 18,
    marginLeft: 20,
    paddingTop: 12,
    color: 'rgba(0, 0, 0, .5)',
  },
  addVeiw: {
    paddingLeft: 10,
    paddingTop: 15
  },
  versesOverall: {
    flex: 6,
    flexDirection: 'row',
    bottom: 1,
  },
  verseReferences: {
    paddingLeft: 5,
    borderStyle: 'dotted',
    borderWidth: .3,
    borderRightWidth: .8,
    width: width * .3,
    padding: 2,
    backgroundColor: 'rgba(237, 237, 164, .1)',
  },
  verseContent: {
    backgroundColor: 'rgba(237, 237, 164, .2)',
    width: width * .70,
    borderStyle: 'solid',
    borderWidth: .3,
    marginRight: 1,
    padding: 2,
  },
  verse: {
    fontSize: 15,
    paddingBottom: 10,
    marginBottom: 10,
    padding: 5
  },
  noVerseSelected: {
    color: 'rgba(0, 0, 0, .5)',
  },
  verseNotFound: {
    color: 'rgba(255, 0, 0, .5)',
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'red',
    padding: 20,
    fontStyle: 'italic'
  }
});

export default Styles;
