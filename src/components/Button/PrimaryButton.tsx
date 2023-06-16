import React, {FC} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  TextStyle,
} from 'react-native';

interface IProps extends TouchableOpacityProps {
  title: string;
  textStyle?: TextStyle;
  onPress?: () => void;
}

const PrimaryButton: FC<IProps> = props => {
  const {
    title = '',
    disabled = false,
    style = null,
    textStyle = null,
    onPress,
  } = props;

  const colorStyle = {
    backgroundColor: disabled ? '#fff' : '#000',
  };

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      onPress={onPress}
      style={
        !disabled ? [styles.container, colorStyle, style] : styles.disabledBtn
      }>
      <Text
        style={[styles.title, textStyle]}
        numberOfLines={1}
        ellipsizeMode="middle">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
  },
  disabledBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
});

export default PrimaryButton;
