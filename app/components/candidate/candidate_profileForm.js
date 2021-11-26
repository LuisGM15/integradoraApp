import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function Candidate_Profile_Form() {
  return (
    <View style={styles.formContainer}>
      <Input placeholder="Apellido paterno" containerStyle={styles.inputForm} />
      <Input placeholder="Apellido materno" containerStyle={styles.inputForm} />
      {/* <Button
        title="Registrar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    /* flex: 1, */
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
});
