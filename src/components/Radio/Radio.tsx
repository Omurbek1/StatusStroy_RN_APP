import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
type Props = {
  checked: boolean;
  label: string;

  onChange(): void;

  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const Radio = ({checked, label, onChange, viewStyle, textStyle}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, viewStyle]}
      onPress={e => onChange()}>
      <View style={styles.radio}>
        {!!checked && <View style={styles.radioInner} />}
      </View>
      <Text style={[styles.radioText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    marginBottom: 18,
  },

  radio: {
    width: 19,
    height: 19,

    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,

    marginRight: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },

  radioInner: {
    width: 13,
    height: 13,

    borderRadius: 7,

    backgroundColor: '#E0E0E0',
  },

  radioText: {
    color: '#000',
  },
});
