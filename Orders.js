import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button, List, Divider } from "react-native-paper"; // react-native-paper Komponenten
import { getOrdersByUser, allOrders } from "./Database"; // Importiere die Bestell-Operationen

const OrdersPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [isAscending, setIsAscending] = useState(true); // Zustand für die Sortierung

  // Bestellungen vom Benutzer abrufen
  const fetchOrders = async () => {
    try {
      if (!userId) {
        console.log("Kein userId vorhanden");
        return;
      }
      const TESTALLORDERS = await allOrders();
      const userOrders = await getOrdersByUser(userId, isAscending);
      console.log("Bestellungen gefunden:", userOrders);
      setOrders(userOrders); // Die Bestellungen in den Zustand setzen
    } catch (error) {
      console.error("Fehler beim Abrufen der Bestellungen:", error);
    }
  };

  // useEffect um Bestellungen zu laden, wenn die Seite geladen wird
  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId, isAscending]); // Abhängigkeit auf userId und isAscending

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
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderItem: {
    paddingVertical: 8,
  },
  sortButton: {
    marginBottom: 16,
  },
});

export default OrdersPage;
