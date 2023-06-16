/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import GoBack from '../../components/GoBack';

import {addFavorite, removeFavorite} from '../../store/reducers/FavoriteSlice';
import {addToCart} from '../../store/reducers/CartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {useToast} from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Accordion from '../../components/According/Accordion';

import {ImageSlider} from 'react-native-image-slider-banner';
import axios from 'axios';
import {BASE_URL_API} from '../../api/ProductsAPi';

const ProductDetailScreen = ({route}) => {
  const [productDetaiList, setProductDetailList] = useState([]);
  const productDetail = route.params.productDetail;
  const productId = productDetail?.id;
  const itemsInFavorite = useSelector(state => state.fav.items);
  const [attributeList, setAttributeList] = useState([]);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const toast = useToast();
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

  const fetchData = useCallback(async () => {
    const response = await axios.get(
      BASE_URL_API +
        `/products/${productId}?populate[0]=attributes&populate[1]=attributes.attribute&populate[3]=photos&populate[4]=mainPhoto&populate[5]=categories`,
    );
    console.log(response?.data, 'response');
    setProductDetailList(response.data);
  }, [productId]);

  const fetchAttributes = useCallback(async () => {
    const response = await axios.get(
      BASE_URL_API +
        `/products/${productId}?populate[0]=attributes&populate[1]=attributes.attribute&populate[3]=photos&populate[4]=mainPhoto&populate[5]=categories`,
    );
    const attributes = response?.data?.filter(
      (product: any) => product?.data?.attributes?.attribute,
    );
    console.log(attributes, 'attributes');
    setAttributeList(attributes);
    console.log(attributes);
  }, [productId]);
  const isFavorite = itemsInFavorite.includes(productDetail);

  const charsMain = productDetaiList?.data?.attributes?.attributes
    .map((attr: any) => {
      return {
        value: attr?.value,
        id: attr?.attribute?.data?.id,
        isMain: attr?.attribute?.data?.attributes?.isMain,
        name: attr?.attribute?.data?.attributes?.name,

        isStore: attr?.attribute?.data?.attributes?.isStore,
      };
    })
    .filter((char: any) => char.isMain && !char.isStore && char.id);
  console.log(charsMain, 'charsMain');
  const addictionalChars = productDetaiList?.data?.attributes?.attributes
    .map((attr: any) => {
      return {
        value: attr?.value,
        id: attr?.attribute?.data?.id,
        name: attr?.attribute?.data?.attributes?.name,
        isMain: attr?.attribute?.data?.attributes?.isMain,
      };
    })
    .filter((char: any) => !char.isMain && char.id);

  console.log(addictionalChars, 'addictionalChars');
  useEffect(() => {
    fetchData();
    fetchAttributes();
  }, [fetchData, fetchAttributes]);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.goback}>
        <GoBack />
        {isFavorite ? (
          <View style={styles.favorite}>
            <TouchableOpacity
              style={styles.favIcon}
              onPress={() => handleRemoveFavorite(productDetail)}>
              <AntDesign name="heart" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.favorite}>
            <TouchableOpacity
              style={styles.favIcon}
              onPress={() => handleAddFavorite(productDetail)}>
              <AntDesign name="hearto" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {productDetail.attributes?.mainPhoto?.data?.attributes?.url ? (
        <View style={styles.imageContainer}>
          {productDetail.attributes?.map((attr: any) => {
            console.log(attr, 'attr');
            return <Text>ss</Text>;
          })}
          <ImageSlider
            // preview={false}

            previewImageStyle={styles.previewImage}
            previewImageContainerStyle={styles.previewImageContainer}
            caroselImageStyle={styles.image}
            activeIndicatorStyle={styles.activeIndicator}
            inActiveIndicatorStyle={styles.inActiveIndicator}
            data={[
              {
                img: productDetail.attributes?.mainPhoto?.data?.attributes
                  ?.formats.small.url,
              },
              {
                img: productDetail.attributes?.mainPhoto?.data?.attributes
                  ?.formats.thumbnail.url,
              },
              {
                img: productDetail.attributes?.mainPhoto?.data?.attributes?.url,
              },
            ]}
            autoPlay={false}
            onItemChanged={item => console.log('item', item)}
            closeIconColor="#fff"
          />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/no-image.png')}
            style={styles.image}
          />
        </View>
      )}
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.productTitle}>
            {productDetail.attributes.name || 'Products'}
          </Text>
          <Text style={styles.productCode}>
            {productDetail.attributes.code || 'Products'}
          </Text>
        </View>
        <View>
          <Text style={styles.prices}>{productDetail.attributes.price} ₽</Text>
        </View>
      </View>

      <View style={styles.characteristics}>
        <Text style={styles.characterTitle}>Характеристики</Text>

        {charsMain?.map((char: any) => {
          return (
            <>
              <View style={styles.characteristicsContainer}>
                <Text>{char.name}</Text>
                <Text style={styles.characteristicWEit}>{char.value}</Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#E8E8E8',
                  borderBottomWidth: 1,
                  marginBottom: 10,
                  marginTop: -10,
                }}
              />
            </>
          );
        })}

        <Accordion
          title="Все характеристики"
          content={
            <>
              <View style={{marginBottom: 10, marginTop: 10}}>
                {addictionalChars?.map((char: any) => {
                  return (
                    <>
                      <View style={styles.characteristicsContainer}>
                        <Text>{char.name}</Text>
                        <Text style={styles.characteristicWEit}>
                          {char.value}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#E8E8E8',
                          borderBottomWidth: 1,
                          marginBottom: 10,
                          marginTop: -10,
                        }}
                      />
                    </>
                  );
                })}
              </View>
            </>
          }
        />
        <View>
          <Text style={styles.characterTitle}>Описание</Text>
          <Text style={styles.subtext}>
            {productDetail.attributes.description}
          </Text>
          <PrimaryButton
            title="В корзину"
            onPress={() => addItemToCart(productDetail)}
            style={styles.loginBtn}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginLeft: 15,
    marginBottom: 30,
  },
  goback: {
    top: 10,
    marginBottom: 30,
    left: -10,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  imageContainer: {
    marginTop: 20,
  },
  favorite: {
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
    marginLeft: 255,
  },
  favIcon: {
    marginTop: 10,
  },
  image: {
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width / 1.1,
    margin: 5,
    borderRadius: 10,
  },
  previewImageContainer: {
    backgroundColor: '#F5F5F5',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  previewImage: {
    backgroundColor: '#F5F5F5',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  activeIndicator: {
    top: 60,
    color: 'white',
    backgroundColor: '#F1BD40',
  },
  inActiveIndicator: {
    top: 60,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '400',
    width: 220,
    color: '#000',
  },
  productCode: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  prices: {
    position: 'absolute',
    alignContent: 'flex-end',
    right: -100,
    fontSize: 18,
    color: '#000',
  },
  containerAttributParent: {
    marginTop: 3,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,

    paddingBottom: 5,
  },
  containerAttribut: {
    position: 'absolute',
    right: 0,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  containerAttributText: {
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 4,
    paddingBottom: 5,
  },
  characteristics: {
    margin: 10,
  },
  characterTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
  },
  characteristicsContainer: {
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 20,
  },
  characteristicWEit: {
    color: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    right: 0,
  },
  listContainer: {
    marginTop: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#000',
    marginTop: 0,
    padding: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  profileTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',

    color: '#000',
  },
  subtext: {
    color: '#000',
    fontWeight: '400',
    fontSize: 14,
  },
  loginBtn: {
    marginTop: 20,
    marginBottom: 30,
  },
});
export default ProductDetailScreen;
