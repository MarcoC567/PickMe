import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* Bestellungen Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Orders")}
        style={{ alignItems: "center" }}
      >
        <Ionicons name="cart" size={24} />
        <Text>Bestellungen</Text>
      </TouchableOpacity>

      {/* Home Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("HomePage")}
        style={{ alignItems: "center" }}
      >
        <Ionicons name="home" size={24} />
        <Text>Home</Text>
      </TouchableOpacity>

      {/* Account Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Account")}
        style={{ alignItems: "center" }}
      >
        <Ionicons name="person" size={24} />
        <Text>Konto</Text>
      </TouchableOpacity>

      {/* Login / Logout Button */}
      {isLoggedIn ? (
        <TouchableOpacity onPress={onLogout} style={{ alignItems: "center" }}>
          <Ionicons name="log-out" size={24} />
          <Text>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ alignItems: "center" }}
        >
          <Ionicons name="log-in" size={24} />
          <Text>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Navbar;
