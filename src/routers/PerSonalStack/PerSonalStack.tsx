import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PersonalScreen from '../../screens/PersonalScreen/PersonalScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import PersonalTown from '../../screens/PersonalTown/PersonalTown';
import PersonalLegal from '../../screens/PersonalLegal/PersonalLegal';
import PersonalHistoryOrders from '../../screens/PersonalHistory/PersonalHistoryOrders';
import PersonalFeedback from '../../screens/PersonalFeedback/PersonalFeedback';
import PersonalAddLegal from '../../screens/PersonalAddLegal/PersonalAddLegal';
import ProductDetailScreen from '../../screens/ProductDetail/ProductDetailScreen';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';

import CreateAddLegal from '../../screens/PersonalAddLegal/CreateAddEntityLegal';
import EditSaveLegalScreen from '../../screens/PersonalAddLegal/EditSaveLegalScreen';
import CreateAddEntityLegal from '../../screens/PersonalAddLegal/CreateAddEntityLegal';
import CreateAddIndividualScreen from '../../screens/PersonalAddLegal/CreateAddIndividualScreen';
const Stack = createNativeStackNavigator();

const PerSonalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="perSonaldata"
        component={PersonalScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="personalTown"
        component={PersonalTown}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="personalLegal"
        component={PersonalLegal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="personalHistoryOrder"
        component={PersonalHistoryOrders}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="personalFeedback"
        component={PersonalFeedback}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="personalAddLegal"
        component={PersonalAddLegal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalCreateAddEntityLegal"
        component={CreateAddEntityLegal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalCreateAddIndividualLegal"
        component={CreateAddIndividualScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditSaveLegalScreen"
        component={EditSaveLegalScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="producstDetail"
        component={ProductDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default PerSonalStack;
