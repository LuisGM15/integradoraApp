import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { validarEmail } from "../../utils/validaciones";
import { size, isEmpty } from "lodash";
import "../../utils/globals";
import { Image } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";


import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
import { color } from "react-native-reanimated";
const db = firebase.firestore(firebaseApp);

export default function Login_Form(toast) {
  const { toastRef } = toast;
  const [mostrar, setMostrar] = useState(false);
  const [datos, setDatos] = useState(valoresDefault);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setDatos(valoresDefault);
      setDatos({ ...datos, email: "" }); setDatos({ ...datos, password: "" });
    }, [])
  );

  /*  useEffect(
 
     setDatos(valoresDefault)
 
   ); */

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
      /* setDatos({ ...datos, email: "" }); setDatos({ ...datos, password: "" }); */

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
    <View style={styles.login}>
      <View style={styles.centrar}>
        <Image source={require('../../utils/images/anonimo.png')} style={styles.imagenLogin}></Image>
      </View>
      <View style={styles.espacio}></View>
      <View style={styles.boxLogin}>
        <Input
          labelStyle={styles.lab}
          value={datos.email}
          style={styles.inp}
          label="Correo Electrónico"
          onChange={(e) => onChange(e, "email")}
        />
        <Icon
          name="alternate-email"
          containerStyle={styles.border}
        />
      </View>
      <View style={styles.boxLogin}>
        <Input
          value={datos.password}
          selectionColor="#29528E"
          label="Contraseña"
          labelStyle={styles.lab}
          style={styles.inp}
          password={true}
          secureTextEntry={true}
          secureTextEntry={mostrar ? false : true}
          onChange={(e) => onChange(e, "password")}
        />
        <Icon
          style={styles.iconsR}
          name={mostrar ? "visibility" : "visibility-off"}
          onPress={() => setMostrar(!mostrar)}
        />
      </View>
      <View style={styles.centrar}>
        <Text style={styles.textOlvidar}>
          ¿Olvidaste tu contraseña?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("recuperar")}
          >
            Recuperar
          </Text>
        </Text>
      </View>

      <View style={styles.centrar}>
        <Button
          title="Iniciar Sesión"
          buttonStyle={styles.btnForm}
          /* Al dar click activamos el método onSubmit */
          onPress={onSubmit}
        />
        <Text style={styles.textRegistrar}>
          ¿Aún no tienes una cuenta?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("registry")}
          >
            Regístrate
          </Text>
        </Text>
      </View>
    </View>
  );
}

function valoresDefault() {
  return {
    email: "",
    password: "",
  };
}
