import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./app/screens/dashboard/Login";
import Dashboard from "./app/navigations/dashboard_navigation";

export default function App() {
  return <Dashboard />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
