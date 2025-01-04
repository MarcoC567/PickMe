import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import { insertRegistration } from "./Database"; // Importiere die Registrierung-Funktion aus der Datenbank

const Register = ({ navigation }) => {
  const [username, setRegUsername] = useState("");
  const [email, setRegEmail] = useState("");
  const [password, setRegPassword] = useState("");

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Fehler", "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return; // Stoppt die Registrierung, wenn die E-Mail ungültig ist
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Fehler",
        "Das Passwort muss mindestens 8 Zeichen lang sein, einen Großbuchstaben und ein Sonderzeichen enthalten."
      );
      return; // Stoppt die Registrierung, wenn das Passwort ungültig ist
    }

    if (username && email && password) {
      const result = await insertRegistration(username, email, password);

      if (result.success) {
        Alert.alert("Registrierung erfolgreich!");
        navigation.navigate("Login");
      } else {
        Alert.alert(
          "Fehler",
          result.message || "Registrierung fehlgeschlagen."
        );
      }
    } else {
      Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
      <Card style={{ padding: 20, marginBottom: 150 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Registrieren
        </Text>

        <TextInput
          label="Benutzername"
          value={username}
          onChangeText={setRegUsername}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="E-Mail"
          value={email}
          onChangeText={setRegEmail}
          keyboardType="email-address"
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="Passwort"
          value={password}
          onChangeText={setRegPassword}
          secureTextEntry
          style={{ marginBottom: 20 }}
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          style={{ marginBottom: 10 }}
        >
          Registrieren
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 10, alignSelf: "center" }}
        >
          Bereits ein Konto? Anmelden
        </Button>
      </Card>
    </View>
  );
};

export default Register;
