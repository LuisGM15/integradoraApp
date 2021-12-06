import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { size, isEmpty } from "lodash";




export default function Contractor_Vacants_Add(toast) {
  const { toastRef } = toast;

  //horario prestaciones requisitos descripcion sueldo
  const [titulo, setTitulo] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [horario, setHorario] = useState("");
  const [pago, setPago] = useState("");


  const onSubmit = () => {

  };
  const Guardar = () => {
    db.collection("vacantes")
      .add({
        titulo: titulo,
        requisitos: requisitos,
        descripcion: descripcion,
        horario: horario,
        pago: pago,
        tokenUser: firebase.auth().currentUser.uid,
      })
      .then((request) => {
        console.log("oks");
      })
      .catch((e) => {
        console.log(e);
      });
  };


  function valoreDefault() {
    return {
      titulo: "",
      requisitos: "",
      descripcion: "",
      horario: "",
      pago: "",
    };
  }

  return (
    <ScrollView>
      <View style={styles.formulario}>
        <Input
          labelStyle={styles.lab}
          label="Título"
          value={titulo}
          style={styles.inp}
          onChange={(e) => setTitulo(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          label="Requisitos"
          value={requisitos}
          style={styles.inp}
          onChange={(e) => setRequisitos(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          label="Descripción"
          value={descripcion}
          style={styles.inp}
          onChange={(e) => setDescripcion(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          label="Horario"
          value={horario}
          style={styles.inp}
          onChange={(e) => setHorario(e.nativeEvent.text)}
        />
        <Input
          label="Pago"
          labelStyle={styles.lab}
          value={pago}
          style={styles.inp}
          onChange={(e) => setPago(e.nativeEvent.text)}
        />
        <View style={styles.centrar}>
          <Button
            title="Registrar"
            buttonStyle={styles.btnForm}
            onPress={Guardar}
          />
        </View>
      </View>
    </ScrollView>
  );
}


