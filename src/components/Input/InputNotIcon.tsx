import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

interface InputSearchPressableProps {
  value: string;
  onChange(text: string): void;
  stylesContainer?: StyleProp<ViewStyle>;
  placeholder?: string;
}
const InputNotIcon = ({
  value,
  onChange,
  stylesContainer,
  placeholder,
}: InputSearchPressableProps) => {
  const borderWidth = value ? 1 : 0;
  return (
    <View
      style={{
        height: 47,
        backgroundColor: '#F3F3F3',
        margin: 10,
        borderRadius: 10,
        borderWidth,
      }}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={[styles.inputContainer, stylesContainer]}
      />
    </View>
  );
};

export default InputNotIcon;

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: '#F3F3F3',
    margin: 10,
    borderRadius: 10,
  },
  inputContainer: {
    backgroundColor: '#F3F3F3',
    height: 45,
    paddingLeft: 10,
    marginTop: 0,
    fontSize: 14,

    borderRadius: 10,
  },
});
