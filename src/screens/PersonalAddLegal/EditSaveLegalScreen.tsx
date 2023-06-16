import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import GoBack from '../../components/GoBack';
import InputNotIcon from '../../components/Input/InputNotIcon';
import PrimaryButton from '../../components/Button/PrimaryButton';
import NumberStringInput from '../../components/Input/NumberStringInput';
import axios from 'axios';
import {BASE_URL_API} from '../../api/ProductsAPi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {useToast} from 'react-native-toast-notifications';
const EditSaveLegalScreen = ({route}: any) => {
  const {LegalDetailId} = route.params;

  console.log(LegalDetailId, 'legalDetail');
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [appList, setAppList] = useState([]);
  const navigation = useNavigation();
  const toast = useToast();

  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      axios
        .get(
          BASE_URL_API + `/legal-entities?filters%5Bid%5D=${LegalDetailId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(res => {
          const {data} = res.data;
          setAppList(data[0]?.attributes);
          setFullName(data[0]?.attributes?.fullName);
          setLegalAddress(data[0]?.attributes?.legalAddress);
          setRealAddress(data[0]?.attributes?.realAddress);
          setCode(data[0]?.attributes?.code);
          setApp(data[0]?.attributes?.app);
          setOgre(data[0]?.attributes?.ogre);
          setCheckingAccount(data[0]?.attributes?.checkingAccount);
          setBankBIC(data[0]?.attributes?.bankBIC);
          setCorrespondentAccount(data[0]?.attributes?.correspondentAccount);
          setBankName(data[0]?.attributes?.bankName);
          console.log(data[0]?.attributes, 'data s');
        });
    } catch (e) {
      console.log(e, 'error');
    }
  }, [LegalDetailId]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(LegalDetailId, 'LegalDetail');
  const handleEdit = () => {
    setIsEditing(true);
  };

  const deleteVisibleModal = () => {
    setVisible(true);
  };
  const deleteData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.delete(
          `${BASE_URL_API}/legal-entities/${LegalDetailId}`,
          {
            headers: {
              withCredentials: true,
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 200) {
          navigation.navigate('personalLegal' as never);
          toast.show('Юридическое лицо успешно удалено', {
            type: 'normal',
            placement: 'top',
            duration: 1000,
            animationType: 'slide-in',
          });
          // console.log(response, 'r');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // edit data

  const editData = async () => {
    setIsEditing(true);
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.put(
          `${BASE_URL_API}/legal-entities/${LegalDetailId}`,
          {
            data: {
              fullName,
              legalAddress,
              realAddress,
              code,
              app,
              ogre,
              checkingAccount,
              bankBIC,
              correspondentAccount,
              bankName,
            },
          },
          {
            headers: {
              withCredentials: true,
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 200) {
          navigation.navigate('personalLegal' as never);
          toast.show('Юридическое лицо успешно отредактировано', {
            type: 'normal',
            textStyle: {
              textAlign: 'center',
            },
            placement: 'top',
            duration: 1000,
            animationType: 'slide-in',
          });
          console.log(response, 'r');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(appList, 'appList');
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.goback}>
          <GoBack />
        </View>
        <View style={styles.delete}>
          <TouchableOpacity onPress={deleteVisibleModal}>
            <Feather name="trash-2" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Создание {'\n'}юридического лица </Text>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Название огранизации</Text>
        <InputNotIcon
          value={fullName}
          onChange={e => setFullName(e)}
          placeholder="Название огранизации"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Юридический адрес</Text>
        <InputNotIcon
          value={legalAddress}
          onChange={e => setLegalAddress(e)}
          placeholder="Юридический адрес"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Фактический адрес</Text>
        <InputNotIcon
          value={realAddress}
          onChange={e => setRealAddress(e)}
          placeholder="Фактический адрес"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>ИНН</Text>
        <NumberStringInput
          value={code}
          onChange={e => setCode(e)}
          placeholder="ИНН"
        />
      </View>
      {appList?.app === null ? null : (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>КПП</Text>
            <NumberStringInput
              value={app}
              onChange={e => setApp(e)}
              placeholder="КПП"
            />
          </View>
        </>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.headerText}>ОГРН</Text>
        <NumberStringInput
          value={ogre}
          onChange={e => setOgre(e)}
          placeholder="ОГРН"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Расчетный счет</Text>
        <NumberStringInput
          value={checkingAccount}
          onChange={e => setCheckingAccount(e)}
          placeholder="Расчетный счет"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>БИК банка</Text>
        <NumberStringInput
          value={bankBIC}
          onChange={e => setBankBIC(e)}
          placeholder="БИК банка"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Кор. счет</Text>
        <NumberStringInput
          value={correspondentAccount}
          onChange={e => setCheckingAccount(e)}
          placeholder="Кор. счет"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Наименование банка</Text>
        <InputNotIcon
          value={bankName}
          onChange={e => setBankName(e)}
          placeholder="Наименование банка"
        />
      </View>
      {isEditing ? (
        <PrimaryButton
          title="Сохранить"
          style={styles.button}
          onPress={editData}
        />
      ) : (
        <PrimaryButton
          title="Редактировать"
          style={styles.button}
          onPress={handleEdit}
        />
      )}
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Вы точно хотите удалить юридическое лицо?
            </Text>

            <TouchableOpacity onPress={deleteData}>
              <Text style={styles.modalButtonDelete}>
                Удалить юридическое лицо
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent2}>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={() => setVisible(false)}>
              <Text style={styles.modalButtonCancel}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    top: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginLeft: 15,
    marginBottom: 10,
  },
  goback: {
    marginBottom: 30,
    left: -10,
  },
  delete: {
    position: 'absolute',
    right: 10,
    marginTop: 10,
  },
  textContainer: {
    marginTop: 5,
  },
  headerText: {
    marginLeft: 10,
  },
  button: {
    marginBottom: 30,
  },
  errorText: {
    color: 'red',
    marginBottom: 50,
    textAlign: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 450,
  },

  modalText: {
    fontSize: 14,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    borderBottomColor: '#F5F5F5',
    color: '#000',
    borderBottomWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonDelete: {
    color: 'red',
    fontSize: 18,
    borderRadius: 5,
    marginVertical: 5,
  },
  modalButtonCancel: {
    paddingLeft: 55,
    paddingRight: 55,
    height: 60,
    top: -23,
    marginTop: 30,
    color: '#3362AB',
    fontSize: 18,
  },
  modalContent2: {
    backgroundColor: 'white',
    paddingLeft: 28,
    paddingRight: 28,
    marginTop: 20,
    borderRadius: 14,
    alignItems: 'center',
    height: 50,
  },
});
export default EditSaveLegalScreen;
