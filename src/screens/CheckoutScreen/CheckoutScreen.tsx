import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GoBack from '../../components/GoBack';
import {TabView, SceneMap} from 'react-native-tab-view';
import IndividualScren from './IndividualScreen/IndividualScren';
import EntityScreen from './EntityScreen/EntityScreen';

const renderScene = SceneMap({
  first: IndividualScren,
  second: EntityScreen,
});

const renderTabBar = props => {
  const {navigationState, jumpTo} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {navigationState.routes.map((route, index) => {
        const color = index === navigationState.index ? '#fff' : 'black';
        const backgroundColor =
          index === navigationState.index ? '#F1BD40' : '#F5F5F5';
        return (
          <View
            style={{
              marginRight: 0,
              borderRadius: 10,
              width: '50%',
              height: 40,
              backgroundColor,
              marginBottom: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              key={route.key}
              onPress={() => jumpTo(route.key)}
              style={{
                marginRight: 0,
                color,
                textAlign: 'center',
              }}>
              {route.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
const CheckoutScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Физическое лицо'},
    {key: 'second', title: 'Юридическое лицо'},
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.arrowBackBlock}>
          <GoBack />
        </View>
        <Text style={styles.headerText}>Оформление заказа</Text>
      </View>
      <View style={styles.tabViewContainer}>
        <TabView
          keyboardDismissMode="on-drag"
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: 300}}
          style={{backgroundColor: 'transparent'}}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 43 : 23,
    marginBottom: 20,
  },
  arrowBackBlock: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  tabViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});

export default CheckoutScreen;
