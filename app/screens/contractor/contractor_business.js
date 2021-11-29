import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
import { useNavigation } from "@react-navigation/native";

export default function Contractor_business() {
  const [nombre, setnombre] = useState("");
  const [area, setArea] = useState("");
  const [rfc, setRfc] = useState("");
  const [telefono, setTelefono] = useState("");
  const navegacion = useNavigation();

  useFocusEffect(
    useCallback(() => {
      db.collection("negocio")
        .get()
        .then((request) => {
          request.forEach((item) => {
            if (item.data()["tokenUser"] === firebase.auth().currentUser.uid) {
              asignarCampos(
                item.data()["nombre"],
                item.data()["area"],
                item.data()["rfc"],
                item.data()["telefono"]
              );
            }
          });
        });
    }, [])
  );

  const asignarCampos = (name, area, rfc, tel) => {
    setnombre(name);
    setArea(area);
    setRfc(rfc);
    setTelefono(tel);
  };

  return (
    <View style={styles.vista}>
      <Text style={styles.direccion}>{nombre}</Text>
      <Text style={styles.direccion}>{area}</Text>
      <Text style={styles.direccion}>{telefono}</Text>
      <Text style={styles.direccion}>{rfc}</Text>

      <Icon
        reverse
        type="material_community"
        name="edit"
        color="#0A6ED3"
        containerStyle={styles.btn}
        //Vinculamos el envió a la ruta agregar-suc
        onPress={() => navegacion.navigate("business_edit")}
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
