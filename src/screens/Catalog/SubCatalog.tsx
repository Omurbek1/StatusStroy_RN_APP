import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputSearchPressable from '../../components/Input/InputSearchPressable';
import GoBack from '../../components/GoBack';
import Feather from 'react-native-vector-icons/Feather';
import NoProducts from '../../components/NoProducts';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL_API} from '../../api/ProductsAPi';

const SubCatalog = ({route}: any) => {
  const navigation = useNavigation();
  const {categoryId} = route.params;
  const [subcategories, setSubcategories] = useState([]);
  const [categoriesTitle, setCategoriesTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/categories/${categoryId}?populate=*`,
      );

      setSubcategories(response.data.data.attributes.children);
      setCategoriesTitle(response.data.data);
      // console.log(response.data.data, 'response.data.data');
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const clearInput = () => {
    setSearchQuery('');
  };
  const subCategory = subcategories?.data?.filter(
    (category: {attributes: {name: string}}) =>
      category.attributes.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const handleSubcategorySelect = subcategoryId => {
    navigation.navigate('undersubcatalog', {subcategoryId});
  };
  const filtercategory = subcategories?.data?.map(item => item);
  const idCategoryID = filtercategory?.map(item => item?.id);
  console.log(idCategoryID);

  const renderProfileItem = ({item}: any) => {
    // console.log(item, 'profile item');
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
          <Text style={styles.headerText}>
            {categoriesTitle?.attributes?.name}
          </Text>
          <TouchableOpacity
            style={styles.alltitle}
            onPress={() =>
              navigation.navigate('subcatalogList' as never, {idCategoryID})
            }>
            <Text>Все</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={subCategory}
          keyExtractor={item => item.id}
          renderItem={renderProfileItem}
          style={styles.listContainer}
        />
      </View>
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
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 20,
    color: '#000',
    width: 220,
  },
  alltitle: {
    right: 15,
    position: 'absolute',

    fontSize: 15,
    fontWeight: '400',
    marginLeft: 20,

    textDecorationLine: 'underline',
    color: '#000',
  },
  subcatalogContainer: {
    margin: 6,
    marginLeft: 10,
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginTop: 0,
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
  profileTitleIcon: {
    top: 0,
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
export default SubCatalog;
