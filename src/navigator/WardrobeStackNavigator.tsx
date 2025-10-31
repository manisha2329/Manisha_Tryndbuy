import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WardrobeHome from '../screens/Wardrobe/WardrobeHome';
import WardrobeDetail from '../screens/Wardrobe/WardrobeDetail';

const Stack = createNativeStackNavigator();

const WardrobeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WardrobeHome" component={WardrobeHome} />
      <Stack.Screen name="WardrobeDetail" component={WardrobeDetail} />
    </Stack.Navigator>
  );
};

export default WardrobeStackNavigator;
