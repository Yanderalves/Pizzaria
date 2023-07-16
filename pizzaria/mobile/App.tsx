import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Routes from './src/routes';

import { NavigationContainer } from '@react-navigation/native';

import colors from './src/colors';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors['dark-700']} barStyle={'light-content'} translucent={false} />
      <Routes />
    </ NavigationContainer>
  );
}





