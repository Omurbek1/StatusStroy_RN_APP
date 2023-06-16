import {AsyncStorage, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {BASE_URL_API} from '../../api/ProductsAPi';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import InputNotIcon from '../../components/Input/InputNotIcon';
import PrimaryButton from '../../components/Button/PrimaryButton';
import NumberStringInput from '../../components/Input/NumberStringInput';
import GoBack from '../../components/GoBack';
import {useNavigation} from '@react-navigation/native';

const CreateAddIndividualScreen = () => {
  const [fullName, setFullName] = useState('');
  const [legalAddress, setLegalAddress] = useState('');
  const [realAddress, setRealAddress] = useState('');
  const [code, setCode] = useState('');
  const [app, setApp] = useState('');
  const [ogre, setOgre] = useState('');
  const [checkingAccount, setCheckingAccount] = useState('');
  const [bankBIC, setBankBIC] = useState('');
  const [correspondentAccount, setCorrespondentAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const navigation = useNavigation();
  const toast = useToast();
  const handleSubmit = async () => {
    setIsButtonClicked(true);

    if (
      !fullName ||
      !legalAddress ||
      !realAddress ||
      !code ||
      !app ||
      !ogre ||
      !checkingAccount ||
      !bankBIC ||
      !correspondentAccount ||
      !bankName
    ) {
      toast.show('Заполните все поля', {
        type: 'normal',
        placement: 'top',
        duration: 1000,
      });
      setErrorMessage('Заполните все поля');
      setIsButtonClicked(false);
      return;
    } else {
      setErrorMessage('');
    }
    const token = await AsyncStorage.getItem('token');
    if (token) {
      console.log(token);
      try {
        const response = await axios({
          url: `${BASE_URL_API}/legal-entities`,
          method: 'POST',
          data: {
            data: {
              code: code,
              fullName: fullName,
              legalAddress: legalAddress,
              realAddress: realAddress,
              ogre: ogre,
              checkingAccount: checkingAccount,
              bankBIC: bankBIC,
              correspondentAccount: correspondentAccount,
              bankName: bankName,
            },
          },

          headers: {
            withCredentials: true,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setErrorMessage('');
        if (response.status === 200) {
          navigation.navigate('personalLegal' as never);
          toast.show('Лицевой счет успешно создан ', {
            type: 'normal',
            placement: 'top',
            duration: 1000,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container}>
      <View style={styles.goback}>
        <GoBack />
      </View>
      <Text style={styles.title}>Создание {'\n'}юридического лица </Text>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Название огранизации</Text>
        <InputNotIcon
          value={fullName}
          onChange={setFullName}
          placeholder="Название огранизации"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Юридический адрес</Text>
        <InputNotIcon
          value={legalAddress}
          onChange={setLegalAddress}
          placeholder="Юридический адрес"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Фактический адрес</Text>
        <InputNotIcon
          value={realAddress}
          onChange={setRealAddress}
          placeholder="Фактический адрес"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>ИНН</Text>
        <NumberStringInput value={code} onChange={setCode} placeholder="ИНН" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>КПП</Text>
        <NumberStringInput value={app} onChange={setApp} placeholder="КПП" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>ОГРН</Text>
        <NumberStringInput value={ogre} onChange={setOgre} placeholder="ОГРН" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Расчетный счет</Text>
        <NumberStringInput
          value={checkingAccount}
          onChange={setCheckingAccount}
          placeholder="Расчетный счет"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>БИК банка</Text>
        <NumberStringInput
          value={bankBIC}
          onChange={setBankBIC}
          placeholder="БИК банка"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Кор. счет</Text>
        <NumberStringInput
          value={correspondentAccount}
          onChange={setCorrespondentAccount}
          placeholder="Кор. счет"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Наименование банка</Text>
        <InputNotIcon
          value={bankName}
          onChange={setBankName}
          placeholder="Наименование банка"
        />
      </View>
      <PrimaryButton
        disabled={isButtonClicked}
        title={isButtonClicked ? '"Создать"' : 'Создать'}
        style={styles.button}
        onPress={() => handleSubmit()}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </ScrollView>
  );
};

export default CreateAddIndividualScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginLeft: 15,
    marginBottom: 10,
  },
  goback: {
    top: 10,
    marginBottom: 30,
    left: -10,
  },
  textContainer: {
    marginTop: 5,
  },
  headerText: {
    marginLeft: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
  },

  errorText: {
    color: 'red',
    marginBottom: 50,
    textAlign: 'center',
    alignItems: 'center',
  },
});
