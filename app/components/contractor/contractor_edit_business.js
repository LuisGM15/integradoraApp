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
      <View style={styles.formContainer}>
        <Text> Editar datos !!</Text>

        <Input
          placeholder={"Nombres"}
          value={nombre}
          containerStyle={styles.inputForm}
          onChange={(e) => setNombre(e.nativeEvent.text)}
        />
        <Input
          placeholder="Rfc"
          value={rfc}
          containerStyle={styles.inputForm}
          onChange={(e) => setRFC(e.nativeEvent.text)}
        />
        <Input
          value={telefono}
          placeholder="Teléfono"
          containerStyle={styles.inputForm}
          onChange={(e) => setTelefono(e.nativeEvent.text)}
        />
        <Input
          value={area}
          placeholder="Área"
          containerStyle={styles.inputForm}
          onChange={(e) => setArea(e.nativeEvent.text)}
        />
        <Input
          value={numero}
          placeholder="Número"
          containerStyle={styles.inputForm}
          onChange={(e) => setNumero(e.nativeEvent.text)}
        />
        <Input
          value={calle}
          placeholder="Calle"
          containerStyle={styles.inputForm}
          onChange={(e) => setCalle(e.nativeEvent.text)}
        />
        <Input
          value={cp}
          placeholder="CP"
          containerStyle={styles.inputForm}
          onChange={(e) => setCP(e.nativeEvent.text)}
        />
        <Input
          value={colonia}
          placeholder="Colonia"
          containerStyle={styles.inputForm}
          onChange={(e) => setColonia(e.nativeEvent.text)}
        />
        <Input
          value={estado}
          placeholder="Estado"
          containerStyle={styles.inputForm}
          onChange={(e) => setEstado(e.nativeEvent.text)}
        />
        <Input
          value={ciudad}
          placeholder="Ciudad"
          containerStyle={styles.inputForm}
          onChange={(e) => setCiudad(e.nativeEvent.text)}
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
