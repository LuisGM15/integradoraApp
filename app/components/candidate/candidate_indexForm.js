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

export default function Candidate_indexForm(propiedades) {
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
    <Card containerStyle={styles.tarjeta}>
      <TouchableOpacity onPress={consultarSucursal}>
        <View style={styles.boxC}>
          <Text style={styles.titulo}>{titulo}</Text>
          <View style={styles.linea} />
          <Text style={styles.concepto}>Descripción: </Text>
          <Text style={styles.subtitulo}>{descripcion}</Text>
          <Text style={styles.concepto}>Requerimientos: </Text>
          <Text style={styles.subtitulo}>{requisitos}</Text>
          <Text style={styles.concepto}>Horario: </Text>
          <Text style={styles.subtitulo}>{horario}</Text>
          <Text style={styles.concepto}>Sueldo: </Text>
          <Text style={styles.subtitulo}>{"$" + pago}</Text>
          {/* <Text style={styles.nombre}>{tokenUser}</Text> */}
        </View>
      </TouchableOpacity>
    </Card>
  );
}
