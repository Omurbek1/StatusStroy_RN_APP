import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

interface IProps {
  route?: any;
  stylesContainer?: StyleProp<ViewStyle>;
  noBorder?: boolean;
}

function GoBack(props: IProps) {
  const {noBorder, stylesContainer} = props;
  const navigation = useNavigation();
  return (
    <View style={[styles.container, stylesContainer]}>
      <TouchableOpacity
        style={[
          styles.backArrow,
          {
            borderBottomColor: noBorder ? 'transparent' : '#E0E0E0',
          },
        ]}
        onPress={() => navigation.goBack()}>
        {/* <Backicon height={400} width={400} /> */}
        <AntdesignIcon name="left" size={25} color="#000" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  backArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    width: 45,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 13,
    borderBottomColor: '#E0E0E0',
    borderRadius: 10,
  },
  icon: {
    marginLeft: -5,
  },
});

export default GoBack;
