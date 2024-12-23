import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const CustomPackage = ({ navigation }) => {
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = () => {
    console.log("Eigenes Paket erstellt mit Zutaten:", ingredients);
    alert(`Dein Paket mit folgenden Zutaten wurde erstellt: ${ingredients}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eigenes Paket erstellen</Text>
      <Text style={styles.instructions}>
        Gib die gewünschten Zutaten für dein Paket ein:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Zutaten (z.B. Käse, Brot, Wein)"
        value={ingredients}
        onChangeText={setIngredients}
      />
      <Button title="Paket erstellen" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default CustomPackage;
