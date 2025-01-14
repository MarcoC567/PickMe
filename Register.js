import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Card, Text, TextInput, Button, HelperText } from "react-native-paper";
import { insertRegistration } from "./Database";

const Register = ({ navigation }) => {
  const [username, setRegUsername] = useState("");
  const [email, setRegEmail] = useState("");
  const [password, setRegPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;

    // Validierung der Eingaben
    if (!username) setUsernameError(true);
    if (!emailRegex.test(email)) setEmailError(true);
    if (!passwordRegex.test(password)) setPasswordError(true);

    if (username && emailRegex.test(email) && passwordRegex.test(password)) {
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
      Alert.alert(
        "Fehler",
        "Bitte korrigieren Sie die Fehler in den Eingabefeldern."
      );
    }
  };

  const handleUsernameBlur = () => {
    if (!username) setUsernameError(true);
    else setUsernameError(false);
  };

  const handleEmailBlur = () => {
    if (!email) setEmailError(true);
    else setEmailError(false);
  };

  const handlePasswordBlur = () => {
    if (!password) setPasswordError(true);
    else setPasswordError(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
      <Card style={{ padding: 20, marginBottom: 150 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Registrieren
        </Text>

        {/* Benutzername */}
        <TextInput
          label="Benutzername"
          value={username}
          onChangeText={setRegUsername}
          onBlur={handleUsernameBlur}
          style={{
            marginBottom: 10,
            borderColor: usernameError ? "red" : "transparent",
            borderWidth: 1,
          }}
        />
        {usernameError && (
          <HelperText type="error" visible={usernameError}>
            Bitte geben Sie einen Benutzernamen ein.
          </HelperText>
        )}

        {/* E-Mail */}
        <TextInput
          label="E-Mail"
          value={email}
          onChangeText={setRegEmail}
          onBlur={handleEmailBlur}
          keyboardType="email-address"
          style={{
            marginBottom: 10,
            borderColor: emailError ? "red" : "transparent",
            borderWidth: 1,
          }}
        />
        {emailError && (
          <HelperText type="error" visible={emailError}>
            Bitte geben Sie eine gültige E-Mail-Adresse ein.
          </HelperText>
        )}

        {/* Passwort */}
        <TextInput
          label="Passwort"
          value={password}
          onChangeText={setRegPassword}
          onBlur={handlePasswordBlur}
          secureTextEntry
          style={{
            marginBottom: 10,
            borderColor: passwordError ? "red" : "transparent",
            borderWidth: 1,
          }}
        />
        {passwordError && (
          <HelperText type="error" visible={passwordError}>
            Das Passwort muss mindestens 8 Zeichen lang sein, einen
            Großbuchstaben und ein Sonderzeichen enthalten.
          </HelperText>
        )}

        {/* Registrieren-Button */}
        <Button
          mode="contained"
          onPress={handleRegister}
          style={{ marginBottom: 10 }}
        >
          Registrieren
        </Button>

        {/* Navigation zum Login */}
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
