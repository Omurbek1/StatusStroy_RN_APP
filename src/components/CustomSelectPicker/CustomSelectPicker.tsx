import React, {FC} from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface CustomSelectPickerProps {
  visible: boolean;
  options: string[];
  chooseData: string;
  setChooseData: (data: string) => void;
  setVisible: (visible: boolean) => void;
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const CustomSelectPicker: FC<CustomSelectPickerProps> = ({
  visible,
  options,
  chooseData,
  setChooseData,
  setVisible,
}) => {
  const changeModalVisibility = (bool: boolean) => {
    setVisible(bool);
  };

  const onPressItem = (item: string) => {
    setChooseData(item);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={visible}
        onRequestClose={() => changeModalVisibility(false)}>
        <TouchableOpacity
          onPress={() => changeModalVisibility(false)}
          style={styles.modalContainer}>
          <View
            style={[styles.modal, {width: WIDTH - 40, maxHeight: HEIGHT / 2}]}>
            <ScrollView>
              {options?.map((opt, ind) => {
                return (
                  <TouchableOpacity
                    style={styles.option}
                    key={ind}
                    onPress={() => onPressItem(opt)}>
                    <Text style={styles.modalText}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableOpacity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 53,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  text: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000004d',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  option: {
    height: 46,
    justifyContent: 'center',
  },
  modalText: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 23,
  },
});

export default CustomSelectPicker;
