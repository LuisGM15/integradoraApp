import React, { useState } from "react"; //useState para radioButton
import { View, Text, Picker, StyleSheet, ScrollView } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import RadioGroup from "react-native-radio-buttons-group"; // radioButton
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

export default function Candidate_Profile_Form() {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData); //radioButton
  const [selectedValue, setSelectedValue] = useState("Primaria"); //
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [doc, setDoc] = useState(valoresDoc);
  const [sex, setSex] = useState("");
  var sisi = "";

  function onPressRadioButton(radioButtonsArray) {
    //radioButton
    setRadioButtons(radioButtonsArray);
    /* console.log(radioButtonsArray["label"]); */

    radioButtonsArray.forEach((doc) => {
      /* if (doc["selected"]) onChange("rb", doc["value"]); */
      if (doc["selected"]) {
        /* console.log(doc["label"]); */
        sisi = doc["label"];
        setSex(doc["label"]);
        console.log(sex);
        setDoc({ ...doc, ["sexo"]: sisi });
      }
    });
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  //Escribir en nuestro json "datos"
  const onChange = (e, type) => {
    setDoc({ ...doc, [type]: e.nativeEvent.text });
  };
  const Send = () => {
    console.log(doc);
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
          onPress={onPressRadioButton}
        />
        {/* Selector de estudios */}
        <Picker
          containerStyle={styles.inputForm}
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Primaria" value="primaria" />
          <Picker.Item label="Secundaria" value="secundaria" />
          <Picker.Item label="Bachillerato" value="bachillerato" />
          <Picker.Item label="Licenciatura" value="licenciatura" />
          <Picker.Item label="Maestria" value="maestria" />
        </Picker>
        <Input
          placeholder="Habilidades, conocimientos"
          containerStyle={styles.inputForm}
        />
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
          onPress={() => Send()}
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
      sexo: sex,
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
