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
const InputPressableList = ({
  value,
  onChange,
  stylesContainer,
  placeholder,
  clearInput,
}: InputSearchPressableProps) => {
  return (
    <View style={[styles.container, stylesContainer]}>
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

export default InputPressableList;

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: '#F5F5F5',

    borderRadius: 3,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  inputContainer: {
    height: 50,
    marginLeft: 10,
    marginTop: 0,
    fontSize: 14,
    color: '#000',
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
