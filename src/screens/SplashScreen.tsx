import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import IMAGES from '../constants/images';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 1) {
          clearInterval(timer);
          setTimeout(() => navigation.replace('Intro'), 2000);
        }
        return Math.min(p + 0.1, 1);
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={IMAGES.splash}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.progress}>
        <Text style={styles.text}>Loading brands...</Text>
        <Progress.Bar
          progress={progress}
          width={220}
          color={'#0A0A0A'}
          unfilledColor="#D3D3D3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: {
    flex: 0.9,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  progress: {
    alignSelf: 'center',
    flex: 0.1,
    marginTop: -width / 3,
  },
});

export default SplashScreen;
