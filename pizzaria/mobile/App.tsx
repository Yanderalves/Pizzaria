import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Routes from './src/routes';

import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors['dark-700']} barStyle={'light-content'} translucent={false} />
      <Routes />
    </ NavigationContainer>
  );
}

const colors = {
  'white': '#fff',
  'black': '#000',
  'dark-900': '#101026',
  'dark-700': '#1d1d2e',
  'gray-100': '#8a8a8a',
  'green-900': '#3fffa3',
  'red-900': '#ff3f4b'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



