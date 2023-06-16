import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputNotIcon from '../../components/Input/InputNotIcon';
import RadioButtons from '../../components/RadioButtons/RadioButtons';
import axios from 'axios';
import {BASE_URL_API} from '../../api/ProductsAPi';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndividualScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchquery, setSearchquery] = useState('');

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
          setUsers(res.data.data);
          // console.log(res, 'data');
        });
    } catch (e) {
      console.log(e, 'error');
    }
  };
  useEffect(() => {
    fetchData();
  });

  const handleOptionChange = (value: any) => {
    console.log(value, 'выбрано юридическое лицо');
  };
  const handleSearch = (query: string) => {
    setSearchquery(query);
  };
  const filterproduct = users.filter((product: string | number | any) =>
    product.attributes.code.toLowerCase().includes(searchquery.toLowerCase()),
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText}>ИНН </Text>
        <InputNotIcon
          value={searchquery}
          onChange={handleSearch}
          placeholder="Введите ваш ИНН"
        />
        <View style={styles.resultContainer}>
          <RadioButtons data={filterproduct} onChange={handleOptionChange} />
          {filterproduct.length === 0 && (
            <Text style={styles.resultNotText}>
              К сожалению, по вашему запросу,не найдено юридическое лицо.
              Попробуйте заново или добавьте новое.
            </Text>
          )}
        </View>
        <PrimaryButton
          title="Создать юридическое лицо"
          onPress={() =>
            navigation.navigate('PersonalCreateAddIndividualLegal' as never)
          }
        />
      </View>
    </ScrollView>
  );
};

export default IndividualScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    marginLeft: 10,
  },
  resultContainer: {
    marginTop: 10,
    margin: 10,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '400',
    color: '#000',
  },
  resultNotText: {
    lineHeight: 20,
  },
});
