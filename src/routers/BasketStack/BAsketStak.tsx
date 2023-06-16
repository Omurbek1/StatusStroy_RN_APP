import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/Login/Login';
import Welcome from '../../screens/Welcome/Welcome';
import PhoneNumber from '../../screens//PhoneInputNumber/PhoneInputNumber';
import VerificationScreen from '../../screens/VerificationScreen/VerificationScreen';
import Register from '../../screens/Register/Register';
import Success from '../../screens/Success/Success';

import TabNavigator from '../TabStack/TabStack';
import SplashScreen from '../../screens/SplashScreen/SplashScreen';
import ShoppingCartScreen from '../../screens/ShoppingCart/ShoppingCartScreen';
import CheckoutScreen from '../../screens/CheckoutScreen/CheckoutScreen';

const Stack = createNativeStackNavigator();

const BasketStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="basketCard"
        component={ShoppingCartScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="login"
        component={Login}
      />
      <Stack.Screen
        name="checkoutOrder"
        options={{headerShown: false}}
        component={CheckoutScreen}
      />
    </Stack.Navigator>
  );
};

export default BasketStack;
