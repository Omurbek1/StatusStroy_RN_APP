import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const SliderImages = ({images}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageChange = index => {
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => handleImageChange(index)}>
            <Image
              source={{uri: image}}
              style={[
                styles.sliderImage,
                index === activeIndex ? styles.selectedImage : null,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');
const sliderWidth = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    height: 200,
    width: sliderWidth,
    marginBottom: 20,
  },
  sliderImage: {
    width: sliderWidth,
    height: 200,
    borderRadius: 8,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
});

export default SliderImages;
