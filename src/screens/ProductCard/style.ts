import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 160,

    marginTop: 16,
    marginLeft: 10,
    backgroundColor: '#f2f2f2',
    borderColor: '#f2f2f2',
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  favoriteIcon: {
    marginLeft: 77,
    marginTop: -10,
    top: 0,
  },
  discount: {
    backgroundColor: 'red',
    width: 40,
    height: 20,
    borderRadius: 5,
    color: 'white',
  },
  price: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  discountPercentage: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  subprice: {
    fontSize: 12,
    color: '#B3B3B3',
    fontWeight: '400',
  },
  loginBtn: {
    marginTop: 20,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 7,
    alignSelf: 'center',
  },
});
