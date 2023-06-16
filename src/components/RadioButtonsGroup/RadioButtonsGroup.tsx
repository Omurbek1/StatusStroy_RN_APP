import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ViewStyle,
  ScrollViewProps,
  Text,
  TextStyle,
  Image,
} from 'react-native';

export interface RadioGroupProps {
  options: Array<OptionsType>;
  activeButton: string;
  onChange: Function;
  containerOptions?: ScrollViewProps;
  buttonStyle?: ViewStyle;
  labelStyle?: TextStyle;
  radioSize?: number;
}

export type OptionsType = {
  value: string;
  src?: any;
};
export interface RadioButtonProps {
  label: string;
  onChange: Function;
  buttonStyle?: ViewStyle;
  activeButton: string;
  labelStyle?: TextStyle;
  radioSize?: number;
  src?: any;
}

const RadioGroup: React.FC<RadioGroupProps> = props => {
  return (
    <View {...props.containerOptions}>
      {props.options.map(data => {
        return (
          <RadioButton
            label={data.value}
            activeButton={props.activeButton}
            buttonStyle={props.buttonStyle}
            onChange={props.onChange}
            radioSize={props.radioSize}
            src={data?.src}
          />
        );
      })}
    </View>
  );
};

const RadioButton: React.FC<RadioButtonProps> = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.onChange(props.label)}
      style={[props.buttonStyle, styles.buttonStyle]}>
      <View style={styles.descriptionBlock}>
        {props.src && <Image style={styles.payImages} source={props.src} />}
        <Text style={styles.labelText}>{props.label}</Text>
      </View>
      <View
        style={[
          styles.radio,
          props.radioSize
            ? {
                width: props.radioSize,
                height: props.radioSize,
                borderRadius: props.radioSize,
              }
            : null,
        ]}>
        {props.activeButton === props.label ? (
          <View
            style={[
              styles.fill,
              props.radioSize
                ? {
                    width: props.radioSize / 1.6,
                    height: props.radioSize / 1.6,
                    borderRadius: props.radioSize,
                  }
                : null,
            ]}>
            <Image
              style={styles.activeRadio}
              source={require('../../assets/activeRadio.png')}
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  descriptionBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payImages: {
    width: 24,
    height: 16,
    resizeMode: 'contain',
    marginRight: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    backgroundColor: '#F1BD40',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },
  activeRadio: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    zIndex: 10,
    elevation: 10,
  },
});

export default RadioGroup;
