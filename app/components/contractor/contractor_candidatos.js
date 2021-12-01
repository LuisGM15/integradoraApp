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
import "../../utils/styles";
import { Card } from "react-native-elements/dist/card/Card";



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
    <Card containerStyle={styles.tarjeta}>
      <TouchableOpacity onPress={consultarSucursal}>
        <View style={styles.box}>
          <View>
            <Image source={require('../../utils/images/anonimo.png')} style={styles.imagen}></Image>
          </View>
          <View style={styles.boxC}>
            <Text style={styles.titulo}>{nombres + " " + paterno + " " + materno}</Text>
            <View style={styles.linea} />
            <Text style={styles.subtitulo}>{sexo}</Text>
            <Text style={styles.subtitulo}>{telefono}</Text>
            <Text style={styles.subtitulo}>{estudios}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>

  );
}

