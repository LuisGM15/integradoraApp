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
import { Image } from "react-native-elements";


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
                item.data()["nombres"],
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
      <View>
        <Image source={require('../../utils/images/anonimo.png')} style={styles.imagenP}></Image>
      </View>
      <Text style={styles.direccion}>{nombres}</Text>
      <Text style={styles.direccion}>{paterno}</Text>
      <Text style={styles.direccion}>{materno}</Text>
      <Text style={styles.direccion}>{nacimiento}</Text>
      <Text style={styles.direccion}>{sexo}</Text>
      <Text style={styles.direccion}>{tel}</Text>
      <Icon
        style={styles.vista}
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

