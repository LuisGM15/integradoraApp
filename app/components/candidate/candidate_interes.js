import { size } from "lodash";
import React, { useState, useEffect, useCallback } from "react"; //useState para radioButton
import {
  View,
  Text,
  Picker,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Input, Icon, Button } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import Lista_de_habilidades from "./lista_habilidades";
const db = firebase.firestore(firebaseApp);
import Candidate_Interes_2 from "./candidate_interes_2";

export default function Candidate_Profile_Form() {
  const [selectedValue, setSelectedValue] = useState("Medicina");
  const [idColecction, setIdCol] = useState();
  const [intereses, setIntereses] = useState([]);

  useEffect(() => { }, []);

  useFocusEffect(
    useCallback(() => {
      db.collection("accounts")
        .get()
        .then((res) => {
          res.forEach((item) => {
            if (item.data()["tokenUser"] == firebase.auth().currentUser.uid) {
              console.log("encontrado");
              const arrInteres = [];
              console.log(item.id);
              db.collection("accounts")
                .doc(item.id)
                .collection("intereses")
                .get()
                .then((request) => {
                  request.forEach((doc) => {
                    const interes = doc.data();
                    interes.id = doc.id;
                    arrInteres.push(interes);
                  });
                  setIntereses(arrInteres);
                  console.log(intereses);
                });
            }
          });
        });
    }, [])
  );

  const _si = () => {
    console.log(intereses);
  };

  const Send = (_habilidad) => {
    var ban = false;
    var idBorrar = "";
    if (_habilidad != "seleccionar") {
      db.collection("accounts")
        .get()
        .then((res) => {
          res.forEach((item) => {
            if (item.data()["tokenUser"] == firebase.auth().currentUser.uid) {
              console.log("encontrado");
              ///////
              db.collection("accounts")
                .doc(item.id)
                .collection("intereses")
                .get()
                .then((request2) => {
                  request2.forEach((item2) => {
                    if (item2.data()["nombre"] === _habilidad) {
                      /* SI LA ENCONTRÓ CAMBIA LA BANDERA DE ESTADO */
                      idBorrar = item2.id;
                      ban = true;
                    }
                  });
                  /* SI YA EXISTE LA HABILIDAD LA BORRA*/
                  if (ban) {
                    console.log("YA EXISTE");
                    db.collection("accounts")
                      .doc(item.id)
                      .collection("intereses")
                      .doc(idBorrar)
                      .delete()
                      .then((req) => {
                        console.log("ELIMINADO---------------------------");
                      });
                  } else {
                    /* SI NO EXISTE LA AGREGA */
                    db.collection("accounts")
                      .doc(item.id)
                      .collection("intereses")
                      .add({
                        nombre: _habilidad,
                      })
                      .then((request3) => {
                        console.log(
                          "GUARDADO-----------------------------------"
                        );
                      })
                      .catch((e) => {
                        console.log("NO SE ARMOOOOOO------------------------");
                      });
                  }
                });
            }
          });
        });
    }
    /////////////////////
  };

  return (
    <View style={styles.vista}>
      <View style={styles.formContainer}>
        <View style={styles.renglon}>
          <Picker
            containerStyle={styles.inputForm}
            /*  selectedValue={selectedValue} */
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue);
              setSelectedValue(itemValue); /*
              AddArreglo(itemValue);*/
              Send(itemValue);
            }}
          >
            <Picker.Item label="Seleccionar" value="seleccionar" />
            <Picker.Item label="Medicina" value="medicina" />
            <Picker.Item label="Arquitectura" value="arquitectura" />
            <Picker.Item label="Música" value="musica" />
            <Picker.Item label="Artes" value="artes" />
            <Picker.Item label="Danza" value="danza" />
          </Picker>
          <Button title="Borrar" onPress={_si} style={styles.btn} />
        </View>
        <Text> Seleccionados: </Text>
        <Candidate_Interes_2 intereses={intereses} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  renglon: {
    paddingBottom: 30,
    paddingTop: 50,
    flexDirection: "row",
  },
  formContainer: {
    /*  flex: 1, */
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingLeft: 29,
    paddingRight: 20,
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
    backgroundColor: "#FFFF",
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
