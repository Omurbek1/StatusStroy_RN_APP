import React, {FC} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';
import RadioButtonGroup from '../RadioButtonsGroup/RadioButtonsGroup';

interface DeliveryMethodProps {
  activeBtn: string;
  handleChange: any;
}

const DeliveryMethod: FC<DeliveryMethodProps> = ({activeBtn, handleChange}) => {
  return (
    <View style={styles.deliveryBlock}>
      <Text style={styles.headerTextRadio}>Способ доставки</Text>
      <RadioButtonGroup
        activeButton={activeBtn}
        options={[{value: 'Самовывоз'}, {value: 'Транспортная компания'}]}
        onChange={handleChange}
        buttonStyle={styles.radioBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deliveryBlock: {
    marginBottom: 30,
  },
  headerTextRadio: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  radioBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 46,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default DeliveryMethod;
