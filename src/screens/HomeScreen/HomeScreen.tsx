import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useToast} from 'react-native-toast-notifications';
import {Text} from 'react-native-paper';

import {BASE_URL_API} from '../../api/ProductsAPi';

import Feather from 'react-native-vector-icons/Feather';
import NoProducts from '../../components/NoProducts';
import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../store/reducers/CartSlice';
import {addFavorite, removeFavorite} from '../../store/reducers/FavoriteSlice';
import {useNavigation} from '@react-navigation/native';
import {ThunkDispatch} from '@reduxjs/toolkit';

import InputPressable from '../../components/Input/InputPressable';
import CardButton from '../../components/Button/CardButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Logo from '../../assets/logo.svg';
export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const [sellProducts, setSellProducts] = useState([]);
  const [isNewProducts, setIsNewProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [showText, setShowText] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const itemsInFavorite = useSelector(state => state.fav.items);

  useEffect(() => {
    const fetchProductsSeller = async () => {
      try {
        const response = await axios.get(
          BASE_URL_API + '/products?populate=%2A',
        );
        const bestSell = response.data.data.filter(
          product => product.attributes.bestSelling === true,
        );
        setBestSellingProducts(bestSell);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductsSeller();
  }, []);

  useEffect(() => {
    const fetchProductsIsNew = async () => {
      try {
        const response = await axios.get(
          BASE_URL_API + '/products?populate=%2A',
          {
            params: {
              filters: {
                discount: {
                  $gt: 0,
                },
              },
            },
          },
        );

        const saleProducts = response.data.data.filter(
          product => product.attributes,
        );
        setSellProducts(saleProducts);
        // console.log(saleProducts, 'распродажа 123');
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductsIsNew();
  }, []);

  useEffect(() => {
    const fetchProductsIsNew = async () => {
      try {
        const response = await axios.get(
          BASE_URL_API + '/products?populate=%2A',
        );
        const setIsNew = response.data.data.filter(
          product => product?.attributes?.isNew === true,
        );
        console.log(setIsNew, 'isnew');
        setIsNewProducts(setIsNew);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductsIsNew();
  }, []);

  const addItemToCart = (item: any) => {
    dispatch(addToCart(item));
    toast.show('Товар добавлен в корзину', {
      type: 'normal',
      placement: 'top',
      duration: 1000,
      animationType: 'slide-in',
    });
  };

  const handleAddFavorite = (item: any) => {
    dispatch(addFavorite(item));

    toast.show('Товар добавлен в избранное', {
      type: 'normal',
      placement: 'top',
      duration: 1000,
      animationType: 'slide-in',
    });
  };

  const handleRemoveFavorite = (item: any) => {
    dispatch(removeFavorite(item));

    toast.show('Товар удален из избранного', {
      type: 'normal',
      placement: 'top',
      duration: 1000,
      animationType: 'slide-in',
    });
  };
  const filteredbestSellingProducts = bestSellingProducts.filter(products =>
    products.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredisNewProducts = isNewProducts.filter(products =>
    products.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredSellerProducts = sellProducts.filter(products =>
    products.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleCategoryPress = (item: any) => {
    navigation.navigate('productslist' as never, {
      allProducts: item,
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <View style={styles.headerlogContainer}>
            <Text style={styles.headerText}>Главная</Text>
          </View>

          <View style={styles.reminder}>
            <Feather
              name="bell"
              color={'#000'}
              size={20}
              style={{marginTop: 10}}
            />
          </View>
        </View>
        <InputPressable
          clearInput={() => {}}
          stylesContainer={styles.searchInput}
          placeholder="Поиск "
          value={searchQuery}
          onChange={handleSearch}
        />
        {filteredbestSellingProducts.length > 0 ? (
          <>
            <View style={styles.headerTextContainer}>
              <Text style={styles.sectionTitle}>Популярные товары</Text>
              <Pressable
                onPress={() =>
                  handleCategoryPress(filteredbestSellingProducts)
                }>
                <Text style={styles.allProducts}>Все</Text>
              </Pressable>
            </View>
            <FlatList
              data={filteredbestSellingProducts}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}: any) => {
                const isFavorite = itemsInFavorite.includes(item);
                let slicedWord =
                  item.attributes.name.length > 25
                    ? item.attributes.name.slice(0, 28) + '...'
                    : item.attributes.name;
                return (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('productDetail' as never, {
                          productDetail: item,
                        })
                      }>
                      <View style={styles.cardContainer}>
                        <View style={styles.cardHeader}>
                          {item.attributes.discount ? (
                            <View style={styles.discount}>
                              <Text style={styles.discountText}>
                                -{item.attributes.discount} %
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.nodiscount}>
                              <Text style={styles.discountText} children={''} />
                            </View>
                          )}

                          {isFavorite ? (
                            <Pressable
                              style={styles.favorites}
                              onPress={() => handleRemoveFavorite(item)}>
                              <AntDesign name="heart" size={24} color="red" />
                            </Pressable>
                          ) : (
                            <Pressable
                              style={styles.favorites}
                              onPress={() => handleAddFavorite(item)}>
                              <AntDesign
                                name="hearto"
                                size={24}
                                color={'black'}
                              />
                            </Pressable>
                          )}
                        </View>

                        {item.attributes?.mainPhoto?.data?.attributes?.url ? (
                          <View style={styles.imageContainer}>
                            <Image
                              source={{
                                uri: item.attributes?.mainPhoto?.data
                                  ?.attributes?.url,
                              }}
                              style={styles.image}
                            />
                          </View>
                        ) : (
                          <View>
                            <Image
                              source={require('../../assets/no-image.png')}
                              style={styles.image}
                            />
                          </View>
                        )}
                        <View>
                          <Text style={styles.title}>{slicedWord}</Text>
                          <Text style={styles.code}>
                            {item.attributes.code}
                          </Text>
                        </View>
                        <Text style={styles.price}>
                          {item.attributes.price} ₽
                        </Text>
                        <CardButton
                          onPressIn={() => addItemToCart(item)}
                          title={'В корзину'}
                          onPress={() => {}}
                          style={styles.cardButton}
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                );
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.list}
            />
          </>
        ) : null}

        {filteredSellerProducts.length > 0 ? (
          <>
            <View style={styles.headerTextContainer}>
              <Text style={styles.sectionTitle}>Распродажа</Text>
              <Pressable
                style={{marginLeft: 68}}
                onPress={() => handleCategoryPress(sellProducts)}>
                <Text style={styles.allProducts}>Все</Text>
              </Pressable>
            </View>
            <FlatList
              data={filteredSellerProducts}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}: any) => {
                const isFavorite = itemsInFavorite.includes(item);
                let slicedWord =
                  item.attributes.name.length > 25
                    ? item.attributes.name.slice(0, 28) + '...'
                    : item.attributes.name;
                return (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('productDetail' as never, {
                          productDetail: item,
                        })
                      }>
                      <View style={styles.cardContainer}>
                        <View style={styles.cardHeader}>
                          {item.attributes.discount ? (
                            <View style={styles.discount}>
                              <Text style={styles.discountText}>
                                -{item.attributes.discount} %
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.nodiscount}>
                              <Text style={styles.discountText} children={''} />
                            </View>
                          )}

                          {isFavorite ? (
                            <Pressable
                              style={styles.favorites}
                              onPress={() => handleRemoveFavorite(item)}>
                              <AntDesign name="heart" size={24} color="red" />
                            </Pressable>
                          ) : (
                            <Pressable
                              style={styles.favorites}
                              onPress={() => handleAddFavorite(item)}>
                              <AntDesign
                                name="hearto"
                                size={24}
                                color={'black'}
                              />
                            </Pressable>
                          )}
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('productDetail' as never, {
                              productDetail: item,
                            })
                          }>
                          {item.attributes?.mainPhoto?.data?.attributes?.url ? (
                            <View style={styles.imageContainer}>
                              <Image
                                source={{
                                  uri: item.attributes?.mainPhoto?.data
                                    ?.attributes?.url,
                                }}
                                style={styles.image}
                              />
                            </View>
                          ) : (
                            <View>
                              <Image
                                source={require('../../assets/no-image.png')}
                                style={styles.image}
                              />
                            </View>
                          )}
                        </TouchableOpacity>
                        <View>
                          <Text style={styles.title}>{slicedWord}</Text>
                          <Text style={styles.code}>
                            {item.attributes.code}
                          </Text>
                        </View>
                        <Text style={styles.price}>
                          {item.attributes.price} ₽
                        </Text>
                        <CardButton
                          onPressIn={() => addItemToCart(item)}
                          title={'В корзину'}
                          onPress={() => {}}
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                );
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.list}
            />
          </>
        ) : null}
        {filteredisNewProducts.length > 0 ? (
          <>
            <View style={styles.headerTextContainer}>
              <Text style={styles.sectionTitle}>Новинки</Text>
              <Pressable
                style={{marginLeft: 110}}
                onPress={() => handleCategoryPress(filteredisNewProducts)}>
                <Text style={styles.allProducts}>Все</Text>
              </Pressable>
            </View>
            <FlatList
              data={filteredisNewProducts}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}: any) => {
                const isFavorite = itemsInFavorite.includes(item);
                let slicedWord =
                  item.attributes.name.length > 25
                    ? item.attributes.name.slice(0, 28) + '...'
                    : item.attributes.name;
                return (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('productDetail' as never, {
                          productDetail: item,
                        })
                      }>
                      <View style={styles.cardContainer}>
                        <View style={styles.cardHeader}>
                          {item.attributes.discount ? (
                            <View style={styles.discount}>
                              <Text style={styles.discountText}>
                                -{item.attributes.discount} %
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.nodiscount}>
                              <Text style={styles.discountText} children={''} />
                            </View>
                          )}

                          {isFavorite ? (
                            <Pressable
                              style={styles.favorites}
                              onPress={() => handleRemoveFavorite(item)}>
                              <AntDesign name="heart" size={24} color="red" />
                            </Pressable>
                          ) : (
                            <Pressable
                              style={styles.favorites}
                              onPress={() => handleAddFavorite(item)}>
                              <AntDesign
                                name="hearto"
                                size={24}
                                color={'black'}
                              />
                            </Pressable>
                          )}
                        </View>

                        {item.attributes?.mainPhoto?.data?.attributes?.url ? (
                          <View style={styles.imageContainer}>
                            <Image
                              source={{
                                uri: item.attributes?.mainPhoto?.data
                                  ?.attributes?.url,
                              }}
                              style={styles.image}
                            />
                          </View>
                        ) : (
                          <View>
                            <Image
                              source={require('../../assets/no-image.png')}
                              style={styles.image}
                            />
                          </View>
                        )}

                        <View>
                          <Text style={styles.title}>{slicedWord}</Text>
                          <Text style={styles.code}>
                            {item.attributes.code}
                          </Text>
                        </View>
                        <Text style={styles.price}>
                          {item.attributes.price} ₽
                        </Text>
                        <CardButton
                          onPressIn={() => addItemToCart(item)}
                          title={'В корзину'}
                          onPress={() => {}}
                          style={styles.cardButton}
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                );
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.list}
            />
          </>
        ) : null}
      </View>
      <NoProducts />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerlogContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    marginTop: 0,
    fontWeight: '700',
    marginLeft: 5,
    color: '#000',
  },
  headercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 30,
    margin: 10,
  },

  logoicon: {},
  logoText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    margin: 5,
  },
  reminder: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5F5',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    left: 0,
  },
  searchInput: {
    marginBottom: 15,
  },
  headerTextContainer: {
    flexDirection: 'row',
  },
  allProducts: {
    marginLeft: 110,
    marginTop: 4,
    textDecorationLine: 'underline',
    color: 'rgba(0,0,0,0.5)',
  },
  allProducts2: {
    marginLeft: 180,
    marginTop: 4,
    textDecorationLine: 'underline',
    color: 'rgba(0,0,0,0.5)',
  },
  allProducts3: {
    marginLeft: 210,
    marginTop: 4,
    textDecorationLine: 'underline',
    color: 'rgba(0,0,0,0.5)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  productList: {
    marginBottom: 20,
    marginLeft: -10,
  },
  imageContainer: {
    height: 100,
    padding: 10,
    left: -4,
    width: 140,
    backgroundColor: 'rgba(255,255,255,255)',
    borderRadius: 10,
  },
  image: {
    height: 60,
    marginTop: 15,
    paddingTop: 10,
    width: 70,
    borderRadius: 10,
    padding: 0,
    alignSelf: 'center',
  },
  list: {
    borderRadius: 10,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: '#F5F5F5',
    margin: 10,
    padding: 10,
    width: 150,
    height: 250,
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: -5,
  },
  discount: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 40,
    height: 18,
    top: -3,
    borderRadius: 3,
    zIndex: 99999,
  },
  nodiscount: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 40,
    height: 20,
    top: -3,
    borderRadius: 3,
    zIndex: 99999,
  },
  discountText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  favorites: {
    position: 'absolute',
    right: -5,
    top: -3,
    zIndex: 99,
  },
  title: {
    marginTop: 10,
    color: '#000',
    fontWeight: '400',
    fontSize: 14,
    height: 40,
  },
  code: {
    color: '#808080',
    top: -5,
  },
  price: {
    top: 0,
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
  },
  cardButton: {
    position: 'absolute',
    bottom: 2,
    margin: 8,
    width: 128,
  },
});
