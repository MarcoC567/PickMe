import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { initDB, insertDB } from "./Database";
import Login from "./Login";
import Register from "./Register";
import HomePage from "./HomePage";
import PreparedPackageDetails from "./PreparedPackageDetails";
import RegionalPackageDetails from "./RegionalPackageDetails";
import OrdersPage from "./Orders";
// import CustomPackage from "./CustomPackage";
import { PaperProvider } from "react-native-paper";
import Navbar from "./Navbar";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Füge den userId-Status hinzu

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDB(); // SQLite Datenbank initialisieren
        console.log("Datenbank initialisiert");
        await insertDB(); // Beispiel-Daten einfügen
        console.log("Daten wurden eingefügt");
      } catch (error) {
        console.log("Fehler beim Setup der DB: ", error);
      }
    };

    setupDatabase();
  }, []);

  // Loginfunktion
  const handleLoginSuccess = (userId) => {
    setIsLoggedIn(true); // Erfolgreich einloggen
    setUserId(userId); // Speichere die userId
  };
  //Logoutfunktion
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null); // Wenn ausgeloggt, userId zurücksetzen
  };
  //Navigation durch die Seiten
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="Login" options={{ title: "" }}>
            {(props) => (
              <Login {...props} onLoginSuccess={handleLoginSuccess} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="PreparedPackageDetails"
            component={PreparedPackageDetails}
            options={{ title: "Vorgefertigte Pakete" }}
          />
          <Stack.Screen
            name="RegionalPackageDetails"
            component={RegionalPackageDetails}
            options={{ title: "Regionale Pakete" }}
          />
          {/* <Stack.Screen name="CustomPackage" component={CustomPackage} /> */}

          <Stack.Screen name="Orders" options={{ title: "" }}>
            {(props) => (
              <OrdersPage {...props} userId={userId} options={{ title: "" }} />
            )}
          </Stack.Screen>
        </Stack.Navigator>

        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </NavigationContainer>
    </PaperProvider>
  );
}
