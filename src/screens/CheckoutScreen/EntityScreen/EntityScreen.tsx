import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import InputPressableList from '../../../components/Input/InputList';
import SelectDropdown from 'react-native-select-dropdown';
import RadioButtonRN from 'radio-buttons-react-native';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import Icon from 'react-native-vector-icons/Feather';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Radio from '../../../components/Radio/Radio';
import {Button, CheckBox} from 'react-native-elements';
import {Formik, FormikValues} from 'formik';
import {TextInputMask} from 'react-native-masked-text';
import DeliveryMethod from '../../../components/DeliveryMethod/DeliveryMethod';
import PointOfIssue from '../../../components/PointOfIssue/PointOfIssue';
import OrderDetails from '../../../components/OrderDetails/OrderDetails';
import PaymentMethod from '../../../components/PaymentMethod/PaymentMethod';
import * as yup from 'yup';
import OrderingOptions from '../../../components/OrderingOptions/OrderingOptions';
const data = [
  {
    label: 'Самовывоз',
    icon: <Icon name="check-circle" size={25} color="#2c9dd1" />,
  },
  {
    label: 'Транспортная компания',
  },
];
const paymatData = [
  {
    label: 'Онлайн оплата картой',
  },
  {
    label: 'Оплата наличными при получении',
  },
  {
    label: 'Оплата картой при получении',
  },
];

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
export default function EntityScreen() {
  const validationSchema = yup.object().shape({
    companyName: yup.string().required('Поле является обязательным'),
    legalAddress: yup.string().required('Поле является обязательным'),
    address: yup.string().required('Поле является обязательным'),
    INN: yup.string().required('Поле является обязательным'),
    OGRN: yup.string().required('Поле является обязательным'),
    paymentAccount: yup.string().required('Поле является обязательным'),
    BIC: yup.string().required('Поле является обязательным'),
    correspondentAccount: yup.string().required('Поле является обязательным'),
    bankName: yup.string().required('Поле является обязательным'),
    deliveryDate: yup.string().required('Поле является обязательным'),
    deliveryAddress: yup.string().required('Поле является обязательным'),
  });

  const handleSubmitValues = async (values: FormikValues) => {
    console.log('individualValues', values);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            companyName: '',
            legalAddress: '',
            address: '',
            INN: '',
            OGRN: '',
            paymentAccount: '',
            BIC: '',
            correspondentAccount: '',
            bankName: '',
            deliveryMethod: '',
            payMethod: '',
            deliveryDate: '',
            deliveryFloor: '',
            deliveryPorch: '',
            deliveryApartment: '',
            deliveryAddress: '',
          }}
          onSubmit={values => handleSubmitValues(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => {
            return (
              <View style={styles.container}>
                <Text style={styles.headerText}>Данные юридического лица</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="Название организации"
                    style={styles.textInput}
                    onChangeText={handleChange('companyName')}
                    onBlur={handleBlur('companyName')}
                    value={values.companyName}
                  />
                  <View style={styles.line}></View>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="Юр. адрес организации"
                    style={styles.textInput}
                    onChangeText={handleChange('legalAddress')}
                    onBlur={handleBlur('legalAddress')}
                    value={values.legalAddress}
                  />
                  <View style={styles.line}></View>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="Факт. адрес организации"
                    style={styles.textInput}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                  />
                  <View style={styles.line}></View>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="ИНН"
                    style={styles.textInput}
                    onChangeText={handleChange('INN')}
                    onBlur={handleBlur('INN')}
                    value={values.INN}
                  />
                  <View style={styles.line}></View>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="ОГРН"
                    style={styles.textInput}
                    onChangeText={handleChange('OGRN')}
                    onBlur={handleBlur('OGRN')}
                    value={values.OGRN}
                  />
                  <View style={styles.line}></View>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="Расчетный счет"
                    style={styles.textInput}
                    onChangeText={handleChange('paymentAccount')}
                    onBlur={handleBlur('paymentAccount')}
                    value={values.paymentAccount}
                  />
                  <View style={styles.line}></View>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="БИК банка"
                    style={styles.textInput}
                    onChangeText={handleChange('BIC')}
                    onBlur={handleBlur('BIC')}
                    value={values.BIC}
                  />
                  <View style={styles.line}></View>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="Кор. счет"
                    style={styles.textInput}
                    onChangeText={handleChange('correspondentAccount')}
                    onBlur={handleBlur('correspondentAccount')}
                    value={values.correspondentAccount}
                  />
                  <View style={styles.line}></View>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="Наименование банка"
                    style={styles.textInput}
                    onChangeText={handleChange('bankName')}
                    onBlur={handleBlur('bankName')}
                    value={values.bankName}
                  />
                </View>
                <OrderingOptions
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <View style={styles.submitBtn}>
                  <PrimaryButton
                    onPress={handleSubmit}
                    disabled={!isValid}
                    title="Оформить заказ"
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
}
