import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputSearchPressable from '../../components/Input/InputSearchPressable';
import GoBack from '../../components/GoBack';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL_API} from '../../api/ProductsAPi';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';

const CatalogList = ({route}) => {
  const navigation = useNavigation();
  const {idCategoryID} = route.params;
  const [subcategories, setSubcategories] = useState([]);
  const [categoriesTitle, setCategoriesTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchSubcategories();
  }, []);
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/categories/${idCategoryID}?populate=*`,
      );

      setSubcategories(response.data.data);
      setCategoriesTitle(response.data.data);
      //   console.log(response.data.data, 'response.data.data s');
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
  console.log(subcategories, 'subcategories title');
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const clearInput = () => {
    setSearchQuery('');
  };

  const subCategory = subcategories?.data?.filter(
    (category: {attributes: {name: string}}) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleSubcategorySelect = subcategoryId => {
    navigation.navigate('undersubcatalog', {subcategoryId});
  };
  //   const renderProfileItem = (item: any) => {
  //     console.log(item, 'profile item');
  //     return (
  //       <>
  //         <TouchableOpacity
  //           style={styles.profileItem}
  //           onPress={() => handleSubcategorySelect(item.id)}>
  //           <Text style={styles.profileTitle}>{item.attributes.name}</Text>
  //           <Feather
  //             style={styles.profileTitleIcon}
  //             name="chevron-right"
  //             size={20}
  //             color="#ccc"
  //           />
  //         </TouchableOpacity>
  //       </>
  //     );
  //   };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.headerContainer}>
          <GoBack stylesContainer={styles.goback} />
          <InputSearchPressable
            value={searchQuery}
            clearInput={clearInput}
            onChange={subCategory}
            placeholder="Поиск "
            stylesContainer={styles.inputContainer}
          />
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.profileTitle}>
            {subcategories?.attributes?.name}
          </Text>
          <Feather
            style={styles.profileTitleIcon}
            name="chevron-right"
            size={20}
            color="#ccc"
          />
        </View>
        {/* <FlatList
          data={subcategories}
          keyExtractor={item => item.id}
          renderItem={renderProfileItem}
          style={styles.listContainer}
        /> */}
      </View>
    </ScrollView>
  );
};

export default CatalogList;

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
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 12,
    margin: 10,
    borderRadius: 10,
  },
  profileTitleIcon: {
    position: 'absolute',
    right: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
