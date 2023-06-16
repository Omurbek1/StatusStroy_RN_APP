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
  clearInput(): void;
}
const InputSearchPressable = ({
  value,
  onChange,
  stylesContainer,
  placeholder,
  clearInput,
}: InputSearchPressableProps) => {
  return (
    <View style={[styles.container, stylesContainer]}>
      <Pressable style={styles.iconSearch}>
        <Feather name="search" size={20} color="#808080" />
      </Pressable>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={styles.inputContainer}
      />
      {value && (
        <Pressable style={styles.iconSearchLeft} onPress={clearInput}>
          <Feather name="x" size={20} color="#808080" />
        </Pressable>
      )}
    </View>
  );
};

export default InputSearchPressable;

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: '#F5F5F5',
    margin: 20,
    marginLeft: 50,
    borderRadius: 30,
  },
  inputContainer: {
    height: 50,
    paddingRight: 90,
    marginLeft: 50,
    marginTop: -23,
    fontSize: 14,
  },
  iconSearch: {
    left: 13,
    top: 12,
  },
  iconSearchLeft: {
    position: 'absolute',
    right: 13,
    top: 12,
  },
  goback: {
    left: -30,
  },
});
