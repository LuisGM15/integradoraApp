import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import ListaVacantes from "../../components/contractor/contractor_list_vacants";

const db = firebase.firestore(firebaseApp);

export default function Contractor_Vacants() {
  //definimos el acceso a las rutas de sucursales
  const navegacion = useNavigation();
  //useState de sesion
  const [vacantes, setVacantes] = useState([]);
  const [puntero, setPuntero] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const arrVacantes = [];
      db.collection("vacantes")
        .get()
        .then((res) => {
          setPuntero(res.docs[res.docs.length - 1]);
          res.forEach((doc) => {
            const vacante = doc.data();
            vacante.id = doc.id;
            arrVacantes.push(vacante);
          });
          setVacantes(arrVacantes);
        });
    }, [])
  );
  return (
    <View style={styles.vista}>
      <ListaVacantes vacantes={vacantes} />
      <Icon
        reverse
        type="material_community"
        name="add"
        color="#0A6ED3"
        containerStyle={styles.btn}
        //Vinculamos el envió a la ruta agregar-suc
        onPress={() => navegacion.navigate("vacants_add")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  btn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    //Para IOS mostrará una sombra para el botón
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
