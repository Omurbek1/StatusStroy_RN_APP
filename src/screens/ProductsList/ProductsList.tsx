import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import InputPressable from '../../components/Input/InputPressable';
import Feather from 'react-native-vector-icons/Feather';
import {addFavorite, removeFavorite} from '../../store/reducers/FavoriteSlice';
import {addToCart} from '../../store/reducers/CartSlice';
import {RNToasty} from 'react-native-toasty';

import CardButton from '../../components/Button/CardButton';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NoProducts from '../../components/NoProducts';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../components/Button/PrimaryButton';

const ProductsList = (route: any) => {
  const filteredisNewProducts = route.route.params.allProducts;
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');

  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(false);
  const itemsInFavorite = useSelector(state => state.fav.items);
  const [modalVisible, setModalVisible] = useState(false);
  const [visiblePriceRange, setVisiblePriceRange] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [selectedOption, setSelectedOption] = useState(null);
  const panY = useRef(new Animated.Value(0)).current;
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openVisiblePriceRange = () => {
    setVisiblePriceRange(true);
  };
  const priceVisbleCloseModal = () => {
    setVisiblePriceRange(false);
    setMinPrice('');
    setMaxPrice('');
  };
  const handleOutsideClick = () => {
    setVisiblePriceRange(false);
    setModalVisible(false);
    setMaxPrice('');
    setMinPrice('');
    console.log('outside');
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          closeModal();
        } else {
          Animated.spring(panY, {toValue: 0, useNativeDriver: true}).start();
        }
      },
    }),
  ).current;

  const translateY = panY.interpolate({
    inputRange: [-300, 0],
    outputRange: [-300, 0],
    extrapolate: 'clamp',
  });

  const applyFilters = () => {
    const filteredProductsMinMax = products.filter(product => {
      if (minPrice && maxPrice) {
        return (
          product.attributes.price >= parseInt(minPrice) &&
          product.attributes.price <= parseInt(maxPrice)
        );
      } else if (minPrice) {
        return product?.attributes.price >= parseInt(minPrice, 10);
      } else if (maxPrice) {
        return product.attributes.price <= parseInt(maxPrice, 10);
      }
      return true; // No price filters applied
    });
    setVisiblePriceRange(false);
    setFilteredData(filteredProductsMinMax);
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/products?populate=*&pagination[page]=0&pagination[pageSize]=10&filters[categories][id][$eq]=${subcategoryId}`,
      );
      setFilteredData(response.data.data);
      setCategoryTitle(
        response?.data?.data[0]?.attributes?.categories?.data[0]?.attributes
          ?.name,
      );
      console.log(response?.data, 'response.data ss');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [maxPrice, minPrice]);

  // FILTER DATA
  const filteredProductsCatalog = filteredData.filter(product => {
    return product?.attributes?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });
  const addItemToCart = (item: any) => {
    toast.show('Товар добавлен в корзину', {
      type: 'normal',
      placement: 'top',
      duration: 1000,
      animationType: 'slide-in',
    });
    dispatch(addToCart(item));
  };
  const handleAddFavorite = item => {
    dispatch(addFavorite(item));
    toast.show('Товар добавлен в избранное', {
      type: 'normal',
      placement: 'top',
      duration: 1000,
      animationType: 'slide-in',
    });
  };

  const handleRemoveFavorite = item => {
    dispatch(removeFavorite(item as any));
    toast.show('Товар удален из избранного', {
      type: 'normal',
      placement: 'top',
      duration: 1000,
      animationType: 'slide-in',
    });
  };
  // const isFavorite = itemsInFavorite.includes(product.id);
  const clearSortedData = async () => {
    // clear filter
    await filteredisNewProducts();
    setModalVisible(false);
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleOptionChange = option => {
    setSelectedOption(option);
    const sortedData = [...filteredProductsCatalog].sort((a, b) => {
      if (isAscending) {
        return a?.attributes?.price - b?.attributes?.price;
      } else if (!isAscending) {
        return b?.attributes?.price - a?.attributes?.price;
      } else {
        return 0;
      }
    });
    setMinPrice('');
    setMaxPrice('');
    setFilteredData(sortedData);
    setIsAscending(!isAscending);
  };
  const clearInput = () => {
    setSearchQuery('');
  };
  const filterproduct = filteredisNewProducts.filter(
    (product: string | number | any) =>
      product.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  // filter popular product

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <InputPressable
          value={searchQuery}
          stylesContainer={styles.searchInput}
          onChange={handleSearch}
          clearInput={clearInput}
        />
        {filterproduct.length > 0 ? (
          <>
            <View style={styles.filterContainer}>
              <View style={{flexDirection: 'row'}}>
                <Pressable>
                  <Feather name="align-left" size={20} color="black" />
                </Pressable>
                <TouchableOpacity
                  style={styles.sortButton}
                  onPress={() => setModalVisible(true)}>
                  <Text>
                    {isAscending
                      ? 'По убыванию цены ↑'
                      : 'По возрастанию цены ↓'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Pressable
                style={styles.filterSort}
                onPress={openVisiblePriceRange}>
                <Feather name="sliders" size={20} color="black" />
              </Pressable>
            </View>

            <View style={styles.catalog}>
              <FlatList
                style={styles.list}
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
                                <Text
                                  style={styles.discountText}
                                  children={''}
                                />
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
                data={filteredProductsCatalog}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            </View>
          </>
        ) : (
          <NoProducts />
        )}
      </View>

      {/* Sort Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={styles.modalContainer}>
            <Animated.View
              style={[styles.bottomSheet, {transform: [{translateY}]}]}
              {...panResponder.panHandlers}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <View>
                  <AntDesign name="close" size={30} color="black" />
                </View>
              </TouchableOpacity>
              <Text style={styles.bottomSheetTitle}>Сортировка</Text>
              <TouchableOpacity
                style={styles.clearButton1}
                onPress={clearSortedData}>
                <Text style={styles.clearButtonText}>Сбросить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  selectedOption === 'option1'
                    ? styles.selectedOption
                    : styles.sortButton,
                ]}
                onPress={() => handleOptionChange('option1')}>
                <Text style={styles.sortText}>По возрастанию цены</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  selectedOption === 'option2' && styles.selectedOption,
                ]}
                onPress={() => handleOptionChange('option2')}>
                <Text style={styles.sortText}>По убыванию цены</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        transparent={true}
        visible={visiblePriceRange}
        onRequestClose={priceVisbleCloseModal}>
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={styles.modalContainer}>
            <Animated.View
              style={[styles.bottomSheet, {transform: [{translateY}]}]}
              {...panResponder.panHandlers}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={priceVisbleCloseModal}>
                <View>
                  <AntDesign name="close" size={25} color="black" />
                </View>
              </TouchableOpacity>
              <Text style={styles.bottomSheetTitle}>Фильтры</Text>

              <View style={{borderBottomColor: '#ccc', borderBottomWidth: 1}} />
              <View style={styles.headerModalText}>
                <Text style={styles.priceDipazon}>Ценовой диапазон</Text>

                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    setMinPrice('');
                    setMaxPrice('');
                    setVisiblePriceRange(false);
                  }}>
                  <Text style={styles.clearButtonText}>Сбросить</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rangeContainer}>
                <View
                  style={{
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 5,
                    height: 50,
                  }}>
                  <Text>Минимум</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text>₽</Text>
                    <TextInput
                      keyboardType="numeric"
                      style={styles.rangeInput}
                      value={minPrice}
                      onChangeText={text => setMinPrice(text)}
                    />
                  </View>
                </View>
                <AntDesign
                  name="minus"
                  size={40}
                  color="#C1C1C1"
                  style={{marginTop: 5}}
                />
                <View
                  style={{
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 5,
                    height: 50,
                  }}>
                  <Text>Максимум</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text>₽</Text>
                    <TextInput
                      keyboardType="numeric"
                      style={styles.rangeInput}
                      value={maxPrice}
                      onChangeText={text => setMaxPrice(text)}
                    />
                  </View>
                </View>
              </View>
              <PrimaryButton
                title="Показать товары"
                onPress={applyFilters}
                style={{marginTop: 20}}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  content: {
    margin: 0,
  },
  searchInput: {
    marginBottom: 15,
    marginTop: 10,
  },

  filterContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  catalog: {
    margin: 10,
    marginBottom: 20,
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
  imageContainer: {
    height: 100,
    padding: 10,
    left: -4,
    width: 135,
    backgroundColor: 'rgba(255,255,255,255)',
    borderRadius: 10,
  },

  cardContainer: {
    backgroundColor: '#F5F5F5',
    margin: 10,
    padding: 10,
    width: 145,
    height: 250,
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: -4,
  },
  discount: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 40,
    height: 20,
    top: -3,
    borderRadius: 3,
    zIndex: 99999,
  },
  nodiscount: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 40,
    top: -3,
    height: 20,
    borderRadius: 3,
    zIndex: 99999,
  },
  discountText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
  },
  favorites: {
    top: -3,
    position: 'absolute',
    right: -5,
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
  filterSort: {
    position: 'absolute',
    right: 0,
  },
  sortButton: {
    marginLeft: 10,
  },
  cardButton: {
    position: 'absolute',
    bottom: 2,
    margin: 8,
    width: 128,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // marginBottom: 20,
  },

  button: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    margin: 10,
  },

  rangeContainer: {
    flexDirection: 'row',

    // justifyContent: 'space-between',
    margin: 0,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  rangeInput: {
    padding: 0,
    width: 100,
    height: 40,
    marginLeft: 10,
    margin: 10,
    top: -20,
  },

  selectedOption: {
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  priceDipazon: {
    marginTop: 10,
    color: '#000',
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 25,
  },
  headerModalText: {
    flexDirection: 'row',
  },
});
export default ProductsList;
