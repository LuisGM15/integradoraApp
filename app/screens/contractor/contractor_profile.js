import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Contractor_Profile() {
  const navegacion = useNavigation();
  return (
    <View style={styles.vista}>
      <Text>MI PERFILS</Text>
      <Icon
        reverse
        type="material_community"
        name="edit"
        color="#0A6ED3"
        containerStyle={styles.btn}
        //Vinculamos el envió a la ruta agregar-suc
        onPress={() => navegacion.navigate("profle_edit")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#FFFF",
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
