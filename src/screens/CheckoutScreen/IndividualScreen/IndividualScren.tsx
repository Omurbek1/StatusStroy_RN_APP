import {ScrollView, Text, TextInput, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import {Formik, FormikValues} from 'formik';
import * as yup from 'yup';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import {TextInputMask} from 'react-native-masked-text';
import OrderingOptions from '../../../components/OrderingOptions/OrderingOptions';

const IndividualScren = () => {
  const validationSchema = yup.object().shape({
    phone: yup.string().required('Поле является обязательным'),
    name: yup.string().required('Поле является обязательным'),
    email: yup.string().required('Поле является обязательным'),
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
            phone: '',
            name: '',
            email: '',
            deliveryAddress: '',
            deliveryMethod: '',
            payMethod: '',
            deliveryDate: '',
            deliveryFloor: '',
            deliveryPorch: '',
            deliveryApartment: '',
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
                <Text style={styles.headerText}>Личные данные </Text>
                <View style={styles.inputContainer}>
                  <TextInputMask
                    type="custom"
                    options={{
                      mask: '+ 7 (999) 999-99-99',
                    }}
                    placeholder="Введите номер телефона"
                    placeholderTextColor="#808080"
                    style={styles.textInput}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType="numbers-and-punctuation"
                  />
                  <View style={styles.line}></View>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="Введите имя получателя"
                    style={styles.textInput}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  <View style={styles.line}></View>
                  <TextInput
                    placeholderTextColor="#808080"
                    placeholder="Введите e-mail получателя"
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
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
};

export default IndividualScren;
