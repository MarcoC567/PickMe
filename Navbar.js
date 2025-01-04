import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Stelle sicher, dass du Ionicons verwendest

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
      {/* Home Button */}
      <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
        <Ionicons name="home" size={24} />
        <Text>Home</Text>
      </TouchableOpacity>

      {/* Login / Logout Button */}
      {isLoggedIn ? (
        <TouchableOpacity onPress={onLogout}>
          <Ionicons name="log-out" size={24} />
          <Text>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Ionicons name="log-in" size={24} />
          <Text>Login</Text>
        </TouchableOpacity>
      )}

      {/* Account Button */}
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Ionicons name="person" size={24} />
        <Text>Konto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
