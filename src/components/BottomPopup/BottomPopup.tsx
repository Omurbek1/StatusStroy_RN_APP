import {
  Modal,
  StyleSheet,
  Animated,
  PanResponder,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useRef} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IModal {
  modalVisible: boolean;
  closeModal: () => void;
}
const BottomPopup = ({modalVisible, closeModal}: IModal) => {
  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          closeModal();
        } else {
          Animated.spring(panY, {toValue: 0, useNativeDriver: true}).start();
        }
      },
    }),
  ).current;

  const translateY = panY.interpolate({
    inputRange: [-300, 0],
    outputRange: [-300, 0],
    extrapolate: 'clamp',
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <Animated.View
          style={[styles.bottomSheet, {transform: [{translateY}]}]}
          {...panResponder.panHandlers}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <View>
              <AntDesign name="close" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Сортировка</Text>
          <Text style={styles.title}>Сортировка</Text>

          <Text style={styles.title}>Сортировка</Text>

          <Text style={styles.title}>Сортировка</Text>
          <Text style={styles.title}>Сортировка</Text>

          {/* <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity> */}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomPopup;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    top: -15,
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {},
});
