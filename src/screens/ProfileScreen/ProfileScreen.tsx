import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
} from 'react-native';
import React, {useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../store/actions/authActions.js';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [deletUser, setDeletUser] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    setModalVisible(true);
  };
  const handleLogoutScreen = async () => {
    dispatch(logoutUser());
    navigation.navigate('login' as never);
  };
  const handleDeleteUserModal = () => {
    setDeletUser(true);
  };
  const handleSendMessage = () => {
    Linking.openURL('https://t.me/Mikhail_Pos');
  };
  const handleLogoutUser = async () => {
    await AsyncStorage.removeItem('token');
    console.log('logged out');
    navigation.navigate('login' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.goback} />
      <Text style={styles.title}>Профиль</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('perSonaldata' as never)}>
        <View style={styles.logoutContainer}>
          <View style={{flexDirection: 'row'}}>
            <Feather name="user" size={20} color="#000" />
            <Text style={styles.logoutText}>Личные данные</Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color="#ccc"
            style={styles.logoutIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('personalTown' as never)}>
        <View style={styles.logoutContainer}>
          <View style={{flexDirection: 'row'}}>
            <Feather name="map-pin" size={20} color="#000" />
            <Text style={styles.logoutText}>Ваш город</Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color="#ccc"
            style={styles.logoutIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('personalLegal' as never)}>
        <View style={styles.logoutContainer}>
          <View style={{flexDirection: 'row'}}>
            <Feather name="users" size={20} color="#000" />
            <Text style={styles.logoutText}>Юридические лица</Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color="#ccc"
            style={styles.logoutIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('personalHistoryOrder' as never)}>
        <View style={styles.logoutContainer}>
          <View style={{flexDirection: 'row'}}>
            <Feather name="package" size={20} color="#000" />
            <Text style={styles.logoutText}>История заказов</Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color="#ccc"
            style={styles.logoutIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSendMessage}>
        <View style={styles.logoutContainer}>
          <View style={{flexDirection: 'row'}}>
            <Feather name="mail" size={20} color="#000" />
            <Text style={styles.logoutText}>Обратная связь</Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color="#ccc"
            style={styles.logoutIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoutContainer}>
          <View style={{flexDirection: 'row'}}>
            <Feather name="log-out" size={20} color="#000" />
            <Text style={styles.logoutText}>Выйти</Text>
          </View>
          <Feather
            name="chevron-right"
            size={20}
            color="#ccc"
            style={styles.logoutIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDeleteUserModal}>
        <Text style={styles.deleteIcon}>Удалить аккаунт?</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Вы точно хотите выйти из аккаунта?
            </Text>

            <TouchableOpacity onPress={handleLogoutUser}>
              <Text style={styles.modalButtonDelete}>Выйти из аккаунта</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent2}>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonCancel}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={deletUser} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Вы точно хотите удалить аккаунт?
            </Text>

            <TouchableOpacity onPress={handleLogoutScreen}>
              <Text style={styles.modalButtonDelete}>Удалить аккаунт</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent2}>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={() => setDeletUser(false)}>
              <Text style={styles.modalButtonCancel}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginLeft: 5,
    marginBottom: 10,
  },
  goback: {
    top: 10,
    marginBottom: 30,
    left: -10,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#F3F3F3',
    marginTop: 0,
    padding: 10,
    paddingTop: 15,

    marginBottom: 13,
    borderRadius: 10,
    margin: 10,
  },
  profileTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  deleteIcon: {
    textAlign: 'center',
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 0,
    top: 200,
  },
  logoutContainer: {
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#F3F3F3',
    padding: 12,
    top: 0,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  logoutIcon: {
    position: 'absolute',
    right: 10,
    marginTop: 10,
    marginLeft: 195,
  },

  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 450,
  },

  modalText: {
    fontSize: 14,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    borderBottomColor: '#F5F5F5',
    color: '#000',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  modalButtonDelete: {
    color: 'red',
    fontSize: 18,
    borderRadius: 5,
    marginVertical: 5,
  },
  modalButtonCancel: {
    paddingLeft: 55,
    paddingRight: 55,
    height: 60,
    top: -23,
    marginTop: 30,
    color: '#3362AB',
    fontSize: 18,
  },
  modalContent2: {
    backgroundColor: 'white',
    paddingLeft: 28,
    paddingRight: 28,
    marginTop: 20,
    borderRadius: 14,
    alignItems: 'center',
    height: 50,
  },
});
export default ProfileScreen;
