import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initDB, insertDB } from './Database';
import LoginRegister from './LoginRegister';
import HomePage from './HomePage';
import PreparedPackageDetails from './PreparedPackageDetails';
import RegionalPackageDetails from './RegionalPackageDetails';
import CustomPackage from './CustomPackage';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const setupDatabase = async () => {
      await initDB(); // Datenbank initialisieren
      await insertDB(); // Beispiel-Daten einfügen
    };
    setupDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginRegister">
        <Stack.Screen name="LoginRegister" component={LoginRegister} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="PreparedPackageDetails" component={PreparedPackageDetails} />
        <Stack.Screen name="RegionalPackageDetails" component={RegionalPackageDetails} />
        <Stack.Screen name="CustomPackage" component={CustomPackage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
