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

export default function Contractor_Profile() {
  const [nombres, setnombres] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [tel, setTelefono] = useState("");
  const navegacion = useNavigation();

  useFocusEffect(
    useCallback(() => {
      db.collection("accounts")
        .get()
        .then((request) => {
          request.forEach((item) => {
            if (item.data()["tokenUser"] === firebase.auth().currentUser.uid) {
              asignarCampos(
                item.data()["nombre"],
                item.data()["paterno"],
                item.data()["materno"],
                item.data()["nacimiento"],
                item.data()["sexo"],
                item.data()["telefono"]
              );
            }
          });
        });
    }, [])
  );

  const asignarCampos = (nombre, paterno, materno, naci, sexo, tel) => {
    setnombres(nombre);
    setPaterno(paterno);
    setMaterno(materno);
    setNacimiento(naci);
    setSexo(sexo);
    setTelefono(tel);
  };

  return (
    <View style={styles.vista}>
      <Text>MI PERFILS</Text>
      <Text style={styles.direccion}>{nombres}</Text>
      <Text style={styles.direccion}>{paterno}</Text>
      <Text style={styles.direccion}>{materno}</Text>
      <Text style={styles.direccion}>{nacimiento}</Text>
      <Text style={styles.direccion}>{sexo}</Text>
      <Text style={styles.direccion}>{tel}</Text>
      <Icon
        reverse
        type="material_community"
        name="edit"
        color="#0A6ED3"
        containerStyle={styles.btn}
        //Vinculamos el envió a la ruta agregar-suc
        onPress={() => navegacion.navigate("profle_edit")}
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
