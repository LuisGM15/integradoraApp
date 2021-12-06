import React, { useState } from "react"; //useState para radioButton
import { View, Text, Picker, StyleSheet, ScrollView } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import RadioGroup from "react-native-radio-buttons-group"; // radioButton
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
import * as Permission from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import uuid from "random-uuid-v4";
import { map, size, filter } from "lodash";

//opciones de radiobutton
const radioButtonsData = [
  {
    id: "1",
    label: "Masculino",
    value: "masculino",
  },
  {
    id: "2",
    label: "Femenino",
    value: "femenino",
  },
];

export default function Candidate_Profile_Form(toast) {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData); //radioButton
  const [selectedValue, setSelectedValue] = useState("Primaria"); //
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [doc, setDoc] = useState(valoresDoc);
  const { toastRef } = toast;
  const [imagen, setImagen] = useState([]);
  const [url, setURL] = useState();

  function SubirImagen(propiedades) {
    const { toastRef, urls, setUrl } = propiedades;

    const seleccionar = async () => {
      const resultado = await Permission.askAsync(Permission.MEDIA_LIBRARY);

      if (resultado === "denied") {
        toastRef.current.show("Debes permitir el acceso a la galeria", 4000);
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        if (result.cancelled) {
          toastRef.current.show("Debes seleccionar una imagen", 3000);
        } else {
          console.log(
            "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          );

          /* setImage([...imagen, result.uri]); */
          setUrl(result.uri);
          console.log("asasas " + urls);
          /* console.log(imagen); */
        }
      }
    };

    return (
      <View style={styles.vistaImagenes}>
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.icono}
          onPress={seleccionar}
        />
      </View>
    );
  }

  const subirImagenesStorage = async () => {
    console.log("SI ENTRE----------------------------------------");
    /* const imagenesBlob = ""; */
    const imagenesBlob = [];

    const response = await fetch(url);
    const blob = await response.blob();
    const ref = firebase.storage().ref("Perfiles").child(uuid());
    await ref
      .put(blob)
      .then(async (resultado) => {
        console.log("si subio----------------------------------------");
        await firebase
          .storage()
          .ref(`Perfiles/${resultado.metadata.name}`)
          .getDownloadURL()
          .then((urlFoto) => {
            imagenesBlob.push(urlFoto);
          });
      })
      .catch((e) => {
        console.log("ERROR ENCONTRADO");
      });

    return imagenesBlob;
  };

  function onPressRadioButton(radioButtonsArray) {
    //radioButton
    setRadioButtons(radioButtonsArray);
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const _fecha = moment(date).format("DD/MM/YYYY");

    setDoc({ ...doc, nacimiento: _fecha });
    hideDatePicker();
  };

  //Escribir en nuestro json "datos"
  const onChange = (e, type) => {
    setDoc({ ...doc, [type]: e.nativeEvent.text });
  };
  const Save = () => {
    /* GUARDAR IMG EN STORAGE */
    subirImagenesStorage().then((resp) => {
      console.log("RESPPPP: " + resp);
      db.collection("accounts")
        .get()
        .then((request) => {
          //RECORREMOS LOS DOCUMENTOS EN CUENTAS
          request.forEach((item) => {
            //PREGUNTA SI COICIDE EL DOCUEMNTO RECORRIDO CON EL UID DEL USUARIO ACTIVO
            if (item.data()["tokenUser"] === firebase.auth().currentUser.uid) {
              //SI LO ENCUENTRA REGISTRA LOS DATOS DE USUARIO
              db.collection("accounts")
                .doc(item.id)
                .update({
                  paterno: doc.paterno,
                  materno: doc.materno,
                  nombres: doc.nombres,
                  telefono: doc.telefono,
                  sexo: doc.sexo,
                  estudios: doc.estudios,
                  nacimiento: doc.nacimiento,
                  imagen: resp,
                })
                .then(() => {
                  toastRef.current.show("Datos modificados");
                });
            }
          });
        });
    });

    //cCONSULTA LA COLLRECION DE CUENTAS
  };

  return (
    <ScrollView>
      <View style={styles.formulario}>
        <SubirImagen toast={toastRef} urls={url} setUrl={setURL} />

        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Apellido paterno"
          onChange={(e) => onChange(e, "paterno")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Apellido materno"
          onChange={(e) => onChange(e, "materno")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Nombre(s)"
          onChange={(e) => onChange(e, "nombres")}
        />
        <Input
          labelStyle={styles.lab}
          style={styles.inp}
          label="Número de teléfono"
          onChange={(e) => onChange(e, "telefono")}
        />
        <RadioGroup
          containerStyle={styles.inputForm}
          radioButtons={radioButtons}
          onPress={(e) => {
            e.forEach((val) => {
              if (val["selected"]) {
                setDoc({ ...doc, sexo: val["label"] });
              }
            });
          }}
        />
        {/* Selector de estudios */}
        <View style={styles.centrar}>

          <Picker
            containerStyle={styles.inputForm}
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              setDoc({ ...doc, estudios: itemValue });
              setSelectedValue(itemValue);
            }}
          >
            <Picker.Item label="Primaria" value="Primaria" />
            <Picker.Item label="Secundaria" value="Secundaria" />
            <Picker.Item label="Bachillerato" value="Bachillerato" />
            <Picker.Item label="Licenciatura" value="Licenciatura" />
            <Picker.Item label="Maestria" value="Maestria" />
          </Picker>
          {/* <Input
          placeholder="Habilidades, conocimientos"
          containerStyle={styles.inputForm}
        /> */}
          <Button title="Show Date Picker" buttonStyle={styles.btnForm}
            onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        {/* <Button
        title="Registrar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      /> */}
        <Icon
          reverse
          type="material_community"
          name="add"
          color="#0A6ED3"
          containerStyle={styles.btn}
          //Vinculamos el envió a la ruta agregar-suc
          onPress={() => Save()}
        />
      </View>
    </ScrollView>
  );

  function valoresDoc() {
    return {
      paterno: "",
      materno: "",
      nombres: "",
      telefono: "",
      sexo: "",
      estudios: "",
      nacimiento: "",
    };
  }
}

