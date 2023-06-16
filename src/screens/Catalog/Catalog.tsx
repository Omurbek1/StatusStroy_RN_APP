import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import Grid from 'react-native-grid-component';
import {BASE_URL_API} from '../../api/ProductsAPi';
import InputPressable from '../../components/Input/InputPressable';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import NoProducts from '../../components/NoProducts';

const DeviceWidth = Dimensions.get('window').width;
export default function Catalog() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const clearInput = () => {
    setSearchQuery('');
  };
  const filetrCategory = categories.filter(category =>
    category.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  useEffect(() => {
    const fetchProductsIsNew = async () => {
      try {
        const response = await axios.get(
          BASE_URL_API + '/categories?populate=*',
          {
            params: {
              filters: {
                parent: {id: {$null: true}},
              },
            },
          },
        );
        const sellProducts = response.data.data.filter(
          (product: {attributes: any}) => product.attributes.parent,
        );
        setCategories(sellProducts);
        console.log(sellProducts, 'sellProducts');
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductsIsNew();
  }, []);

  const handleCategoryPress = (categoryId: any) => {
    navigation.navigate('subcatalog', {categoryId});
    // navigation.navigate('subcatalog' as never, {
    //   subcategories: category,
    //   subcatalogName: category.attributes.name,
    // });
  };

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View style={styles.fullContainer}>
        <Text style={styles.headerText}>Каталог</Text>
        <View style={styles.searchContainer}>
          <InputPressable
            placeholder="Поиск"
            value={searchQuery}
            onChange={handleSearch}
            clearInput={clearInput}
          />
          {filetrCategory.length > 0 ? (
            <View style={styles.gridContainer}>
              <Grid
                style={styles.list}
                key={(item: any) => item.id}
                renderItem={(item: any) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleCategoryPress(item.id)}>
                      <View style={styles.grid}>
                        {item?.attributes?.photo?.data?.attributes?.url ? (
                          <View style={styles.imageContainer}>
                            <Image
                              source={{
                                uri: item?.attributes?.photo?.data?.attributes
                                  ?.url,
                              }}
                              style={styles.image}
                            />
                          </View>
                        ) : (
                          <Image
                            source={require('../../assets/no-image.png')}
                            style={styles.image}
                          />
                        )}

                        <Text
                          style={styles.gridText}
                          adjustsFontSizeToFit={true}>
                          {item.attributes.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                data={filetrCategory}
                numColumns={3}
              />
            </View>
          ) : (
            <NoProducts />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
