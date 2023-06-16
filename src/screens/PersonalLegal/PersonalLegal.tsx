import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import GoBack from '../../components/GoBack';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../components/Button/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API} from '../../api/ProductsAPi';
import axios from 'axios';

export default function PersonalLegal() {
  const [legalList, setLegalList] = React.useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      axios
        .get(BASE_URL_API + '/legal-entities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setLegalList(res.data.data);
          // console.log(res.data.data, 'data');
        });
    } catch (e) {
      console.log(e, 'error');
    }
  };
  useEffect(() => {
    fetchData();
  });

  const renderProfileItem = ({item}: any) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.profileItem}
          onPress={() =>
            navigation.navigate('EditSaveLegalScreen' as never, {
              LegalDetailId: item.id,
            })
          }>
          <Feather name={'users'} size={20} color="#000" />
          <View>
            <Text style={styles.profileTitle}>{item.attributes.fullName}</Text>
            <Text style={styles.profileCode}>ИНН: {item.attributes.code}</Text>
          </View>
          <View style={styles.icon}>
            <Feather name="chevron-right" size={20} color="#ccc" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.goback}>
        <GoBack />
      </View>
      <Text style={styles.title}>Юридические лица </Text>
      <FlatList
        data={legalList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProfileItem}
        style={styles.listContainer}
      />
      <PrimaryButton
        title="Добавить юридическое лицо"
        style={styles.loginBtn}
        onPress={() => navigation.navigate('personalAddLegal' as never)}
      />
    </View>
  );
}

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
    paddingVertical: 10,
    backgroundColor: '#F3F3F3',
    marginTop: 0,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    margin: 10,
  },
  profileTitle: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  profileCode: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '400',
    color: '#747277',
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  profileSubTitle: {
    marginLeft: 10,
    fontSize: 12,
  },
  loginBtn: {
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
});
