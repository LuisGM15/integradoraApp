import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";

export default function Login() {
  const [mostrar, setMostrar] = useState(false);
  const [datos, setDatos] = useState(valoresDefault);
  const navigation = useNavigation();

  const onSubmit = () => {
    navigation.navigate("contrator_index");
    console.log(datos);
  };

  const onChange = (e, type) => {
    setDatos({ ...datos, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community-icon"
            name="alternate-email"
            iconStyle={styles.icono}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={true}
        secureTextEntry={mostrar ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community-icon"
            name={mostrar ? "visibility" : "visibility-off"}
            iconStyle={styles.icono}
            onPress={() => setMostrar(!mostrar)}
          />
        }
      />
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        /* Al dar click activamos el método onSubmit */
        onPress={onSubmit}
      />
      <Text style={styles.textRegistrar}>
        ¿Aún no tienes una cuenta?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("registry")}
        >
          Registrate
        </Text>
      </Text>
    </View>
  );
}

function valoresDefault() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
    justifyContent: "center",
    /* flex: 1,
    alignItems: "center",
    justifyContent: "center", */
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    width: "100%",
  },
  btn: {
    backgroundColor: "#0A6ED3",
  },
  icono: {
    color: "#c1c1c1",
  },
  textRegistrar: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  link: {
    color: "#0A6ED3",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#0A6ED3",
    margin: 40,
  },
});
