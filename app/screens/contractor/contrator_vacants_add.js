import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Contractor_Vacants_Add() {
  //horario prestaciones requisitos descripcion sueldo
  const [titulo, setTitulo] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [horario, setHorario] = useState("");
  const [pago, setPago] = useState("");

  const Guardar = () => {
    db.collection("vacantes")
      .add()
      .then((request) => {});
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text> Editar datos !!</Text>
        <Input
          value={titulo}
          placeholder="Título"
          containerStyle={styles.inputForm}
          onChange={(e) => setTitulo(e.nativeEvent.text)}
        />
        <Input
          value={requisitos}
          placeholder="Requisitos"
          containerStyle={styles.inputForm}
          onChange={(e) => setRequisitos(e.nativeEvent.text)}
        />
        <Input
          value={descripcion}
          placeholder="Descripción"
          containerStyle={styles.inputForm}
          onChange={(e) => setDescripcion(e.nativeEvent.text)}
        />
        <Input
          value={horario}
          placeholder="Horario"
          containerStyle={styles.inputForm}
          onChange={(e) => setHorario(e.nativeEvent.text)}
        />
        <Input
          value={pago}
          placeholder="Pago"
          containerStyle={styles.inputForm}
          onChange={(e) => setPago(e.nativeEvent.text)}
        />
        <Button
          title="Registrar"
          containerStyle={styles.btnContainer}
          /* buttonStyle={styles.btn} */
          onPress={Guardar}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    /*  flex: 1, */
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingLeft: 29,
    paddingRight: 20,
  },
  btnRegistrar: {
    width: "2000%",
    height: "30",
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  picker_style: {
    width: "100%",
    marginTop: 100,
  },
  btnContainer: {
    marginTop: 20,
    marginBottom: 40,
    width: "100%",
  },
  btn: {
    backgroundColor: global.color_princilap,
  },
  icono: {
    color: "#c1c1c1",
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
