import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import UploadScreen from '../screens/UploadScreen';
import PreviewScreen from '../screens/PreviewScreen';
import WardrobeTabs from '../screens/Wardrobe/WardrobeTabs';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="UploadScreen" component={UploadScreen} />
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
      <Stack.Screen name="Wardrobe" component={WardrobeTabs} />
    </Stack.Navigator>
  );
  
  export default AppNavigator;