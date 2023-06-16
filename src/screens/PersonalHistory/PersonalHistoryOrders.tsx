import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputSearchPressable from '../../components/Input/InputSearchPressable';
import GoBack from '../../components/GoBack';
import axios from 'axios';
import NoProducts from '../../components/NoProducts';

interface MyData {
  id: number;
  index: number | undefined;
}
const PersonalHistoryOrders = () => {
  const [histoty, setHistory] = useState<MyData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users?limit=3');
      const data = response.data;
      console.log(data);
      setHistory(data.users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //search filter functions
  const clearInput = () => {
    setSearchQuery('');
  };
  const handleSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
  };
  const filteredHistory = histoty.filter((item: any) => {
    return item.ein.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.ordersContainer}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderNumber}>№{item.ein}</Text>
          <View style={styles.orderStatus}>
            <Text style={styles.orderStatusText}>Выполнен</Text>
          </View>
        </View>
        <View style={styles.orderPerson}>
          <Text>Заказчик:</Text>
          <Text style={styles.orders}>Иванов Петр Сергеевич</Text>
        </View>
        <View>
          <Text>Дата и сумма заказа: </Text>
          <Text style={styles.orders}>{item.birthDate}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <GoBack />
        <InputSearchPressable
          value={searchQuery}
          clearInput={clearInput}
          onChange={handleSearch}
          placeholder="Поиск "
          stylesContainer={styles.inputContainer}
        />
      </View>
      {filteredHistory.length > 0 ? (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>История заказов</Text>
          <FlatList
            data={filteredHistory}
            renderItem={renderItem}
            keyExtractor={(item: MyData) => item.id.toString()}
          />
        </View>
      ) : (
        <NoProducts />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  inputContainer: {
    marginLeft: 20,
    paddingRight: 90,
    marginTop: 10,
  },
  contentContainer: {
    margin: 10,
  },
  ordersContainer: {
    margin: 10,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#EBEBEB',
    paddingBottom: 3,
    borderBottomWidth: 1,
  },
  orderNumber: {
    fontWeight: 'bold',
    color: '#000',
  },
  orderStatus: {
    backgroundColor: '#3E8C40',
    padding: 3,
    borderRadius: 5,
    marginBottom: 5,
  },
  orderStatusText: {
    color: '#fff',
    paddingLeft: 7,
    paddingRight: 7,
  },
  orderPerson: {
    marginTop: 5,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  orders: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
    padding: 12,
  },
});

export default PersonalHistoryOrders;
