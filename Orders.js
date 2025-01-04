import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button, List, Divider } from "react-native-paper"; // react-native-paper Komponenten
import { getOrdersByUser } from "./Database"; // Importiere die Bestell-Operationen

const OrdersPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [isAscending, setIsAscending] = useState(true); // Zustand für die Sortierung

  // Bestellungen vom Benutzer abrufen
  const fetchOrders = async () => {
    try {
      const userOrders = await getOrdersByUser(userId, isAscending);
      setOrders(userOrders); // Die Bestellungen in den Zustand setzen
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellungen:", error);
    }
  };

  // useEffect um Bestellungen zu laden, wenn die Seite geladen wird
  useEffect(() => {
    fetchOrders();
  }, [isAscending]); // Abhängigkeit auf isAscending, um bei Änderung neu zu laden

  // Sortieren der Bestellungen nach Datum
  const sortOrders = () => {
    setIsAscending(!isAscending); // Die Richtung der Sortierung umkehren
  };

  // Render-Funktion für jede Bestellung
  const renderItem = ({ item }) => (
    <List.Item
      title={`Bestellung ID: ${item.order_id}`}
      description={`Datum: ${item.date} | Ort: ${item.location}`}
      left={() => <List.Icon icon="package" />}
      style={styles.orderItem}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bestellungen</Text>

      {/* Button um Bestellungen nach Datum zu sortieren */}
      <Button mode="contained" onPress={sortOrders} style={styles.sortButton}>
        Nach Datum sortieren ({isAscending ? "Absteigend" : "Aufsteigend"})
      </Button>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.order_id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />} // Trenner zwischen den Listenelementen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  sortButton: {
    marginBottom: 20,
  },
  orderItem: {
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
});

export default OrdersPage;
