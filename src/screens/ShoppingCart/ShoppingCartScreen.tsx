/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  LogBox,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {
  decrementQuantity,
  removeFromCart,
  incrementQuantity,
  removeAllItemsFromCart,
} from '../../store/reducers/CartSlice';
import {styles} from './style';
import {useEffect, useState} from 'react';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  addFavorite,
  addFavoriteProduct,
  removeFavorite,
} from '../../store/reducers/FavoriteSlice';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../components/Button/PrimaryButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useToast} from 'react-native-toast-notifications';
const ShoppingCartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [modalVisible, setModalVisible] = useState(false);
  const itemsInFavorite = useSelector(state => state.fav.items);
  const toast = useToast();
  console.log(itemsInFavorite);
  const cart = useSelector(state => state.cart.cart);
  console.log(cart);
  const increaseQuantity = (item: {quantity: string}) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item: {quantity: any}) => {
    if (item.quantity === 1) {
      dispatch(removeFromCart(item));
      toast.show('Товар удален из корзины', {
        type: 'normal',
        placement: 'top',
        duration: 1000,
        animationType: 'slide-in',
      });
    } else if (item.quantity === 0 || item.quantity < 0) {
      toast.show('Товар удален из корзины', {
        type: 'normal',
        placement: 'top',
        duration: 1000,
        animationType: 'slide-in',
      });
    } else {
      dispatch(decrementQuantity(item));
    }
  };
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
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
  const deleteFromCart = (item: any) => {
    dispatch(removeFromCart(item));
    toast.show('Товар удален из корзины', {
      type: 'normal',
      placement: 'top',
      duration: 1000,
      animationType: 'slide-in',
    });
  };
  const deleteVisibleModal = () => {
    setModalVisible(true);
  };
  function handleRemoveAllItemsFromCart() {
    dispatch(removeAllItemsFromCart());
    setModalVisible(false);
    toast.show('Корзина очищена!', {
      type: 'normal',
      placement: 'top',
      duration: 1000,
      animationType: 'slide-in',
    });
  }

  const totalProducts = () => {
    return cart.reduce(
      (
        total: number,
        item: {
          quantity: number;
        },
      ) => total + item.quantity,
      0,
    );
  };

  const totalSumProducts_WithDiscount = () => {
    const totalSum = cart.reduce((acc: number, product: any) => {
      const price = product.attributes.price * product.quantity;
      const discount = (product.attributes.discount * price) / 100;
      return acc + (price - discount);
    }, 0);

    return totalSum;
  };
  const SumProducts_WithDiscount = () => {
    const totalSum = cart.reduce((acc: number, product: any) => {
      const price = product.attributes.price * product.quantity;
      const discount = (product.attributes.discount * price) / 100;
      return acc + discount;
    }, 0);

    return totalSum;
  };
  const getTotal = () => {
    return cart.reduce(
      (
        total: number,
        item: {
          price: number;
          quantity: number;
          discount: number;
          attributes: any;
        },
      ) => total + item.attributes.price * item.quantity,

      0,
    );
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log('This row opened', rowKey);
  };

  const renderHiddenItem = ({item}: any) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteFromCart(item)}>
        <Feather name="trash-2" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View style={{margin: 10}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Корзина</Text>
          {cart.length > 0 ? (
            <View style={styles.deleteAll}>
              <TouchableOpacity onPress={deleteVisibleModal}>
                <Feather name="trash-2" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View>
          <SwipeListView
            data={cart}
            renderItem={({item}: any) => {
              const isFavorite = itemsInFavorite.includes(item);
              let slicedWord =
                item.attributes.name.length > 25
                  ? item.attributes.name.slice(0, 40) + '...'
                  : item.attributes.name;

              return (
                <TouchableHighlight
                  disabled={true}
                  onPress={() => console.log('You touched me', item)}
                  style={styles.rowFront}>
                  <View style={styles.productContainer}>
                    <View style={styles.images}>
                      {isFavorite ? (
                        <TouchableOpacity
                          style={styles.favorite}
                          onPress={() => handleRemoveFavorite(item)}>
                          <AntDesign name="heart" size={20} color="red" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.favorite}
                          onPress={() => handleAddFavorite(item)}>
                          <AntDesign name="hearto" size={20} color="#000" />
                        </TouchableOpacity>
                      )}
                      {item.attributes?.mainPhoto?.data?.attributes?.url ? (
                        <View style={styles.imageContainer}>
                          <Image
                            source={{
                              uri: item.attributes?.mainPhoto?.data?.attributes
                                ?.url,
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
                    </View>
                    <View style={styles.textcontainer}>
                      <Text style={styles.textcontainertext}>{slicedWord}</Text>
                      <Text style={styles.code}> {item.attributes.code}</Text>
                      <Text style={styles.textPrice}>
                        {item.attributes.price} ₽{' '}
                      </Text>
                      <View style={styles.countercontainer}>
                        <Pressable
                          onPress={() => decreaseQuantity(item)}
                          style={styles.decrement}>
                          <Feather
                            name="minus"
                            size={18}
                            color="#000"
                            style={styles.icon}
                          />
                        </Pressable>
                        <Text style={styles.counter}> {item.quantity}</Text>
                        <Pressable
                          onPress={() => increaseQuantity(item)}
                          style={styles.increment}>
                          <Feather
                            name="plus"
                            size={18}
                            color="#000"
                            style={styles.icon1}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={0}
            rightOpenValue={-50}
            previewRowKey={'0'}
            previewOpenValue={-60}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
            style={styles.listContainer}
          />

          {cart.length > 0 ? (
            <>
              <View style={styles.basketFooter}>
                <View>
                  <Text style={styles.quantityproducts}>
                    Количество товаров:
                  </Text>
                  <Text style={styles.quantityproducts}>Скидка:</Text>

                  <Text style={styles.total}>Итого:</Text>
                </View>
                <View>
                  <Text style={styles.productSum}>
                    {totalProducts()} товаров
                  </Text>
                  <Text style={styles.discounts}>
                    - {SumProducts_WithDiscount()} р
                  </Text>
                  <>
                    <Text style={styles.totalSum}>
                      {totalSumProducts_WithDiscount()}
                    </Text>
                  </>
                </View>
              </View>
              <PrimaryButton
                title="Перейти к офомлению"
                onPress={() => navigation.navigate('checkoutOrder' as never)}
              />
            </>
          ) : (
            <View style={styles.noproductsContainer}>
              <Text style={styles.noproductsContainerText}>
                Ваша корзина пуста
              </Text>
            </View>
          )}
        </View>

        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Вы точно хотите очистить всю корзину?
              </Text>

              <TouchableOpacity onPress={handleRemoveAllItemsFromCart}>
                <Text style={styles.modalButtonDelete}>Удалить товары</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent2}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonCancel}>Отмена</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ShoppingCartScreen;
