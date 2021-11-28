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
  /* const [sex, setSex] = useState("");
  var sisi = ""; */

  function onPressRadioButton(radioButtonsArray) {
    //radioButton
    setRadioButtons(radioButtonsArray);
    /* console.log(radioButtonsArray["label"]); */
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const _fecha = moment(date).format("DD/MM/YYYY");
    /* console.warn("A date has been picked: ", date); */
    console.log(_fecha);
    setDoc({ ...doc, nacimiento: _fecha });
    hideDatePicker();
  };

  //Escribir en nuestro json "datos"
  const onChange = (e, type) => {
    setDoc({ ...doc, [type]: e.nativeEvent.text });
  };
  const Save = () => {
    console.log("--------------------------------------------------------");
    //cCONSULTA LA COLLRECION DE CUENTAS
    db.collection("accounts")
      .get()
      .then((request) => {
        //RECORREMOS LOS DOCUMENTOS EN CUENTAS
        request.forEach((item) => {
          //PREGUNTA SI COICIDE EL DOCUEMNTO RECORRIDO CON EL UID DEL USUARIO ACTIVO
          if (item.data()["tokenUser"] === firebase.auth().currentUser.uid) {
            //SI LO ENCUENTRA REGISTRA LOS DATOS DE USUARIO
            console.log("coincide: " + item.id);
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
              })
              .then(() => {
                toastRef.current.show("Datos modificados");
              });
          }
        });
      });
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Input
          placeholder="Apellido paterno"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "paterno")}
        />
        <Input
          placeholder="Apellido materno"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "materno")}
        />
        <Input
          placeholder="Nombre(s)"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "nombres")}
        />
        <Input
          placeholder="Número de teléfono"
          containerStyle={styles.inputForm}
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
        <Picker
          containerStyle={styles.inputForm}
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue);
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
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
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

const styles = StyleSheet.create({
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
