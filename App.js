import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { initDB, insertDB } from "./Database";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./HomePage";
import PreparedPackageDetails from "./PreparedPackageDetails";
import RegionalPackageDetails from "./RegionalPackageDetails";
import CustomPackage from "./CustomPackage";
import { PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDB(); // Datenbank initialisieren
        console.log("Datenbank initialisiert");
        await insertDB(); // Beispiel-Daten einfügen
        console.log("Daten wurden eingefügt");
      } catch (error) {
        console.log("Fehler beim Setup der DB: ", error);
      }
    };

    setupDatabase();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen
            name="PreparedPackageDetails"
            component={PreparedPackageDetails}
          />
          <Stack.Screen
            name="RegionalPackageDetails"
            component={RegionalPackageDetails}
          />
          <Stack.Screen name="CustomPackage" component={CustomPackage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
