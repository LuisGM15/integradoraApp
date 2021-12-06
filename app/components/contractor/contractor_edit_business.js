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

export default function Contractor_Edit_Business() {
  const [selectedValue, setSelectedValue] = useState("Selecciona");
  const [nombre, setNombre] = useState("");
  const [area, setArea] = useState("");
  const [calle, setCalle] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [colonia, setColonia] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [rfc, setRFC] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cp, setCP] = useState("");

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
                item.data()["calle"],
                item.data()["ciudad"],
                item.data()["colonia"],
                item.data()["estado"],
                item.data()["numero"],
                item.data()["rfc"],
                item.data()["telefono"],
                item.data()["cp"]
              );
            }
          });
        });
    }, [])
  );

  const asignarCampos = (
    nombre,
    area,
    calle,
    ciudad,
    colonia,
    estado,
    numero,
    rfc,
    telefono,
    cp
  ) => {
    setNombre(nombre);
    setArea(area);
    setCalle(calle);
    setCiudad(ciudad);
    setColonia(colonia);
    setEstado(estado);
    setNumero(numero);
    setRFC(rfc);
    setTelefono(telefono);
    setCP(cp);
  };

  const Guardar = () => {
    db.collection("negocio")
      .get()
      .then((request) => {
        request.forEach((item) => {
          if (item.data()["tokenUser"] === firebase.auth().currentUser.uid) {
            db.collection("negocio")
              .doc(item.id)
              .update({
                nombre: nombre,
                area: area,
                calle: calle,
                ciudad: ciudad,
                colonia: colonia,
                estado: estado,
                numero: numero,
                rfc: rfc,
                telefono: telefono,
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
  };

  return (
    <ScrollView>
      <View style={styles.formulario}>
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label={"Nombres"}
          value={nombre}
          containerStyle={styles.inputForm}
          onChange={(e) => setNombre(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Rfc"
          value={rfc}
          containerStyle={styles.inputForm}
          onChange={(e) => setRFC(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={telefono}
          label="Teléfono"
          containerStyle={styles.inputForm}
          onChange={(e) => setTelefono(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={area}
          label="Área"
          containerStyle={styles.inputForm}
          onChange={(e) => setArea(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={numero}
          label="Número"
          containerStyle={styles.inputForm}
          onChange={(e) => setNumero(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={calle}
          label="Calle"
          containerStyle={styles.inputForm}
          onChange={(e) => setCalle(e.nativeEvent.text)}
        />
        {/* <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={cp}
          label="CP"
          containerStyle={styles.inputForm}
          onChange={(e) => setCP(e.nativeEvent.text)}
        /> */}
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={colonia}
          label="Colonia"
          containerStyle={styles.inputForm}
          onChange={(e) => setColonia(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={estado}
          label="Estado"
          containerStyle={styles.inputForm}
          onChange={(e) => setEstado(e.nativeEvent.text)}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          value={ciudad}
          label="Ciudad"
          containerStyle={styles.inputForm}
          onChange={(e) => setCiudad(e.nativeEvent.text)}
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
