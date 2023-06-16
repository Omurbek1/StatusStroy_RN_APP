import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import PrimaryButton from '../../components/Button/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/login/logo.svg';

export default function Welcome() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation();

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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require('../../assets/login/backround.png')}>
        <View style={styles.containerButtons}>
          <Logo width={76} height={50} />
          <Text style={styles.title}>STATUS STROY {'\n'}market</Text>
          {loggedIn ? (
            <PrimaryButton
              title="Войти"
              style={styles.loginbutton}
              onPress={() => navigation.navigate('login' as never)}
            />
          ) : (
            <PrimaryButton
              title="Войти"
              style={styles.loginbutton}
              onPress={() => navigation.navigate('Home' as never)}
            />
          )}

          <View style={styles.footerText}>
            <Text style={{color: '#000'}}>Нет аккаунта ? </Text>
            <Pressable
              onPress={() => navigation.navigate('phonecode' as never)}>
              <Text style={{color: '#F1BD40'}}>Регистрация</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  containerButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 40,
    textAlign: 'center',
  },
  loginbutton: {
    paddingLeft: 140,
    paddingRight: 140,
    margin: 0,
    marginTop: 0,
  },
  footerText: {
    flexDirection: 'row',
    marginTop: 50,
  },
});
