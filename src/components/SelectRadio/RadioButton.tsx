import React from 'react';
import {View, Text} from 'react-native';

export default function RadioButton({data, onSelect}) {
  return (
    <View>
      {data.map(item => {
        return <Text> {item.value}</Text>;
      })}
    </View>
  );
}
