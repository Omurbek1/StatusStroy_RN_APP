import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BASE_URL_API} from '../../api/ProductsAPi';
import Feather from 'react-native-vector-icons/Feather';
import GoBack from '../../components/GoBack';
import InputSearchPressable from '../../components/Input/InputSearchPressable';
import {useNavigation} from '@react-navigation/native';

const UnderSubCatalog = ({route}: any) => {
  const navigation = useNavigation();
  const {subcategoryId} = route.params;
  const [unSubCatalog, setUnSubCatalog] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [unSubCatalogTitle, setUnSubCatalogTitle] = useState('');
  console.log(subcategoryId, 'subcategoriesProducts');
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/categories/${subcategoryId}?populate=*`,
      );
      setUnSubCatalog(response.data.data.attributes.children);
      setUnSubCatalogTitle(response?.data?.data?.attributes?.name);
      // console.log(response.data.data.attributes, 'response.data');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const subCategory = unSubCatalog?.data?.filter(
    (category: {attributes: {name: string}}) =>
      category.attributes.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );
  const handleSubcategorySelect = subcategoryId => {
    navigation.navigate('categorylistProducts', {subcategoryId});
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const clearInput = () => {
    setSearchQuery('');
  };
  const renderProfileItem = ({item}: any) => {
    console.log(item, 'profile item');
    return (
      <>
        <TouchableOpacity
          style={styles.profileItem}
          onPress={() => handleSubcategorySelect(item.id)}>
          <Text style={styles.profileTitle}>{item.attributes.name}</Text>
          <Feather
            style={styles.profileTitleIcon}
            name="chevron-right"
            size={20}
            color="#ccc"
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.headerContainer}>
          <GoBack stylesContainer={styles.goback} />
          <InputSearchPressable
            value={searchQuery}
            clearInput={clearInput}
            onChange={handleSearch}
            placeholder="Поиск "
            stylesContainer={styles.inputContainer}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>{unSubCatalogTitle}</Text>
          <Text style={styles.alltitle}>Все</Text>
        </View>

        <FlatList
          data={subCategory}
          keyExtractor={item => item}
          renderItem={renderProfileItem}
          style={styles.listContainer}
        />
      </View>
    </View>
  );
};

export default UnderSubCatalog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 10,
    margin: 0,
  },
  goback: {
    marginLeft: 0,
  },
  secondContainer: {
    margin: 5,
  },
  inputContainer: {
    marginLeft: 20,
    paddingRight: 80,
    marginTop: 10,
  },
  contentContainer: {
    margin: 0,
    flexDirection: 'row',
    marginBottom: 20,
  },

  headerText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 20,
    color: '#000',
    width: 220,
  },
  alltitle: {
    right: 10,
    fontSize: 15,
    fontWeight: '400',
    position: 'absolute',
    textDecorationLine: 'underline',
    color: '#000',
  },
  subcatalogContainer: {
    margin: 6,
    marginLeft: 10,
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
  },
  icon: {
    left: 240,
  },

  listContainer: {
    marginTop: 20,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#F3F3F3',
    marginTop: 0,
    padding: 10,
    paddingTop: 10,

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

  nodataTitle: {
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    marginTop: 150,
  },
});
