import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Candidate_indexForm() {
  return (
    <View>
      <Text> NEGOCIOS QUE BUSCAN EMPLEADOS !!</Text>
      <Text> LISTA DE VACANTES !!</Text>
    </View>
  );
}
