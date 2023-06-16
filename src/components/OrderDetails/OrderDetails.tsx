import React, {FC} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

interface OrderDetailsProps {
  dateValue: string;
  handleChangeDateValue: any;
  handleBlurDateValue: any;
  apartmentValue: string;
  handleChangeApartmentValue: any;
  handleBlurApartmentValue: any;
  floorValue: string;
  handleChangeFloorValue: any;
  handleBlurFloorValue: any;
  porchValue: string;
  handleChangePorchValue: any;
  handleBlurPorchValue: any;
  deliveryAddress: string;
  handleChangeDeliveryAddressValue: any;
  handleBlurDeliveryAddressValue: any;
}

const OrderDetails: FC<OrderDetailsProps> = ({
  dateValue,
  handleBlurDateValue,
  handleChangeDateValue,
  handleChangePorchValue,
  porchValue,
  handleBlurApartmentValue,
  apartmentValue,
  handleBlurFloorValue,
  handleChangeApartmentValue,
  handleBlurPorchValue,
  handleChangeFloorValue,
  floorValue,
  deliveryAddress,
  handleChangeDeliveryAddressValue,
  handleBlurDeliveryAddressValue,
}) => {
  return (
    <View style={styles.orderDetailsBlock}>
      <Text style={styles.headerTextRadio}>Детали заказа</Text>
      <View style={styles.orderDetailsContainer}>
        <View style={styles.regionSpanBlock}>
          <Text style={styles.regionSpan}>Кабардино-Балкария</Text>
        </View>
        <View style={styles.dateInputBlock}>
          <Image
            style={styles.dateIcon}
            source={require('../../assets/dateIcon.png')}
          />
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            placeholder="Выберите дату доставки"
            placeholderTextColor="#808080"
            style={styles.textDateInput}
            onChangeText={handleChangeDateValue}
            onBlur={handleBlurDateValue}
            value={dateValue}
          />
        </View>
        <View style={styles.regionSpanBlock}>
          <Image
            style={styles.localIcon}
            source={require('../../assets/localIcon.png')}
          />
          <TextInput
            placeholderTextColor="#808080"
            placeholder="Введите адрес доставки"
            style={styles.textDateInput}
            onChangeText={handleChangeDeliveryAddressValue}
            onBlur={handleBlurDeliveryAddressValue}
            value={deliveryAddress}
          />
        </View>
        <View style={styles.addressDetailsBlock}>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Квартира</Text>
            <TextInput
              placeholderTextColor="#808080"
              placeholder=""
              style={styles.inputText}
              onChangeText={handleChangeApartmentValue}
              onBlur={handleBlurApartmentValue}
              value={apartmentValue}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Этаж</Text>
            <TextInput
              placeholderTextColor="#808080"
              placeholder=""
              style={styles.inputText}
              onChangeText={handleChangeFloorValue}
              onBlur={handleBlurFloorValue}
              value={floorValue}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Подъезд</Text>
            <TextInput
              placeholderTextColor="#808080"
              placeholder=""
              style={styles.inputText}
              onChangeText={handleChangePorchValue}
              onBlur={handleBlurPorchValue}
              value={porchValue}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderDetailsBlock: {
    marginBottom: 30,
  },
  headerTextRadio: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  orderDetailsContainer: {},
  dateInputBlock: {
    height: 47,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  dateIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  regionSpanBlock: {
    height: 47,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  localIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  regionSpan: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
  },
  textDateInput: {
    height: 47,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
  },
  addressDetailsBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBlock: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    width: '30%',
    padding: 8,
  },
  inputLabel: {
    color: '#0000004d',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 5,
  },
  inputText: {
    width: '90%',
    color: '#000000',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 21,
  },
});

export default OrderDetails;
