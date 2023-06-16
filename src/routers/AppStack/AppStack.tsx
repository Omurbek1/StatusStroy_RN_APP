import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import ProductDetailScreen from '../../screens/ProductDetail/ProductDetailScreen';
import Catalog from '../../screens/Catalog/Catalog';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import ProductsList from '../../screens/ProductsList/ProductsList';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="productDetail"
        component={ProductDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="productslist"
        component={ProductsList}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
