import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import GoBack from '../../components/GoBack';
import {TabView, SceneMap} from 'react-native-tab-view';

import EntityScreen from './EntityScreen';
import IndividualScreen from './IndividualScreen';

const PersonalAddLegal = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Юридическое \n лицо'},
    {key: 'second', title: 'Индивидуальный предприниматель'},
  ]);

  const renderScene = SceneMap({
    first: EntityScreen,
    second: IndividualScreen,
  });
  const renderTabBar = (props: {navigationState: any; jumpTo: any}) => {
    const {navigationState, jumpTo} = props;
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexDirection: 'row',
          marginTop: 10,
          padding: 10,
        }}>
        {navigationState.routes.map((route: any, indexx: number) => {
          const color = indexx === navigationState.index ? '#fff' : 'black';
          const backgroundColor =
            indexx === navigationState.index ? '#F1BD40' : '#F5F5F5';
          return (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                marginRight: 0,
                borderRadius: 10,
                width: 150,
                margin: 10,
                height: 60,
                backgroundColor,
              }}>
              <Text
                key={route.key}
                onPress={() => jumpTo(route.key)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  marginRight: 0,
                  color,
                  textAlign: 'center',
                  marginTop: 10,
                  fontSize: 14,
                }}>
                {route.title}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container}>
      <View style={styles.goback}>
        <GoBack />
      </View>
      <Text style={styles.title}>Добавление {'\n'}юридического лица </Text>
      <View style={styles.tabbar}>
        <TabView
          key={index}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </ScrollView>
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
    marginLeft: 15,
  },
  goback: {
    top: 10,
    marginBottom: 30,
    left: -10,
  },

  tabbar: {
    flex: 1,
  },

  titles: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 24,
  },
  tabtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
export default PersonalAddLegal;
