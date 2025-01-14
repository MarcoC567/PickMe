import React from "react";
import { View, ScrollView } from "react-native";
import { Card, Text, Divider, Button } from "react-native-paper";

//Mockdaten für die Details der vorgefertigten Pakete
const packages = [
  {
    id: "1",
    name: "Romantisches Picknick",
    image: require("./assets/romantic.png"),
    description:
      "Ein liebevoll zusammengestelltes Picknick-Set für romantische Momente zu zweit.",
    products: ["Picknickkorb", "Decke", "Weingläser"],
    consumeables: ["zwei Vollkornbrötchen", "Flasche Wein", "Käse", "Trauben"],
  },
  {
    id: "2",
    name: "Familienpicknick",
    image: require("./assets/family.png"),
    description:
      "Ein Picknick-Set für die ganze Familie – ideal für ein entspanntes Wochenende im Park.",
    products: ["Großer Picknickkorb", "Fleecedecke", "Plastikgeschirr"],
    consumeables: ["Vollkornbrötchen", "Tomaten", "Würstchen", "Apfelsaft"],
  },
  {
    id: "3",
    name: "Abenteuerpicknick",
    image: require("./assets/adventure.png"),
    description:
      "Für alle, die das Abenteuer lieben: Ein Picknick-Set für Outdoor-Aktivitäten in der Natur.",
    products: ["Thermosflasche", "Outdoor-Decke", "Taschenmesser"],
    consumeables: ["Vollkornbrote", "Salami", "Nüsse", "Kaffee"],
  },
];

//Anzeige der vorgefertigten Paketdetails
const PreparedPackageDetails = ({ route, navigation }) => {
  const { packageId } = route.params;

  const packageDetails = packages.find((pkg) => pkg.id === packageId);

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

export default PreparedPackageDetails;
