import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomSelectPicker from '../CustomSelectPicker/CustomSelectPicker';

const PointOfIssue = () => {
  const [chooseData, setChooseData] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.pointOfIssueBlock}>
      <CustomSelectPicker
        visible={visible}
        setVisible={setVisible}
        options={[
          'Москва',
          'Санкт-Петербург',
          'Краснодар',
          'Владивосток',
          'Минск',
          'Москва',
          'Санкт-Петербург',
          'Краснодар',
          'Владивосток',
          'Минск',
          'Москва',
          'Санкт-Петербург',
          'Краснодар',
          'Владивосток',
          'Минск',
        ]}
        chooseData={chooseData}
        setChooseData={setChooseData}
      />
      <View style={styles.orderDetailsHeader}>
        <Text style={styles.headerTextRadio}>Пункт для выдачи</Text>
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeBtnText} onPress={() => setVisible(true)}>
            Выбрать
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.PickupContainer}>
        <View style={styles.PickupContainer1}>
          <Text style={styles.PickupContainerText1}>{chooseData}</Text>
          <Text>Ежедневно, с 9:00 до 22:00 </Text>
        </View>
        <View style={styles.PickupContainer2}>
          <Text>24 марта, с 12;00 </Text>
          <Text style={styles.quantityProducts}>5 товаров</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pointOfIssueBlock: {
    marginBottom: 30,
  },
  orderDetailsBlock: {
    marginBottom: 30,
  },
  orderDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextRadio: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  PickupContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
  },
  PickupContainer1: {
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  PickupContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changeBtn: {},
  changeBtnText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#F1BD40',
  },
  PickupContainerText1: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  quantityProducts: {
    marginLeft: 90,
    paddingLeft: 20,
    fontSize: 12,
    color: '#5F5F5F',
  },
});

export default PointOfIssue;
