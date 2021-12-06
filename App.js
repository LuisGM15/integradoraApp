import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./app/screens/dashboard/Login";
import Dashboard from "./app/navigations/dashboard_navigation";
import { firebaseApp } from "./app/utils/firebase";

export default function App() {
  return <Dashboard />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#098305",
    alignItems: "center",
    justifyContent: "center",
  },
});
