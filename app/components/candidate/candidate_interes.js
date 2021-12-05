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
const db = firebase.firestore(firebaseApp);

export default function Candidate_Profile_Form() {
  const ArrayInte = [];
  const [arreglo, setArreglo] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Medicina");
  const [idColecction, setIdCol] = useState([]);
  const [habilidades, sethabilidades] = useState([]);

  /* useFocusEffect(
    useCallback(() => {
      const arrHabilidades = [];
      db.collection("accounts")
        .doc(idColecction)
        .collection("intereses")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            const habilidad = doc.data();
            habilidad.id = doc.id;
            arrHabilidades.push(habilidad);
          });
          sethabilidades(arrHabilidades);
        });
    }, [])
  ); */

  useEffect(() => {
    console.log("EFFECT");
    db.collection("accounts")
      .get()
      .then((request) => {
        //RECORREMOS LOS DOCUMENTOS EN CUENTAS
        request.forEach((item) => {
          //PREGUNTA SI COICIDE EL DOCUEMNTO RECORRIDO CON EL UID DEL USUARIO ACTIVO
          if (item.data()["tokenUser"] === firebase.auth().currentUser.uid) {
            setIdCol(item.id);
            console.log(idColecction);
          }
        });
      });
  }, []);

  function Send(_habilidad) {
    var ban = false;
    var idBorrar = "";
    /* db.collection("accounts").doc(idColecction).collection("intereses").add({
      nombre: _habilidad,
    }); */
    db.collection("accounts")
      .doc(idColecction)
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
            .doc(idColecction)
            .collection("intereses")
            .doc(idBorrar)
            .delete()
            .then((req) => {
              console.log("ELIMINADO---------------------------");
            });
        } else {
          /* SI NO EXISTE LA AGREGA */
          db.collection("accounts")
            .doc(idColecction)
            .collection("intereses")
            .add({
              nombre: _habilidad,
            })
            .then((request3) => {
              console.log("GUARDADO-----------------------------------");
            })
            .catch((e) => {
              console.log("NO SE ARMOOOOOO------------------------");
            });
        }
      });
  }

  function AddArreglo(val) {
    //EVITAMOS AGRAGAR EL VALOR "SELECCIONAR"
    if (val != "seleccionar") {
      setArreglo([...arreglo, val]);
    }
  }

  function clear() {
    setArreglo([]);
  }

  return (
    <View style={styles.vista}>
      <View style={styles.formContainer}>
        <View style={styles.renglon}>
          <Picker
            containerStyle={styles.inputForm}
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue);
              setSelectedValue(itemValue);
              AddArreglo(itemValue);
              Send(itemValue);
              /* ArrayInte.push(itemValue); */
            }}
          >
            <Picker.Item label="Seleccionar" value="seleccionar" />
            <Picker.Item label="Medicina" value="medicina" />
            <Picker.Item label="Arquitectura" value="arquitectura" />
            <Picker.Item label="Música" value="musica" />
            <Picker.Item label="Artes" value="artes" />
            <Picker.Item label="Danza" value="danza" />
          </Picker>
          <Button title="Borrar" onPress={clear} />
        </View>
        <Text> Seleccionados: </Text>
        {/* {size(arreglo) > 0 ? (
          <FlatList
            data={arreglo}
            renderItem={(arreglo) => <Text>{arreglo.item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>No hay seleccionados</Text>
        )} */}
      </View>
      <Icon
        reverse
        type="material_community"
        name="save"
        color="#0A6ED3"
        containerStyle={styles.btn}
        //Vinculamos el envió a la ruta agregar-suc
        onPress={() => Guardar()}
      />
    </View>
  );

  /* function ListaHailidades(props) {
    const { habilidades } = props;

    return (
      <FlatList
        data={habilidades}
        renderItem={(habilidades) => <Habilidad habilidades={habilidades} />}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  function Habilidad(propiedades) {
    const { habili } = propiedades;
    const { nombre } = habili.item;

    return <Text>{nombre}</Text>;
  } */
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  renglon: {
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
    backgroundColor: "#0A6ED3",
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
