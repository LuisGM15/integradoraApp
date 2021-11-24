import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { validarEmail } from "../../utils/validaciones";

import firebase from "firebase";

export default function Registry_Form(toast) {
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);
  const [datos, setDatos] = useState(valoreDefault);
  const { toastRef } = toast;
  const navigation = useNavigation();

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
      firebase
        .auth()
        .createUserWithEmailAndPassword(datos.email, datos.password)
        .then((respuesta) => {
          console.log(respuesta);
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
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community-icon"
            name="alternate-email"
            iconStyle={styles.icono}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={true}
        secureTextEntry={mostrar ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community-icon"
            name={mostrar ? "visibility" : "visibility-off"}
            iconStyle={styles.icono}
            onPress={() => setMostrar(!mostrar)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={mostrar2 ? false : true}
        onChange={(e) => onChange(e, "repeatedPassword")}
        rightIcon={
          <Icon
            type="material-community-icon"
            name={mostrar2 ? "visibility" : "visibility-off"}
            iconStyle={styles.icono}
            onPress={() => setMostrar2(!mostrar2)}
          />
        }
      />
      <Button
        title="Registrar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
      />
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

const styles = StyleSheet.create({
  formContainer: {
    /* flex: 1, */
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
  btn: {
    backgroundColor: "#0A6ED3",
  },
  icono: {
    color: "#c1c1c1",
  },
});
