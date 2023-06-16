import React from 'react';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {navigationRef} from './src/routers/RootNavigation';
import AuthStack from './src/routers/AuthStack/AuthStack';
import {useColorScheme} from 'react-native';

const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    accent: '#000',
  },
};

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    accent: '#000',
  },
};
export default function MyApp() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <AuthStack />
    </NavigationContainer>
  );
}
