import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Accordion = ({title, content}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 0}}>
          <Text style={{fontWeight: '400', color: '#000'}}>{title}</Text>
          <Text style={{fontWeight: 'bold', position: 'absolute', right: 0}}>
            {expanded ? (
              <Feather name="chevron-up" size={20} color="#808080" />
            ) : (
              <Feather name="chevron-right" size={20} color="#808080" />
            )}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {expanded && <View style={{paddingHorizontal: 10}}>{content}</View>}
    </View>
  );
};

export default Accordion;
