import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import React from 'react';

export default function NoProducts() {
  const handleSendMessage = () => {
    Linking.openURL('https://t.me/Mikhail_Pos');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        “Не нашли нужный товар? {'\n'} Есть вопросы по работе с сервисом?”
      </Text>
      <Text style={styles.subtitle}>Напишите менеджеру и он поможет вам!</Text>
      <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
        <Text style={styles.buttonText}>Написать менеджеру </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginTop: 30,
    height: 200,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    color: '#000',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#000000',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginBottom: 1,
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    height: 35,
  },
  buttonText: {
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
});
