import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RadioButtonGroup from '../RadioButtonsGroup/RadioButtonsGroup';

interface PaymentMethodProps {
  value: string;
  handleChange: any;
}

const PaymentMethod: FC<PaymentMethodProps> = ({value, handleChange}) => {
  return (
    <View style={styles.paymentBlock}>
      <Text style={styles.headerTextRadio}>Способ оплаты</Text>
      <RadioButtonGroup
        activeButton={value}
        options={[
          {
            value: 'Онлайн оплата картой',
            src: require('../../assets/cardPay.png'),
          },
          {
            value: 'Оплата наличными при получении',
            src: require('../../assets/cashPay.png'),
          },
          {
            value: 'Оплата картой при получении',
            src: require('../../assets/receivePay.png'),
          },
        ]}
        onChange={handleChange}
        buttonStyle={styles.radioBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paymentBlock: {
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

export default PaymentMethod;
