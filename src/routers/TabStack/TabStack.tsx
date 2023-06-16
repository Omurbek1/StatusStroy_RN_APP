import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Catalog from '../../screens/Catalog/Catalog';
import FavoriteScreen from '../../screens/Favorites/FavoriteScreen';
import ShoppingCartScreen from '../../screens/ShoppingCart/ShoppingCartScreen';
import PerSonalStack from '../PerSonalStack/PerSonalStack';
import ProductStack from '../ProductStack/ProductStack';
import AppStack from '../AppStack/AppStack';
import BasketStack from '../BasketStack/BAsketStak';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#fff'},
        tabBarInactiveTintColor: '#B3B3B3',
        tabBarActiveTintColor: '#000',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'ProfileScreen') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={AppStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#fff',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="catalogs"
        component={ProductStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="grid" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profiles"
        component={PerSonalStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="shoppingcart"
        component={BasketStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const getTabBarVisibility = (route: any) => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if (routeName == 'GameDetails') {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;
