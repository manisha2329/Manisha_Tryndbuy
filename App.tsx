/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigator/AppNavigator';
import { StatusBar } from 'react-native';

function App() {
  return (
    <>
    <StatusBar backgroundColor={"#FFFFFF"} barStyle={"dark-content"}/>
    <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
  </>
  );
}


export default App;
