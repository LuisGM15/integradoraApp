import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import ListaCandidatos from "../../components/contractor/contractor_candidatos";
const db = firebase.firestore(firebaseApp);

export default function Contractor_index() {
  const navegacion = useNavigation();
  const [candidatos, setCandidatos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const arrCandidatos = [];
      db.collection("accounts")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            const candidato = doc.data();
            candidato.id = doc.id;
            arrCandidatos.push(candidato);
          });
          setCandidatos(arrCandidatos);
        });
    }, [])
  );

  return (
    <View style={styles.vista}>
      <ListaCandidatos candidatos={candidatos} />
      {/* <ListaVacantes vacantes={vacantes} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
});
