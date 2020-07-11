import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flex: 10,
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  displayImage: {
    height: 250,
    width: 300,
    borderRadius: 10,
  },
  infoWrapper: {
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    bottom: 12,
    width: '100%',
  },
  authorText: {
    bottom: 12,
    padding: 5,
    opacity: 0.6,
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 10,
  },
  authorImg: {
    width: 30,
    height: 30,
    bottom: 12,
    marginLeft: 10,
    marginRight: 5,
  },
});

export default styles;
