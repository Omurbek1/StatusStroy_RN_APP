import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, removeFavorite} from '../../store/reducers/FavoriteSlice';
import CardButton from '../Button/CardButton';

const ProductsCard = ({product}: any) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.fav.items);

  const handleAddFavorite = () => {
    dispatch(addFavorite(product));
    console.log('added', product);
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(product.id));
  };
  const isFavorite = favorites.includes(product.id);
  console.log(isFavorite, 'product');
  return (
    <View>
      {product.map((item: any) => (
        <View key={item}>
          <Text>{item.title}</Text>
          <Text>{item.discountPercentage}s</Text>
          <Text>ProductsCard</Text>
          <CardButton
            title={isFavorite ? 'added to favorite' : 'remove from favorite'}
            style={
              isFavorite ? {backgroundColor: 'red'} : {backgroundColor: 'green'}
            }
            onPress={handleAddFavorite}
          />
        </View>
      ))}
    </View>
  );
};

export default ProductsCard;

const styles = StyleSheet.create({});
