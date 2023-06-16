/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from './style';
import CardButton from '../../components/Button/CardButton';
interface IProductCard {
  item: any;
  onFavoritePress: () => void;
  onRemoveBasket: () => void;
  onAddBasket: () => void;
  isFavorite: any;
  goToDetail: () => void;
  isFavoriteColor: string;
}
const ProductCard = ({
  item,
  onFavoritePress,
  onAddBasket,
  isFavorite,
  goToDetail,
  isFavoriteColor,
}: IProductCard) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={styles.discount}>
          <Text style={styles.discountPercentage}>
            {item.discountPercentage.toFixed()} %
          </Text>
        </View>
        <TouchableOpacity onPress={onFavoritePress} style={{marginTop: 8}}>
          <AntDesign
            name={isFavorite ? 'hearto' : 'heart'}
            size={24}
            color={isFavoriteColor ? 'red' : 'black'}
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={goToDetail}>
        <Image source={{uri: item.thumbnail}} style={styles.image} />
      </TouchableOpacity>
      <Text
        style={{marginTop: 18, fontSize: 14, fontWeight: '400', color: '#000'}}>
        {item.title}
      </Text>
      <Text style={{marginTop: 0}}>{item.rating}</Text>
      <Text style={styles.price}>
        {item.price} ₽ <Text style={styles.subprice}>{item.stock} ₽ </Text>
      </Text>
      <CardButton
        title="В корзину"
        onPress={onAddBasket}
        style={styles.loginBtn}
      />
    </View>
  );
};

export default ProductCard;
