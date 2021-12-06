import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, Picker } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Contractor_profile_edit() {
  const [selectedValue, setSelectedValue] = useState(estudios); //
  const [datos, setDatos] = useState(valoreDefault);
  const [nombres, setnombres] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [tel, setTelefono] = useState("");
  const [estudios, setEstudios] = useState("");
  const [doc, setDoc] = useState("");
  /* const { toastRef } = toast; */

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
                item.data()["telefono"],
                item.data()["estudios"]
              );
            }
          });
        });
    }, [])
  );

  const asignarCampos = (
    nombre,
    paterno,
    materno,
    naci,
    sexo,
    tel,
    estudios
  ) => {
    setnombres(nombre);
    setPaterno(paterno);
    setMaterno(materno);
    setNacimiento(naci);
    setSexo(sexo);
    setTelefono(tel);
    setEstudios(estudios);
  };

  const Guardar = () => {
    db.collection("accounts")
      .get()
      .then((request) => {
        request.forEach((item) => {
          if (item.data()["tokenUser"] === firebase.auth().currentUser.uid) {
            db.collection("accounts")
              .doc(item.id)
              .update({
                nombres: nombres,
                paterno: paterno,
                materno: materno,
                nacimiento: nacimiento,
                estudios: estudios,
                telefono: tel,
                sexo: sexo,
              })
              .then(() => {
                console.log("OKS");
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      });

    console.log({
      nombres: nombres,
      paterno: paterno,
      materno: materno,
      nacimiento: nacimiento,
      estudios: estudios,
      telefono: tel,
      sexo: sexo,
    });
  };

  function valoreDefault() {
    return {
      nombres: "",
      paterno: "",
      materno: "",
      nacimiento: "",
      estudios: "",
      telefono: "",
      sexo: "",
    };
  }

  const onChange = (e, type) => {
    /*  setDatos({ ...datos, [type]: e.nativeEvent.text }); */
  };
  return (
    <ScrollView>
      <View style={styles.formulario}>
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label={"Nombres"}
          value={nombres}
          onChange={(e) => setnombres(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Apellido paterno"
          value={paterno}
          onChange={(e) => setPaterno(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={materno}
          label="Apellido materno"
          onChange={(e) => setMaterno(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={nacimiento}
          label="Fecha de nacimiento"
          onChange={(e) => setNacimiento(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={tel}
          label="Número telefónico"
          onChange={(e) => setTelefono(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={sexo}
          label="Sexo"
          onChange={(e) => setSexo(e.nativeEvent.text)}
        />

        {/*  <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={estudios}
          label="Estudios"
          onChange={(e) => setEstudios(e.nativeEvent.text)}
        /> */}
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
