import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import GoBack from '../../components/GoBack';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

import * as Location from 'expo-location';

Geocoder.init('AIzaSyDYq0Ji8x6bJlzRvU_QdJd8YyZqM8Y8ZY0');

const PersonalTown = props => {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMessage('Permission to access location was denied');
          return;
        }

        const {coords} = await Location.getCurrentPositionAsync();
        setLocation(coords);
      } catch (error) {
        setErrorMessage(error.message);
      }
    })();
  }, []);

  if (location) {
    return <Text>Loading...</Text>;
  }
  const list = [
    {
      id: '1',
      title: 'Кабардино-Балкарская Республика',
      icon: 'map-pin',
      screen: 'nonS',
    },
  ];

  const navigateToScreen = (item: {screen: string}) => {
    navigation.navigate(item.screen as never);
  };
  const renderProfileItem = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.profileItem} onPress={() => {}}>
        <Feather name={item.icon} size={20} color="#000" />
        <Text style={styles.profileTitle}>{item.title}</Text>
        <Feather name="chevron-right" size={20} color="#ccc" />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.goback}>
        <GoBack />
      </View>
      <Text style={styles.title}>Ваш город </Text>
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={renderProfileItem}
        style={styles.listContainer}
      />
    </View>
  );
};

export default PersonalTown;

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
  listContainer: {
    flex: 1,
    marginTop: 0,
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
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
