import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/Login/Login';
import Welcome from '../../screens/Welcome/Welcome';
import PhoneNumber from '../../screens//PhoneInputNumber/PhoneInputNumber';
import VerificationScreen from '../../screens/VerificationScreen/VerificationScreen';
import Register from '../../screens/Register/Register';
import Success from '../../screens/Success/Success';

import TabNavigator from '../TabStack/TabStack';
import SplashScreen from '../../screens/SplashScreen/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const savedLogin = await AsyncStorage.getItem('identifier');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedLogin && savedPassword) {
        setLoggedIn(true);
        navigation.navigate('Home' as never);
      } else {
        setLoggedIn(false);
        navigation.navigate('login' as never);
      }
    })();
  }, [navigation]);
  return (
    <Stack.Navigator>
      {loggedIn ? (
        <Stack.Screen
          options={{headerShown: false}}
          name="welcome"
          component={Welcome}
        />
      ) : (
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={TabNavigator}
        />
      )}
      <Stack.Screen
        options={{headerShown: false}}
        name="login"
        component={Login}
      />
      <Stack.Screen
        name="phonecode"
        options={{headerShown: false}}
        component={PhoneNumber}
      />
      <Stack.Screen
        name="otpcodes"
        options={{headerShown: false}}
        component={VerificationScreen}
      />
      <Stack.Screen
        name="register"
        options={{headerShown: false}}
        component={Register}
      />
      <Stack.Screen
        name="successfullyRegister"
        options={{headerShown: false}}
        component={Success}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
