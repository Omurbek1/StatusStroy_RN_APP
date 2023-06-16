import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
export default function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  });

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('jwt');
    if (!dataToken) {
      navigation.navigate('login' as never);
    } else {
      navigation.navigate('Home' as never);
    }
  };
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
}
