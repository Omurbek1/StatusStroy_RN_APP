import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

import GoBack from '../../components/GoBack';
import PhoneInput from 'react-native-phone-number-input';
import PrimaryButton from '../../components/Button/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
const PhoneInputNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.headerContainer}>
        <GoBack />
      </View>

      <Text style={styles.title}>Регистрация</Text>

      <Text style={styles.content}>
        Для регистрации введите {'\n'}ваш номер телефона, пожалуйста
      </Text>
      <View style={styles.contentPhoneNumber}>
        <PhoneInput
          value={phoneNumber}
          onChangeFormattedText={text => {
            setPhoneNumber(text);
          }}
          placeholder="665 -145 -1345"
          textContainerStyle={styles.textContainerStyle}
          containerStyle={styles.containerPhoneInput}
          textInputStyle={styles.textInputStyle}
          // codeTextStyle={styles.textInputStyle}
          defaultValue="RU"
          defaultCode="RU"
        />
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          title="Получить код"
          onPress={() => navigation.navigate('otpcodes', {phoneNumber})}
        />
      </View>
      <Text style={styles.underbuttontext}>
        Регистрируясь, вы подтверждаете своё согласие с условиями
        <Text style={styles.agreement}> «Пользовательского соглашения»</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    // fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: 300,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
    marginTop: 40,
    marginLeft: 20,
  },
  containerPhoneInput: {
    height: 50,

    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  textContainerStyle: {
    height: 55,

    padding: 10,
    left: -10,

    backgroundColor: 'transparent',
  },
  textInputStyle: {
    height: 60,
    width: 300,
  },
  underbuttontext: {
    textAlign: 'center',

    marginTop: 20,

    fontSize: 14,
  },
  content: {
    // fontFamily: Fonts.POPPINS_MEDIUM,
    margin: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: '400',
  },
  contentPhoneNumber: {
    marginHorizontal: 20,
    paddingRight: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  footer: {
    margin: 10,
    marginTop: 30,
  },
  agreement: {
    color: '#F1BD40',
  },
});

export default PhoneInputNumber;
