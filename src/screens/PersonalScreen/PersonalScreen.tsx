import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GoBack from '../../components/GoBack';

import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/Button/PrimaryButton';

const PersonalScreen = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [phonenumber, setPhonenumber] = useState(null);

  useEffect(() => {
    // retrieve token from AsyncStorage
    AsyncStorage.getItem('user')
      .then(value => {
        return setUser(value);
      })
      .catch(error => console.log(error));
    AsyncStorage.getItem('email')
      .then(value => {
        return setEmail(value);
      })
      .catch(error => console.log(error));
    AsyncStorage.getItem('phonenumber')
      .then(value => {
        return setPhonenumber(value);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.goback}>
        <GoBack />
      </View>

      <Text style={styles.title}>Личные данные</Text>
      <View>
        <Text style={styles.name}>ФИО </Text>
        <View style={styles.inputText}>
          <Feather name="user" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="Крылов Виталий Юрьевич"
            style={styles.TextInputT}
            value={user}
          />
        </View>
      </View>
      <View>
        <Text style={styles.name}>Email </Text>
        <View style={styles.inputText}>
          <Feather name="mail" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="vitalyheb@gmail.com"
            style={styles.TextInputT}
            value={email}
          />
        </View>
      </View>
      <View>
        <Text style={styles.name}>Телефон </Text>
        <View style={styles.inputText}>
          <Feather name="phone" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="+7 665-145-1345"
            style={styles.TextInputT}
            value={phonenumber}
          />
        </View>
      </View>
      <PrimaryButton style={styles.loginBtn} title="Сохранить изменения" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginLeft: 15,
    marginBottom: 30,
  },
  goback: {
    top: 10,
    marginBottom: 30,
    left: -10,
  },
  inputText: {
    height: 50,
    color: '#000',
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#F5F5F5',
    underlineColor: 'transparent',
    underlineColorAndroid: 'transparent',
  },
  TextInputT: {
    marginLeft: 40,
    fontSize: 16,
    top: -35,
  },
  icon: {
    marginTop: 15,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    marginLeft: 12,
    marginTop: 0,
  },
  loginBtn: {
    marginTop: 180,
    marginBottom: 40,
  },
});
export default PersonalScreen;
