import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { registerUser } from "./Database"; // Importiere Funktionen aus der Datenbank

const Register = ({ navigation }) => {
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleRegister = async () => {
    if (regUsername && regEmail && regPassword) {
      const result = await registerUser(regUsername, regEmail, regPassword);
      if (result.success) {
        Alert.alert("Erfolg", "Registrierung erfolgreich!");
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
        // keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Passwort"
        value={regPassword}
        onChangeText={setRegPassword}
        secureTextEntry
      />
      <Button title="Registrieren" onPress={handleRegister} />
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

export default Register;
