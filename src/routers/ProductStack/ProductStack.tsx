import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import CategoryProducts from '../../screens//CategoryList//CategoryProducts';
import Catalog from '../../screens/Catalog/Catalog';
import ProductsList from '../../screens/ProductsList/ProductsList';
import SubCatalog from '../../screens/Catalog/SubCatalog';
import UnderSubCatalog from '../../screens/Catalog/UnderSubCatalog';
import CatalogList from '../../screens/Catalog/CatalogList';
import CategoryProductsDetail from '../../screens/CategoryList/CategoryProductsDetail';

const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="catalog"
        component={Catalog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="categorylistProducts"
        component={CategoryProducts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="subcatalog"
        component={SubCatalog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="undersubcatalog"
        component={UnderSubCatalog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="subcatalogList"
        component={CatalogList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="catalogProductsDetails"
        component={CategoryProductsDetail}
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
export default ProductStack;
