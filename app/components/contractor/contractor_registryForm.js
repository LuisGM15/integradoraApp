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
                numero: datos.numero,
                calle: datos.calle,
                colonia: datos.colonia,
                ciudad: datos.ciudad,
                estado: datos.estado,
                cp: datos.cp,
              })
              .then((request) => {
                /* POSTERIOR AL REGISTRO DEL NEGOCIO, SE ACTUALZIA EL ROL */
                db.collection("accounts")
                  .doc(item.id)
                  .update({ rol: "contractor" })
                  .then(() => {
                    toastRef.current.show("Datos modificados");
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
      <View style={styles.formulario}>

        <Input
          label="Nombre"
          labelStyle={styles.lab}
          style={styles.inp}
          onChange={(e) => onChange(e, "nombre")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="RFC"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "rfc")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Teléfono"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "telefono")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Calle"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "calle")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Número"
          onChange={(e) => onChange(e, "numero")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Colonia"
          onChange={(e) => onChange(e, "colonia")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="C P"
          onChange={(e) => onChange(e, "cp")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Ciudad"
          onChange={(e) => onChange(e, "ciudad")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Estado"
          onChange={(e) => onChange(e, "estado")}
        />
        <View style={styles.centrar}>
          <Text style={styles.concepto}> Area de trabajo</Text>
        </View>
        <View style={styles.centrar}>

          <Picker
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
            buttonStyle={styles.btnForm}
            onPress={Guardar}
          />
        </View>

      </View>
    </ScrollView>
  );
}

