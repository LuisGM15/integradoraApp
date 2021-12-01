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

export default function ListaVacantes(propiedades) {
  const { vacantes } = propiedades;
  return (
    <View>
      {size(vacantes) > 0 ? (
        <FlatList
          data={vacantes}
          renderItem={(vacantes) => <Vacantes vacantes={vacantes} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.vacantes}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando vacantes</Text>
        </View>
      )}
    </View>
  );
}

function Vacantes(propiedades) {
  const { vacantes } = propiedades;
  const { titulo, descripcion, horario, pago, requisitos, tokenUser } =
    vacantes.item;
  const navegacion = useNavigation();

  const consultarSucursal = () => {
    navegacion.navigate("ver_sucursal", { id, nombre });
  };

  return (
    <TouchableOpacity onPress={consultarSucursal}>
      <Text style={styles.nombre}>{titulo}</Text>
      <Text style={styles.nombre}>{descripcion}</Text>
      <Text style={styles.nombre}>{horario}</Text>
      <Text style={styles.nombre}>{pago}</Text>
      <Text style={styles.nombre}>{requisitos}</Text>
      <Text style={styles.nombre}>{tokenUser}</Text>
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
