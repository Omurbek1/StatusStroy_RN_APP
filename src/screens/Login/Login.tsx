import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../components/Button/PrimaryButton';
import axios from 'axios';
import {BASE_URL_API} from '../../api/ProductsAPi';
import {useDispatch} from 'react-redux';

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required('Name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
const Login: React.FC = () => {
  const navigation = useNavigation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    console.log(identifier, password);
    // make API call to authenticate user
    try {
      const response = await axios.post(`${BASE_URL_API}/auth/local`, {
        identifier,
        password,
      });
      console.log(response.data, 'response.data');
      const token = response.data.jwt;
      const username = response.data.user.username;
      const email = response.data.user.email;

      if (response.status === 200) {
        // await AsyncStorage.setItem('token', response.data);
        await AsyncStorage.setItem('token', token);
        // await AsyncStorage.setItem('username', username);
        // await AsyncStorage.setItem('email', email);
        // await AsyncStorage.setItem('identifier', identifier);
        // await AsyncStorage.setItem('password', password);

        navigation.navigate('Home' as never);
      } else if (response.status === 401) {
        setError('Неверный логин или пароль 123');
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (e) {
      setError('Неверный логин или пароль');
      console.log(e, 'Неверный логин или пароль');
    }
    // ...

    // save login and password to AsyncStorage if rememberMe is enabled
    if (rememberMe) {
      await AsyncStorage.setItem('username', identifier);
      await AsyncStorage.setItem('password', password);
    } else {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
    }

    // navigate to the user info screen
    // ...
  };

  const handleSwitch = () => {
    setRememberMe(!rememberMe);
    console.log(rememberMe);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.goback} />
        <Text style={styles.title}> Вход</Text>
        <View style={styles.content}>
          <Text style={styles.loginandpassword}>Логин</Text>
          <View style={styles.inputContainer}>
            <Feather name="user" size={24} color="#000" style={styles.icon} />
            <TextInput
              style={styles.inputView}
              placeholder="Введите логин"
              onChangeText={setIdentifier}
              value={identifier}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.loginandpassword}>Пароль</Text>

          <View style={styles.inputContainer}>
            <Feather name="lock" size={24} color="#000" style={styles.icon} />
            <TextInput
              autoComplete="password"
              style={[
                styles.inputView,
                Platform.select({
                  ios: {
                    textAlignVertical: 'top',
                  },
                  android: {
                    outlineColor: '#000',
                    outlineWidth: 1,
                    border: '1px solid #000',
                  },
                }),
              ]}
              value={password}
              placeholder="Введите пароль"
              secureTextEntry={seePassword}
              onChangeText={setPassword}
              autoFocus={true}
            />
          </View>
          <Pressable
            onPress={() => setSeePassword(!seePassword)}
            style={styles.iconeye}>
            <Feather
              name={seePassword ? 'eye' : 'eye-off'}
              size={24}
              color="#000"
            />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.secondContainer}>
            <View style={styles.secondContainer}>
              <Switch
                trackColor={{false: '#767577', true: '#F1BD40'}}
                thumbColor={rememberMe ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                value={rememberMe}
                onValueChange={handleSwitch}
              />
              <Text style={styles.rememberme}>Запомнить меня</Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('phonecode' as never)}>
              <Text style={styles.forgotPassword}>Забыли пароль?</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.button}>
          <PrimaryButton title="Войти" onPress={handleLogin} />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: '600',
    fontSize: 30,
    marginTop: 100,
    marginLeft: 20,
    color: '#000',
    marginBottom: 60,
  },
  content: {
    margin: 20,
  },
  button: {
    margin: 10,
  },
  loginandpassword: {
    marginBottom: 10,
    color: '#000',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  inputView: {
    color: '#000',
  },
  icon: {
    zIndex: 999,
    padding: 10,
  },
  iconeye: {
    marginLeft: 290,
    top: -35,
    alignSelf: 'flex-start',
  },
  secondContainer: {
    flexDirection: 'row',
    top: -10,
  },
  rememberme: {
    color: '#000',
    top: 2,
  },

  forgotPassword: {
    color: '#000',
    marginLeft: 50,
    top: -10,
    textDecorationLine: 'underline' as 'underline',
  },

  goback: {
    top: 20,
    marginRight: 300,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;
