import React from "react";
import { View, Alert } from "react-native";
import { Card, Text, TextInput, Button, HelperText } from "react-native-paper";
import { checkLoginCredentials } from "../PickMe/Database";

const Login = ({ navigation, onLoginSuccess }) => {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleLogin = async () => {
    if (loginEmail && loginPassword) {
      try {
        const user = await checkLoginCredentials(loginEmail, loginPassword);

        if (user) {
          Alert.alert("Erfolg", "Login erfolgreich!");
          onLoginSuccess(user.user_id);
          navigation.navigate("HomePage");
        } else {
          Alert.alert("Fehler", "Ungültige E-Mail oder Passwort.");
        }
      } catch (error) {
        Alert.alert(
          "Fehler",
          error.message || "Es gab ein Problem bei der Anmeldung."
        );
      }
    } else {
      if (!loginEmail) setEmailError(true);
      if (!loginPassword) setPasswordError(true);
      Alert.alert("Fehler", "Bitte geben Sie Ihre Zugangsdaten ein.");
    }
  };

  const handleEmailBlur = () => {
    if (!loginEmail) setEmailError(true);
    else setEmailError(false);
  };

  const handlePasswordBlur = () => {
    if (!loginPassword) setPasswordError(true);
    else setPasswordError(false);
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
            Bitte geben Sie Ihre E-Mail ein.
          </HelperText>
        )}

        <TextInput
          label="Passwort"
          value={loginPassword}
          onChangeText={setLoginPassword}
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
            Bitte geben Sie Ihr Passwort ein.
          </HelperText>
        )}

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
