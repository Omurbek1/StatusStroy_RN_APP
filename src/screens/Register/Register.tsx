import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import GoBack from '../../components/GoBack';
import {useNavigation} from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';
import PrimaryButton from '../../components/Button/PrimaryButton';
// import {registerUserSlice} from '../../store/reducers/registerUserSlice';
import {useDispatch} from 'react-redux';
import {registerUserSuccess} from '../../store/reducers/registerUserSlice';

const Register: React.FC = () => {
  const navigation = useNavigation();
  const [username, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [seePassword, setSeePassword] = useState(true);
  const dispatch = useDispatch();

  const repeatPasswordMatch = (password, repeatPassword): any => {
    return password === repeatPassword;
  };
  const isValidEmail = email => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleRegister = async () => {
    if (!repeatPasswordMatch(password, repeatPassword)) {
      setError(
        'Пароли не совпадают. Пожалуйста, введите одинаковые пароли в оба поля',
      );
      return;
    }
    if (!isValidEmail(email)) {
      setError(
        'Поле Email должно содержать действительный адрес электронной почты',
      );
      return;
    }
    // Этот адрес электронной почты уже зарегистрирован. Пожалуйста, попробуйте другой"

    if (!username || !email || !password) {
      setError('Заполните все поля');
      return;
    }
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      dispatch(registerUserSuccess(username, email, password));
      console.log(username, email, password, ' успешно ');
      navigation.navigate('successfullyRegister' as never);
    } catch (err) {
      setError(
        'Ошибка при создании аккаунта. Пожалуйста, проверьте введенные данные и повторите попытку',
      );
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.goback}>
          <GoBack />
        </View>
        <Text style={styles.title}> Регистрация</Text>
        <View style={{margin: 10}}>
          <View style={styles.content}>
            <Text style={styles.loginandpassword}>Имя пользователя*</Text>
            <View style={styles.inputContainer}>
              <Feather name="user" size={24} color="#000" style={styles.icon} />
              <TextInput
                // style={styles.inputView}
                placeholder="Введите username"
                value={username}
                onChangeText={setLogin}
                autoFocus={true}
              />
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.loginandpassword}>Email</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={24} color="#000" style={styles.icon} />
              <TextInput
                // style={styles.inputView}
                placeholder="Введите электронную почту"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus={true}
              />
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.loginandpassword}>Пароль</Text>

            <View style={styles.inputContainer}>
              <Feather name="lock" size={24} color="#000" style={styles.icon} />
              <TextInput
                style={[
                  // styles.inputView,
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
                placeholder="Придумайте пароль"
                secureTextEntry={seePassword}
                onChangeText={setPassword}
                value={password}
                autoFocus={true}
              />
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
          </View>
          <View style={styles.content}>
            <Text style={styles.loginandpassword}>Повторить пароль*</Text>

            <View style={styles.inputContainer}>
              <Feather name="lock" size={24} color="#000" style={styles.icon} />
              <TextInput
                style={[
                  // styles.inputView,
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
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                placeholder="Повторить пароль  "
                secureTextEntry={seePassword}
                autoFocus={true}
              />
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
          </View>
        </View>
        <View style={styles.footer}>
          <PrimaryButton
            title={isLoading ? 'Registering...' : 'Register'}
            onPress={handleRegister}
            disabled={isLoading}
          />
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
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
    marginTop: 60,
    marginLeft: 10,
    color: '#000',
    marginBottom: 20,
  },
  content: {
    margin: 10,
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
    color: '#000',

    borderRadius: 10,
  },
  inputView: {
    justifyContent: 'center',

    lineHeight: 0,
    color: '#000',
  },
  goback: {
    top: 20,
    marginRight: 300,
  },
  icon: {
    zIndex: 999,
    padding: 10,
  },
  iconeye: {
    marginLeft: '33%',
    top: 10,
    alignSelf: 'flex-start',
  },
  footer: {
    margin: 10,
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
    margin: 10,
    textAlign: 'center',
  },
});

export default Register;
