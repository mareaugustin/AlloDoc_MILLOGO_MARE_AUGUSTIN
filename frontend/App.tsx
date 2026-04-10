/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/ecrans/welcome/WelcomeScreen';
import AuthScreen from './src/ecrans/auth/AuthScreen';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { getToken } from './src/services/AuthStorage';
import { getData } from './src/services/DataStorage';
import AdminScreen from './src/ecrans/dashboard/AdminScreen';
import TabsPatient from './src/tabs/TabsPatient';
import TabsMedecin from './src/tabs/TabsMedecin';
import TabsAdmin from './src/tabs/TabsAdmin';

const appStack = createNativeStackNavigator()

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkTokenEtRole = async () => {
      const token = await getToken();
      const role = await getData('role')
      if (token && role === 'patient') {
        setInitialRoute('espace-patient');
      } else if (token && role === 'medecin') {
        setInitialRoute('espace-medecin');
      } else if (token && role === 'admin') {
        setInitialRoute('espace-admin');
      } else {
        setInitialRoute('welcome');
      }
    };
    checkTokenEtRole();
  }, []);

  if (!initialRoute) return null;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <NavigationContainer>
          <appStack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown: false}}>
            <appStack.Screen name='welcome' component={WelcomeScreen} />
            <appStack.Screen name='auth' component={AuthScreen} />
            <appStack.Screen name='espace-patient' component={TabsPatient} />
            <appStack.Screen name='espace-medecin' component={TabsMedecin} />
            <appStack.Screen name='espace-admin' component={TabsAdmin} />
          </appStack.Navigator>
       </NavigationContainer>
        <Toast />
    </SafeAreaProvider>
  );
}

export default App;
