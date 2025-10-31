import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import IMAGES from '../constants/images';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const IntroScreen = () => {
  const navigation = useNavigation()
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const navigateToUpload = () => {
    navigation.navigate('UploadScreen');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container]}>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.intro}
            style={{ width: screenWidth * 0.95, height: screenHeight * 0.68 }}
          />
        </View>
        <View style={styles.description}>
          <Text style={[styles.text, { width: screenWidth * 0.8 }]}>
            Hi, I am your fashion advisor. Let's get you started with creating
            your mix & match fashion avatar
          </Text>
          <TouchableOpacity style={styles.icon} onPress={navigateToUpload}>
            <Image source={IMAGES.rightArrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: 25,
  },
  description: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#5C5C5C',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 20,
    color: '#0A0A0A',
  },
  icon: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  arrow: {
    height: 35,
    width: 35,
  },
});

export default IntroScreen;
