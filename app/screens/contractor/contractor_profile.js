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
import { useSafeAreaFrame } from "react-native-safe-area-context";


export default function Contractor_Profile() {
  const [nombres, setnombres] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [estudios, setEstudios] = useState("");
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
                item.data()["estudios"],
                item.data()["nacimiento"],
                item.data()["sexo"],
                item.data()["telefono"]
              );
            }
          });
        });
    }, [])
  );

  const asignarCampos = (nombre, paterno, materno, estudios, naci, sexo, tel) => {
    setnombres(nombre);
    setPaterno(paterno);
    setMaterno(materno);
    setEstudios(estudios);
    setNacimiento(naci);
    setSexo(sexo);
    setTelefono(tel);
  };

  return (
    <View style={styles.vista}>
      <View>
        <Image source={require('../../utils/images/anonimo.png')} style={styles.imagenP}></Image>
      </View>
      <Text style={styles.miPerfil}>{nombres + " " + paterno + " " + materno}</Text>
      <View style={styles.boxMiPerfil}>
        <Text style={styles.concepto}>Nivel de Estudios:</Text>
        <Text style={styles.miPerfilSub}>{estudios}</Text>
      </View>
      <View style={styles.boxMiPerfil}>
        <Text style={styles.concepto}>Fecha de Nacimiento:</Text>
        <Text style={styles.miPerfilSub}>{nacimiento}</Text>
      </View>
      <View style={styles.boxMiPerfil}>
        <Text style={styles.concepto}>Sexo:</Text>
        <Text style={styles.miPerfilSub}>{sexo}</Text>
      </View>
      <View style={styles.boxMiPerfil}>
        <Text style={styles.concepto}>Número de Tel:</Text>
        <Text style={styles.miPerfilSub}>{tel}</Text>
      </View>
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

