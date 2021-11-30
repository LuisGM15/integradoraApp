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
  const [numero, setNumero] = useState("");
  const [calle, setCalle] = useState("");
  const [colonia, setColonia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [cp, setCP] = useState("");
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
                item.data()["telefono"],
                item.data()["numero"],
                item.data()["calle"],
                item.data()["colonia"],
                item.data()["ciudad"],
                item.data()["estado"],
                item.data()["cp"]
              );
            }
          });
        });
    }, [])
  );

  const asignarCampos = (
    name,
    area,
    rfc,
    tel,
    num,
    calle,
    colonia,
    ciudad,
    estado,
    cp
  ) => {
    setnombre(name);
    setArea(area);
    setRfc(rfc);
    setTelefono(tel);
    setNumero(num),
      setCalle(calle),
      setColonia(colonia),
      setCiudad(colonia),
      setCiudad(ciudad),
      setEstado(estado),
      setCP(cp);
  };

  return (
    <View style={styles.vista}>
      <Text style={styles.direccion}>Nombre: {nombre}</Text>
      <Text style={styles.direccion}>Area: {area}</Text>
      <Text style={styles.direccion}>Teléfono: {telefono}</Text>
      <Text style={styles.direccion}>Rfc: {rfc}</Text>
      <Text style={styles.direccion}>Número: {numero}</Text>
      <Text style={styles.direccion}>Calle: {calle}</Text>
      <Text style={styles.direccion}>Colonia: {colonia}</Text>
      <Text style={styles.direccion}>Ciudad: {ciudad}</Text>
      <Text style={styles.direccion}>Estado: {estado}</Text>
      <Text style={styles.direccion}>Código postal: {cp}</Text>

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
