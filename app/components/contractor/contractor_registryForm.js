import React, { useState } from "react"; //useState para radioButton
import { View, Text, Picker, StyleSheet, ScrollView } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import moment from "moment";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
import "../../utils/globals";

export default function Contractor_RegistryForm(toast) {
  const [selectedValue, setSelectedValue] = useState("Selecciona");
  const [datos, setDatos] = useState(valoreDefault);
  const { toastRef } = toast;

  const Guardar = () => {
    console, console.log(datos);
    //CONSULTA LA COLECCION DE ACCOUNTS
    db.collection("accounts")
      .get()
      .then((request) => {
        request.forEach((item) => {
          //CONSULTA SI EL DOC EN TURNO COINCIDE CON EL USUARIO ACTIVO
          if (item.data()["tokenUser"] === firebase.auth().currentUser.uid) {
            //SI LO ENCUENTRA INSERTA LA EMPRESA
            db.collection("negocio")
              .add({
                nombre: datos.nombre,
                rfc: datos.rfc,
                telefono: datos.telefono,
                area: datos.area,
                tokenUser: firebase.auth().currentUser.uid,
              })
              .then((request) => {
                /* POSTERIOR AL REGISTRO DEL NEGOCIO, SE INSEERTA LA DIRECCION */
                db.collection("negocio")
                  .doc(request.id)
                  .collection("direccion")
                  .add({
                    numero: datos.numero,
                    calle: datos.calle,
                    colonia: datos.colonia,
                    ciudad: datos.ciudad,
                    estado: datos.estado,
                  })
                  .then(() => {
                    db.collection("accounts")
                      .doc(item.id)
                      .update({ rol: "contractor" })
                      .then(() => {
                        toastRef.current.show("Datos modificados");
                      });
                  });
              });
          }
        });
      });
  };

  function valoreDefault() {
    return {
      nombre: "",
      rfc: "",
      telefono: "",
      calle: "",
      numero: "",
      cp: "",
      colonia: "",
      ciudad: "",
      estado: "",
      area: "",
    };
  }

  const onChange = (e, type) => {
    setDatos({ ...datos, [type]: e.nativeEvent.text });
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text> Contractor_Registry !!</Text>

        <Input
          placeholder="Nombre"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "nombre")}
        />
        <Input
          placeholder="RFC"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "rfc")}
        />
        <Input
          placeholder="Teléfono"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "telefono")}
        />
        <Input
          placeholder="Calle"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "calle")}
        />
        <Input
          placeholder="Número"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "numero")}
        />
        <Input
          placeholder="Colonia"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "colonia")}
        />
        <Input
          placeholder="C P"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "cp")}
        />
        <Input
          placeholder="Ciudad"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "ciudad")}
        />
        <Input
          placeholder="Estado"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "estado")}
        />
        <Text> Area de trabajo</Text>

        <Picker
          containerStyle={styles.picker_style}
          selectedValue={selectedValue}
          style={{ height: 80, width: 300 }}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue);
            setDatos({ ...datos, area: itemValue });
            setSelectedValue(itemValue);
          }}
        >
          <Picker.Item label="Área de la salud" value="salud" />
          <Picker.Item label="Educación" value="educacion" />
          <Picker.Item label="Arquitectura" value="arquitectura" />
          <Picker.Item label="Ingenieria informática" value="informatica" />
          <Picker.Item label="Química" value="quimica" />
        </Picker>
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
