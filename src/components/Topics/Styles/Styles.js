
import { StyleSheet, Dimensions  } from 'react-native';
const width = Dimensions.get('window').width;

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerView: {
    flexDirection: 'row',
    width: width,
  },
  addVeiwContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingBottom: 4
  },
  searchViewContainer: {
    flex: 1.2,
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 4,
  },
  topicListView: {
    flex: 5
  },
  topicsView: {
    width: 300,
    borderStyle: 'solid',
    borderWidth: .6,
    borderColor: 'rgba(0, 0, 0, .5)',
    padding: 1,
    backgroundColor: 'lightyellow'
  },
  verseViewHeading: {
    fontSize: 18,
    marginLeft: 20,
    padding: 5,
    paddingTop: 10,
    color: 'rgba(0, 0, 0, .5)',
  },
  noTopicsLoded: {
    fontSize: 19,
    padding: 20,
    color: 'rgba(0,0,0,0.5)',
    borderStyle: 'dotted',
    borderWidth: .4
  },
});

export default Styles;
