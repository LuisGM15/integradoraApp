import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { validarEmail } from "../../utils/validaciones";

import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Registry_Form(toast) {
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);
  const [datos, setDatos] = useState(valoreDefault);
  const { toastRef } = toast;
  const navigation = useNavigation();

  const prueba = () => {
    const list = {
      operationType: "signIn",
      user: {
        uid: "6Yxg79O0zLddcbxsdNau5k6WyXE2",
      },
    };
  };

  const onSubmit = () => {
    if (
      isEmpty(datos.email) ||
      isEmpty(datos.password) ||
      isEmpty(datos.repeatedPassword)
    ) {
      toastRef.current.show("No puedes dejar los campos vacios");
    } //Validación del email
    else if (!validarEmail(datos.email)) {
      toastRef.current.show("Estructura del email incorrecta");
    } //Validación de la longitud de la contraseña
    else if (size(datos.password) < 6) {
      toastRef.current.show("La contraseña debe tener al menos 6 caracteres");
    } //Validación de las contraseñas iguales
    else if (datos.password !== datos.repeatedPassword) {
      toastRef.current.show("Las contraseñas deben ser iguales");
    } else {
      toastRef.current.show("REGISTROSO");
      /* BLOQUE PARA CREAR EL NUEVO USUARIO */
      firebase
        .auth()
        .createUserWithEmailAndPassword(datos.email, datos.password)
        .then((request) => {
          /* SI EL REGISTRO ES EXITOSO, ENTONCES SE AGREGARÁ EL USUARIO AL FIRESTORE */
          db.collection("accounts").add({
            tokenUser: request["user"]["uid"],
            rol: "candidate",
            full: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onChange = (e, type) => {
    setDatos({ ...datos, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.register}>
      <View style={styles.boxLogin}>
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Correo Electrónico"
          onChange={(e) => onChange(e, "email")}
        />
        <Icon
          type="material-community-icon"
          name="alternate-email"
          containerStyle={styles.border}
        />
      </View>

      <View style={styles.boxLogin}>

        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Contraseña"
          password={true}
          secureTextEntry={true}
          secureTextEntry={mostrar ? false : true}
          onChange={(e) => onChange(e, "password")}
        />
        <Icon
          type="material-community-icon"
          name={mostrar ? "visibility" : "visibility-off"}
          containerStyle={styles.border}
          onPress={() => setMostrar(!mostrar)}

        />
      </View>
      <View style={styles.boxLogin}>

        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Repetir contraseña"
          password={true}
          secureTextEntry={mostrar2 ? false : true}
          onChange={(e) => onChange(e, "repeatedPassword")}
        />

        <Icon
          type="material-community-icon"
          name={mostrar2 ? "visibility" : "visibility-off"}
          containerStyle={styles.border}
          onPress={() => setMostrar2(!mostrar2)}
        />
      </View>
      <View style={styles.centrar}>

        <Button
          title="Registrar"
          buttonStyle={styles.btnForm}
          onPress={onSubmit}
        />
      </View>

    </View>
  );
}

function valoreDefault() {
  return {
    email: "",
    password: "",
    repeatedPassword: "",
  };
}

