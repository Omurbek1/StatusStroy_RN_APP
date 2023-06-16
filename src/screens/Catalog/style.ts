import { Dimensions, StyleSheet } from 'react-native';
const DeviceWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
    flex: 1,
  },
  fullContainer: {
    margin: 0,
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: '700',
    marginLeft: 15,
    color: '#000',
  },
  searchContainer: {
    marginTop: 20,
    margin: 10,
    marginBottom: 20,
  },

  gridText: {
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 10,
    textAlignVertical: 'center',
    width: 90,
    height: 26,
    marginTop: -32,
    margin: 5,
    color: '#000',
    fontWeight: '500',
  },
  imageContainer: {
    // backgroundColor: '#fff',
    width: 88,
    height: 88,
    margin: 5,
    borderRadius: 10,
    // marginBottom: 2,
  },
  image: {
    width: 55,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginLeft: 5,
  },
  gridContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
    margin: 0,
    alignItems: 'center',
    marginBottom: 80,
  },
  grid: {
    width: DeviceWidth * 0.27,
    height: DeviceWidth * 0.27,
    marginBottom: 1,
    margin: 5,

    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  list: {
    margin: 0,
  },
});
