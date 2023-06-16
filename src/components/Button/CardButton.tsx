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

const CardButton: FC<IProps> = props => {
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
    <>
      <TouchableOpacity
        {...props}
        disabled={disabled}
        onPress={onPress}
        style={[styles.container, colorStyle, style]}>
        <Text
          style={[styles.title, textStyle]}
          numberOfLines={1}
          ellipsizeMode="middle">
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 6,
  },
  title: {
    color: 'white',
    fontSize: 12,
    lineHeight: 21,
    textAlign: 'center',
  },
});

export default CardButton;
