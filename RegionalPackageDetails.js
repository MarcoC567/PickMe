import React from "react";
import { View, ScrollView } from "react-native";
import { Card, Text, Divider, Button } from "react-native-paper";

const regionalPackages = [
  {
    id: "1",
    name: "Bayerisches Picknick",
    image: require("./assets/bavarian.png"),
    description:
      "Ein herzhaftes Picknick im bayerischen Stil, mit traditionellen Snacks und Getränken.",
    products: ["Bierkrug", "Brotzeitbrett", "Picknickdecke"],
    consumeables: ["Brezn", "Leberkäs", "Obatzda", "Weißwurst"],
  },
  {
    id: "2",
    name: "Französisches Picknick",
    image: require("./assets/french.png"),
    description:
      "Genieße ein romantisches Picknick im französischen Stil mit feinen Delikatessen.",
    products: ["Picknickdecke", "Käseplatte", "Kerze"],
    consumeables: ["Baguette", "Camembert", "Croissants", "Französische Weine"],
  },
  {
    id: "3",
    name: "Italienisches Picknick",
    image: require("./assets/italian.png"),
    description:
      "Erlebe den Geschmack Italiens mit diesem mediterranen Picknick-Set voller Köstlichkeiten.",
    products: ["Schalen", "Picknickdecke", "Korb"],
    consumeables: [
      "Ciabatta-Brot",
      "Tomaten-Mozzarella",
      "Schinken",
      "Italienischer Rotwein",
    ],
  },
];

const RegionalPackageDetails = ({ route, navigation }) => {
  const { packageId } = route.params;

  const packageDetails = regionalPackages.find((pkg) => pkg.id === packageId);

  if (!packageDetails) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "red",
            fontSize: 18,
            marginBottom: 20,
          }}
        >
          Paketdetails konnten nicht geladen werden.
        </Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          Zurück
        </Button>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <Card style={{ marginBottom: 20 }}>
        <Card.Cover source={packageDetails.image} style={{ height: 200 }} />
        <Card.Content>
          <Text
            variant="headlineLarge"
            style={{ marginTop: 10, fontWeight: "bold", textAlign: "center" }}
          >
            {packageDetails.name}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ marginTop: 10, textAlign: "center", color: "#555" }}
          >
            {packageDetails.description}
          </Text>

          <Divider style={{ marginVertical: 15 }} />

          <Text
            variant="titleMedium"
            style={{ fontWeight: "bold", marginBottom: 5 }}
          >
            Zubehör:
          </Text>
          {packageDetails.products.map((product, index) => (
            <Text
              key={index}
              style={{ marginLeft: 10, marginBottom: 5, color: "#333" }}
            >
              • {product}
            </Text>
          ))}

          <Divider style={{ marginVertical: 15 }} />

          <Text
            variant="titleMedium"
            style={{ fontWeight: "bold", marginBottom: 5 }}
          >
            Speisen und Getränke:
          </Text>
          {packageDetails.consumeables.map((item, index) => (
            <Text
              key={index}
              style={{ marginLeft: 10, marginBottom: 5, color: "#333" }}
            >
              • {item}
            </Text>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={{ marginTop: 20, alignSelf: "center", width: "80%" }}
      >
        Bestellen
      </Button>
    </ScrollView>
  );
};

export default RegionalPackageDetails;
