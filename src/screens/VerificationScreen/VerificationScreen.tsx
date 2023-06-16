import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import GoBack from '../../components/GoBack';
import PrimaryButton from '../../components/Button/PrimaryButton';

const VerificationScreen = ({
  route: {
    params: {countryCode, phoneNumber},
  },
}) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <GoBack />
      </View>
      <Text style={styles.title}>Введите код</Text>
      <Text style={styles.content}>
        Мы отправили SMS с кодом для номер {phoneNumber}, введите его,
        пожалуйста
      </Text>

      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({...otp, 1: text});
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({...otp, 2: text});
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({...otp, 3: text});
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({...otp, 4: text});
              !text && thirdInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({...otp, 4: text});
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
      <View style={styles.underLinetext}>
        <Text>Неверный код</Text>
        <Text>Отправить код повторно 00:20</Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Подтвердить"
          onPress={() => navigation.navigate('register' as never)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {marginTop: 50},
  headerTitle: {
    fontSize: 20,
    // fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: 400,
    textAlign: 'center',
  },
  title: {
    // fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,

    marginHorizontal: 20,
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  content: {
    // fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 16,
    width: 300,
    fontWeight: '400',
    color: 'rgba(0,0,0,0.7)',
  },
  phoneNumberText: {
    fontSize: 18,
    // fontFamily: Fonts.POPPINS_REGULAR,
    lineHeight: 18 * 1.4,
    color: '#000',
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    // borderColor: Colors.DEFAULT_GREEN,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    // color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  footer: {
    margin: 10,
  },

  underLinetext: {
    alignItems: 'center',
  },
});

export default VerificationScreen;
