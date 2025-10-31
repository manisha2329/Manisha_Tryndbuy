import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import IMAGES from '../constants/images';
import { useNavigation } from '@react-navigation/native';

const PreviewScreen = () => {
  const navigation = useNavigation()

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 1) {
          clearInterval(timer);
          setTimeout(() => navigation.replace("Wardrobe", { screen: "WardrobeHome" }), 2000);
        }
        return Math.min(p + 0.1, 1);
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.check}>
        <Image source={IMAGES.sucess} style={styles.checkimg} />
      </View>
      <Text style={styles.text}>Selfie captured perfectly!</Text>
      <Text style={styles.text}>Let's build your own fashion avatar</Text>
      <Progress.Bar
        progress={progress}
        width={300}
        color={'#0A0A0A'}
        unfilledColor="#D3D3D3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  check: {
    height: 170,
    width: 170,
    borderRadius: 170,
    borderColor: '#74B72E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#0A0A0A',
    fontWeight: 'bold',
  },
  checkimg: {
    height: 150,
    width: 150,
    overflow: 'hidden',
  },
});

export default PreviewScreen;
