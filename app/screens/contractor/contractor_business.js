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
      <View>
        <Image source={require('../../utils/images/anonimo.png')} style={styles.imagenP}></Image>
      </View>
      <Text style={styles.miPerfil}>{nombre}</Text>
      <View style={styles.boxMiPerfil}>
        <Text style={styles.concepto}>Área:</Text>
        <Text style={styles.miPerfilSub}>{area}</Text>
      </View>
      <View style={styles.boxMiPerfil}>
        <Text style={styles.concepto}>Tel:</Text>
        <Text style={styles.miPerfilSub}>{telefono}</Text>
        <Text>   </Text>
        <Text style={styles.concepto}>RFC:</Text>
        <Text style={styles.miPerfilSub}>{rfc}</Text>
      </View>
      <View style={styles.boxMiPerfil}>
        <Text style={styles.concepto}>Calle:</Text>
        <Text style={styles.miPerfilSub}>{calle}</Text>
        <Text>   </Text>
        <Text style={styles.concepto}>Num:</Text>
        <Text style={styles.miPerfilSub}>{numero}</Text>
      </View>
      <View style={styles.boxMiPerfil}>
        <Text style={styles.concepto}>Colonia:</Text>
        <Text style={styles.miPerfilSub}>{colonia}</Text>
        <Text>   </Text>
        <Text style={styles.concepto}>Código Postal:</Text>
        <Text style={styles.miPerfilSub}>{cp}</Text>
      </View>

      <View style={styles.boxMiPerfil}>
        <Text style={styles.concepto}>Estado:</Text>
        <Text style={styles.miPerfilSub}>{estado}</Text>
        <Text>   </Text>
        <Text style={styles.concepto}>Ciudad:</Text>
        <Text style={styles.miPerfilSub}>{ciudad}</Text>
      </View>










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


