import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import MyApp from './MyApp';
import './ignoreWarnings';
import {Provider as PaperProvider} from 'react-native-paper';

import {store} from './src/store/store';
import {ToastProvider} from 'react-native-toast-notifications';

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <ToastProvider>
          <MyApp />
        </ToastProvider>
      </PaperProvider>
    </StoreProvider>
  );
}
