import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../ProductCard/ProductCard';
import {addToCart} from '../../store/reducers/CartSlice';
import {
  removeFavorite,
  removeFavoriteProduct,
} from '../../store/reducers/FavoriteSlice';
import Grid from 'react-native-grid-component';
import {useDispatch, useSelector} from 'react-redux';
import InputPressable from '../../components/Input/InputPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CardButton from '../../components/Button/CardButton';
import NoProducts from '../../components/NoProducts';
import {useToast} from 'react-native-toast-notifications';
import {BASE_URL_API} from '../../api/ProductsAPi';
import axios from 'axios';
const FavoriteScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const itemsInFavorite = useSelector(state => state.fav.items);

  const [searchQuery, setSearchQuery] = useState('');

  const addItemToCart = (item: any) => {
    dispatch(addToCart(item));
    toast.show('Товар добавлен в корзину', {
      type: 'normal',
      placement: 'top',
      duration: 1000,
      animationType: 'slide-in',
    });
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };
  const clearInput = () => {
    setSearchQuery('');
  };

  console.log(itemsInFavorite, 'itemsInFavorite');

  const getCategory = itemsInFavorite.map(
    (item: any) => item.attributes.categories.data,
  );

  const getImageCatalog = itemsInFavorite.map(
    (item: any) => item.attributes.mainPhoto.data,
  );
  // const getInnerCateory = getImageCatalog.map(
  //   (item: any) => item.attributes.name,
  // );
  console.log(getImageCatalog[0], 'getImageCatalog');
  useEffect(() => {
    const fetchProductsIsNew = async () => {
      try {
        const response = await axios.get(
          BASE_URL_API + '/categories?populate=*',
          {
            params: {
              filters: {
                parent: {id: {$null: true}},
              },
            },
          },
        );
        const sellProducts = response.data.data.filter(
          (product: {attributes: any}) => product.attributes.parent,
        );
        // setCategories(sellProducts);
        console.log(
          sellProducts[0]?.attributes?.photo?.data?.attributes?.url,
          'sellProducts',
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductsIsNew();
  }, []);
  const getCategories = getCategory.map((item: any) => item[0]);
  const innerCateory = getCategories.map((item: any) => item.attributes.name);
  // console.log(innerCateory, 'getCategories');
  const uniqueData = innerCateory.filter(
    (value: any, index: any, self: string | any[]) => {
      return self.indexOf(value) === index;
    },
  );
  console.log(getCategories, 'uniqueData');
  const getFavList = itemsInFavorite.map((item: any) => item);
  const getuniqueData = getFavList.filter(
    (value: any, index: any, self: string | any[]) => {
      return self.indexOf(value) === index;
    },
  );

  // console.log(getuniqueData, 'getuniqueData');

  const handleRemoveFavorite = (item: any) => {
    dispatch(removeFavorite(item));
    toast.show('Товар удален из избранного', {
      type: 'normal',
      placement: 'top',
      duration: 1000,
      animationType: 'slide-in',
    });
  };

  const filterproduct = getuniqueData.filter(product =>
    product.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const filterCategory = uniqueData.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.containerFav}>
        <Text style={styles.headerText}>Избранное</Text>
        <View style={styles.searchContainer}>
          <InputPressable
            placeholder="Поиск"
            value={searchQuery}
            onChange={handleSearch}
            clearInput={clearInput}
            stylesContainer={styles.searchInput}
          />
        </View>
        {/* <Image
          source={{uri: getImageCatalog[0].attributes?.formats?.small?.url}}
          style={styles.image}
        /> */}
        {/* <Image
          source={{uri: getImageCatalog?.data?.attributes?.url}}
          style={styles.image}
        /> */}
        <View style={styles.catalog}>
          <Grid
            style={styles.list}
            key={(item: any) => item}
            renderItem={(item: any) => {
              return (
                <View style={styles.categoryFav}>
                  {/* <Image source={{uri: getInnerCateory}} style={styles.item} /> */}
                  <Image
                    source={require('../../assets/no-image.png')}
                    style={styles.imageContainers}
                  />
                  <Text style={styles.gridText}>{item}</Text>
                </View>
              );
            }}
            data={filterCategory}
            numColumns={3}
          />
        </View>
        {filterproduct.length > 0 ? (
          <>
            <Text style={styles.headerText}>Все товары</Text>
            <View style={styles.catalog}>
              <FlatList
                data={filterproduct}
                style={styles.list}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({item}) => {
                  let slicedWord =
                    item.attributes.name.length > 25
                      ? item.attributes.name.slice(0, 28) + '...'
                      : item.attributes.name;
                  return (
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
                          <Pressable
                            style={styles.favorites}
                            onPress={() => handleRemoveFavorite(item)}>
                            <AntDesign name="heart" size={24} color="red" />
                          </Pressable>
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
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </>
        ) : (
          <NoProducts />
        )}
      </View>
    </ScrollView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  containerFav: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  item: {
    height: 70,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    width: 70,
    margin: 10,
  },
  gridText: {
    textAlign: 'center',
    textAlignVertical: 'center',

    top: 0,

    fontSize: 10,
    color: '#000',
    fontWeight: '500',
  },
  categoryFav: {
    flex: 1,
    margin: 5,
    width: 90,
    height: 70,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },

  headerText: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 10,
    color: '#000',
  },
  searchContainer: {
    marginTop: 20,
  },
  searchInput: {
    margin: 10,
  },

  imageContainer: {
    height: 100,
    padding: 10,
    left: -4,
    width: 135,
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
  imageContainers: {
    width: 30,
    height: 30,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
  },
  catalog: {
    margin: 10,
    marginBottom: 20,
  },
  list: {
    borderRadius: 10,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: '#F5F5F5',
    margin: 10,
    padding: 10,
    width: 145,
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
    // marginBottom: 10,
  },
  price: {
    top: 0,
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
  },
});
