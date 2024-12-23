import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const PreparedPackageDetails = ({ route, navigation }) => {
  const { packageId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Details zum Paket</Text>
      <Text style={styles.packageText}>
        Dies sind die Details zum vorbereiteten Paket mit der ID: {packageId}.
      </Text>
      <Button title="Zurück" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  packageText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default PreparedPackageDetails;
