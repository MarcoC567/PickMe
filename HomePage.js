import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const navigation = useNavigation();

  // Daten für die Slider
  const preparedPackages = [
    { id: "1", name: "Romantisches Picknick", image: require("./assets/romantic.jpg") },
    { id: "2", name: "Familienpicknick", image: require("./assets/family.jpg") },
    { id: "3", name: "Abenteuerpicknick", image: require("./assets/adventure.jpg") },
  ];

  const regionalPackages = [
    { id: "1", name: "Bayerisches Picknick", image: require("./assets/bavarian.jpg") },
    { id: "2", name: "Französisches Picknick", image: require("./assets/french.jpg") },
    { id: "3", name: "Italienisches Picknick", image: require("./assets/italian.jpg") },
  ];

  // Render-Funktion für Slider-Items
  const renderSliderItem = (item, type) => (
    <TouchableOpacity
      onPress={() => {
        if (type === "prepared") {
          navigation.navigate("PreparedPackageDetails", { packageId: item.id });
        } else {
          navigation.navigate("RegionalPackageDetails", { packageId: item.id });
        }
      }}
    >
      <View style={styles.sliderItem}>
        <Image source={item.image} style={styles.sliderImage} />
        <Text style={styles.sliderText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PickMe</Text>

      {/* Slider für vorgefertigte Pakete */}
      <Text style={styles.sectionHeader}>Unsere vorgefertigten Pakete</Text>
      <FlatList
        horizontal
        data={preparedPackages}
        renderItem={({ item }) => renderSliderItem(item, "prepared")}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

      {/* Slider für regionale Pakete */}
      <Text style={styles.sectionHeader}>Regionale Pakete</Text>
      <FlatList
        horizontal
        data={regionalPackages}
        renderItem={({ item }) => renderSliderItem(item, "regional")}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

      {/* Button zum Erstellen eines eigenen Pakets */}
      <View style={styles.buttonContainer}>
        <Button
          title="Eigenes Paket erstellen"
          onPress={() => navigation.navigate("CustomPackage")}
          color="#2196F3"
        />
      </View>

      {/* Fußleiste */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("LoginRegister")}>
          <Text style={styles.footerText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <Text style={styles.footerText}>Konto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  sliderItem: {
    marginRight: 10,
    alignItems: "center",
  },
  sliderImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  sliderText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 14,
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomePage;
