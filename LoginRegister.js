import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { registerUser, loginUser } from "./Database"; // Importiere Funktionen aus der Datenbank

const LoginRegister = ({ navigation }) => {
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleRegister = async () => {
    if (regUsername && regEmail && regPassword) {
      const result = await registerUser(regUsername, regEmail, regPassword);
      if (result.success) {
        Alert.alert("Erfolg", "Registrierung erfolgreich!");
      } else {
        Alert.alert("Fehler", result.message || "Registrierung fehlgeschlagen.");
      }
    } else {
      Alert.alert("Fehler", "Bitte füllen Sie alle Felder aus.");
    }
  };

  const handleLogin = async () => {
    if (loginEmail && loginPassword) {
      const result = await loginUser(loginEmail, loginPassword);
      if (result.success) {
        Alert.alert("Erfolg", "Login erfolgreich!");
        navigation.navigate("HomePage"); // Navigiert zur HomePage nach erfolgreichem Login
      } else {
        Alert.alert("Fehler", result.message || "Ungültige Anmeldedaten.");
      }
    } else {
      Alert.alert("Fehler", "Bitte geben Sie Ihre Zugangsdaten ein.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login und Registrierung</Text>

      {/* Registrierung */}
      <Text style={styles.sectionHeader}>Registrieren</Text>
      <TextInput
        style={styles.input}
        placeholder="Benutzername"
        value={regUsername}
        onChangeText={setRegUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={regEmail}
        onChangeText={setRegEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Passwort"
        value={regPassword}
        onChangeText={setRegPassword}
        secureTextEntry
      />
      <Button title="Registrieren" onPress={handleRegister} />

      {/* Login */}
      <Text style={styles.sectionHeader}>Anmelden</Text>
      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={loginEmail}
        onChangeText={setLoginEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Passwort"
        value={loginPassword}
        onChangeText={setLoginPassword}
        secureTextEntry
      />
      <Button title="Anmelden" onPress={handleLogin} />

      {/* Debug Button (Optional) */}
      <Button
        title="Debug Users (Datenbank)"
        onPress={() => navigation.navigate("HomePage")}
      />

      {/* Navigation zur HomePage */}
      <View style={styles.navButtonContainer}>
        <Button
          title="Zur HomePage"
          onPress={() => navigation.navigate("HomePage")}
          color="#2196F3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  navButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default LoginRegister;
