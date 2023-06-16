import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Option {
  attributes: {
    fullName: string;
    code: string;
  };
}

interface RadioButtonsProps {
  data: Option[];
  onChange: (value: string) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({data, onChange}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <View>
      {data.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioButton}
          onPress={() => handleOptionChange(option.attributes.fullName)}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.radioButtonLabel}>
                {option.attributes.fullName}
              </Text>
              <View
                style={[
                  styles.radioButtonInner,
                  selectedOption === option.attributes.fullName &&
                    styles.radioButtonSelected,
                ]}>
                {selectedOption === option.attributes.fullName && (
                  <MaterialIcons name="check" size={15} color="#FFF" />
                )}
              </View>
            </View>

            <Text style={styles.radioButtonCode}>
              ИНН: {option.attributes.code}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {},
  container: {
    borderColor: '#BDBDBD',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
  },
  radioButtonInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    position: 'absolute',
    right: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#F1BD40',
  },
  radioButtonLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  radioButtonCode: {
    fontSize: 12,
  },
});

export default RadioButtons;
