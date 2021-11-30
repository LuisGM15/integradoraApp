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

export default function Contractor_profile_edit() {
  const [selectedValue, setSelectedValue] = useState("Selecciona");
  const [datos, setDatos] = useState(valoreDefault);
  const [nombres, setnombres] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [tel, setTelefono] = useState("");
  const [estudios, setEstudios] = useState("");
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
      <View style={styles.formContainer}>
        <Text> Editar datos !!</Text>

        <Input
          placeholder={"Nombres"}
          value={nombres}
          containerStyle={styles.inputForm}
          onChange={(e) => setnombres(e.nativeEvent.text)}
        />
        <Input
          placeholder="Apellido paterno"
          value={paterno}
          containerStyle={styles.inputForm}
          onChange={(e) => setPaterno(e.nativeEvent.text)}
        />
        <Input
          value={materno}
          placeholder="Apellido materno"
          containerStyle={styles.inputForm}
          onChange={(e) => setMaterno(e.nativeEvent.text)}
        />
        <Input
          value={nacimiento}
          placeholder="Fecha de nacimiento"
          containerStyle={styles.inputForm}
          onChange={(e) => setNacimiento(e.nativeEvent.text)}
        />
        <Input
          value={tel}
          placeholder="Número telefónico"
          containerStyle={styles.inputForm}
          onChange={(e) => setTelefono(e.nativeEvent.text)}
        />
        <Input
          value={sexo}
          placeholder="Sexo"
          containerStyle={styles.inputForm}
          onChange={(e) => setSexo(e.nativeEvent.text)}
        />
        <Input
          value={estudios}
          placeholder="Estudios"
          containerStyle={styles.inputForm}
          onChange={(e) => setEstudios(e.nativeEvent.text)}
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
