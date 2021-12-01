import { size } from "lodash";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function ListaCandidatos(propiedades) {
  const { candidatos } = propiedades;
  return (
    <View>
      {size(candidatos) > 0 ? (
        <FlatList
          data={candidatos}
          renderItem={(candidatos) => <Candidatos candidatos={candidatos} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.candidatos}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando candidatos</Text>
        </View>
      )}
    </View>
  );
}

function Candidatos(propiedades) {
  const { candidatos } = propiedades;
  const { nombres, paterno, materno, sexo, telefono, estudios } =
    candidatos.item;
  const navegacion = useNavigation();

  const consultarSucursal = () => {
    navegacion.navigate("ver_sucursal", { id, nombre });
  };

  return (
    <TouchableOpacity onPress={consultarSucursal}>
      <Text style={styles.nombre}>{nombres}</Text>
      <Text style={styles.nombre}>{paterno}</Text>
      <Text style={styles.nombre}>{materno}</Text>
      <Text style={styles.nombre}>{sexo}</Text>
      <Text style={styles.nombre}>{telefono}</Text>
      <Text style={styles.nombre}>{estudios}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  vacantes: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  lista: {
    flexDirection: "row",
    margin: 10,
  },
  viewImagen: {
    marginRight: 15,
  },
  imagen: {
    width: 80,
    height: 80,
  },
  nombre: {
    fontWeight: "bold",
  },
  direccion: {
    paddingTop: 2,
    color: "grey",
  },
  descripcion: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
});
