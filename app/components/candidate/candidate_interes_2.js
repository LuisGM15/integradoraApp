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

export default function Candidate_Interes_2(props) {
  const { intereses } = props;
  return (
    <View>
      <FlatList
        data={intereses}
        renderItem={(intereses) => <Intereses intereses={intereses} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function Intereses(propiedades) {
  const { intereses } = propiedades;
  const { nombre } = intereses.item;

  return (
    <View style={styles.lista}>
      <View style={styles.viewImagen}></View>
      <View>
        <Text style={styles.nombre}>{nombre}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sucursales: {
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
