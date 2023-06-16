import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from '../../routers/TabStack/TabStack';

export default function Home() {
  return (
    <NavigationContainer>
      <TabNavigator />
      {/* <TabNavigator /> */}
    </NavigationContainer>
  );
}
