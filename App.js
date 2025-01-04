import React, { useEffect, useState } from "react";
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
import Navbar from "./Navbar";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // Login- und Logout-Funktionen
  const handleLoginSuccess = () => setIsLoggedIn(true); // Wenn der Benutzer erfolgreich eingeloggt ist
  const handleLogout = () => setIsLoggedIn(false); // Logout Funktion

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          {/* Übergabe von handleLoginSuccess als Prop an Login */}
          <Stack.Screen name="Login">
            {(props) => (
              <Login {...props} onLoginSuccess={handleLoginSuccess} />
            )}
          </Stack.Screen>
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

        {/* Navbar bekommt den isLoggedIn-Status und die Logout-Funktion */}
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </NavigationContainer>
    </PaperProvider>
  );
}
