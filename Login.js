import React from "react";
import { View, Alert } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import { checkLoginCredentials } from "../PickMe/Database";

const Login = ({ navigation, onLoginSuccess }) => {
  // onLoginSuccess wird hier als Prop erwartet
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  const handleLogin = async () => {
    if (loginEmail && loginPassword) {
      try {
        // Überprüfe die Login-Daten mit der checkLoginCredentials-Funktion
        const user = await checkLoginCredentials(loginEmail, loginPassword);

        if (user) {
          // Falls Login erfolgreich ist, rufe onLoginSuccess auf
          Alert.alert("Erfolg", "Login erfolgreich!");
          onLoginSuccess(); // Wir rufen die onLoginSuccess-Funktion auf, um den globalen Zustand zu ändern
          navigation.navigate("HomePage"); // Weiter zur Startseite nach dem Login
        } else {
          // Falls Login fehlschlägt, zeige eine Fehlermeldung
          Alert.alert("Fehler", "Ungültige E-Mail oder Passwort.");
        }
      } catch (error) {
        // Falls ein Fehler auftritt, zeige eine generelle Fehlermeldung
        Alert.alert(
          "Fehler",
          error.message || "Es gab ein Problem bei der Anmeldung."
        );
      }
    } else {
      // Wenn eines der Felder leer ist, zeige eine Fehlermeldung
      Alert.alert("Fehler", "Bitte geben Sie Ihre Zugangsdaten ein.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Card style={{ padding: 20, marginBottom: 150 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Login
        </Text>

        <TextInput
          label="E-Mail"
          value={loginEmail}
          onChangeText={setLoginEmail}
          keyboardType="email-address"
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="Passwort"
          value={loginPassword}
          onChangeText={setLoginPassword}
          secureTextEntry
          style={{ marginBottom: 20 }}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={{ marginBottom: 10 }}
        >
          Anmelden
        </Button>

        <Button mode="text" onPress={() => navigation.navigate("Register")}>
          Zur Registrierung
        </Button>
      </Card>
    </View>
  );
};

export default Login;
