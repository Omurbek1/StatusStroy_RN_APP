import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../components/Button/PrimaryButton';
// import {Image} from 'react-native-svg';
const Success = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/login/success.png')} />
        <Text style={styles.text}>
          Поздравляем, вы успешно прошли регистрацию!
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Готово"
          onPress={() => navigation.navigate('Home' as never)}
        />
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    marginTop: 50,
    marginBottom: 30,
  },
  footer: {
    marginTop: 70,
    margin: 10,
  },
});
