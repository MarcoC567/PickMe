import React, { useEffect, useRef } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const navigation = useNavigation();

  // Refs für die FlatLists
  const preparedPackagesRef = useRef(null);
  const regionalPackagesRef = useRef(null);

  // Daten für die Slider
  const preparedPackages = [
    {
      id: "1",
      name: "Romantisches Picknick",
      image: require("./assets/romantic.png"),
    },
    {
      id: "2",
      name: "Familienpicknick",
      image: require("./assets/family.jpg"),
    },
    {
      id: "3",
      name: "Abenteuerpicknick",
      image: require("./assets/adventure.jpg"),
    },
  ];

  const regionalPackages = [
    {
      id: "1",
      name: "Bayerisches Picknick",
      image: require("./assets/bavarian.jpg"),
    },
    {
      id: "2",
      name: "Französisches Picknick",
      image: require("./assets/french.jpg"),
    },
    {
      id: "3",
      name: "Italienisches Picknick",
      image: require("./assets/italian.jpg"),
    },
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
      <Card
        style={{
          width: 180,
          marginRight: 15,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <Card.Cover
          source={item.image}
          style={{ height: 120, borderRadius: 10 }}
        />
        <Card.Content>
          <Text style={{ textAlign: "center", fontSize: 14, marginTop: 10 }}>
            {item.name}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  // Funktion zum automatischen Scrollen der FlatLists
  const autoScrollCarousel = (listRef, dataLength) => {
    let currentIndex = 0;

    setInterval(() => {
      if (currentIndex < dataLength - 1) {
        currentIndex += 1;
      } else {
        currentIndex = 0;
      }

      listRef.current.scrollToIndex({ animated: true, index: currentIndex });
    }, 10000); // Alle 5 Sekunden
  };

  useEffect(() => {
    if (preparedPackagesRef.current) {
      autoScrollCarousel(preparedPackagesRef, preparedPackages.length);
    }
    if (regionalPackagesRef.current) {
      autoScrollCarousel(regionalPackagesRef, regionalPackages.length);
    }

    // Clean up on unmount
    return () => clearInterval(autoScrollCarousel);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        PickMe
      </Text>

      {/* Slider für vorgefertigte Pakete */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginVertical: 10,
          marginHorizontal: 50,
        }}
      >
        Unsere vorgefertigten Pakete
      </Text>
      <FlatList
        horizontal
        data={preparedPackages}
        renderItem={({ item }) => renderSliderItem(item, "prepared")}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        ref={preparedPackagesRef}
      />

      {/* Slider für regionale Pakete */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginVertical: 10,
          marginHorizontal: 120,
        }}
      >
        Regionale Pakete
      </Text>
      <FlatList
        horizontal
        data={regionalPackages}
        renderItem={({ item }) => renderSliderItem(item, "regional")}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        ref={regionalPackagesRef}
      />

      {/* Button zum Erstellen eines eigenen Pakets */}
      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("CustomPackage")}
          style={{ width: "80%", marginBottom: 50 }}
        >
          Eigenes Paket erstellen
        </Button>
      </View>
    </View>
  );
};

export default HomePage;
