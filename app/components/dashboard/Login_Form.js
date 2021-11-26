import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { validarEmail } from "../../utils/validaciones";
import { size, isEmpty } from "lodash";
import "../../utils/globals";

import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Login_Form(toast) {
  const { toastRef } = toast;
  const [mostrar, setMostrar] = useState(false);
  const [datos, setDatos] = useState(valoresDefault);
  const navigation = useNavigation();

  const onSubmit = () => {
    if (isEmpty(datos.email) || isEmpty(datos.password)) {
      //console.log("No puedes dejar campos vacios");
      toastRef.current.show("No puedes dejar campos vacios");
    } else if (!validarEmail(datos.email)) {
      //console.log("Email no valido");
      toastRef.current.show("Email no valido");
    } else if (size(datos.password) < 6) {
      //console.log("La contraseña debe tener almenos 6 Caracteres");
      toastRef.current.show("La contraseña debe tener almenos 6 Caracteres");
    } else {
      //console.log("Iniciando sesión...");
      toastRef.current.show("Iniciando sesión...");
      /* Creamos nuestra promesa para la consulta a la BD */
      firebase
        .auth()
        .signInWithEmailAndPassword(datos.email, datos.password)
        .then((request) => {
          //Si los datos son correctos no debe enviar a nuestra screen de cuentas
          toastRef.current.show("¡Bienvenido!");
          queryUser(request["user"]["uid"]);
        })
        .catch((err) => {
          console.log(err);
          toastRef.current.show("Email o contraseña incorrecta");
        });
    }
  };

  /* cOMPROBAMOS EL TIPO DE ROL QUE TIENE EL USUARIO */
  const queryUser = (token) => {
    //CONSULTA A LA BDD
    db.collection("accounts")
      .get()
      .then((request) => {
        //RECORREMOS LA COLLECIÓN
        request.forEach((doc) => {
          // VERIFICA SI EL DOCUMENTO PERTENECE AL USUARIO LOGEADO
          if (token == doc.data()["tokenUser"]) {
            /* SI EL ID COINCIDE SE COMPRUEBA EL ROL */
            if (doc.data()["rol"] == "candidate") {
              //SI ES CANDIDATO....
              navigation.navigate("candidate_index");
            } else if (doc.data()["rol"] == "contractor") {
              //SI ES CONTRATISTA....
              navigation.navigate("contractor_index");
            }
          }
        });
      });
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
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        /* Al dar click activamos el método onSubmit */
        onPress={onSubmit}
      />
      <Text style={styles.textRegistrar}>
        ¿Aún no tienes una cuenta?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("registry")}
        >
          Registrate
        </Text>
      </Text>
    </View>
  );
}

function valoresDefault() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 200,
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
    justifyContent: "center",
    /* flex: 1,
    alignItems: "center",
    justifyContent: "center", */
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    width: "100%",
  },
  btn: {
    backgroundColor: global.color_principal,
  },
  icono: {
    color: "#c1c1c1",
  },
  textRegistrar: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  link: {
    color: "#0A6ED3",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#0A6ED3",
    margin: 40,
  },
});
