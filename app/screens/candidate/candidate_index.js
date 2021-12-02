import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
const db = firebase.firestore(firebaseApp);
import Candidate_indexForm from "../../components/candidate/candidate_indexForm";

export default function Candidate_index() {
  const navegacion = useNavigation();
  const [vacantes, setVacantes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const arrVacantes = [];
      db.collection("vacantes")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            const vacante = doc.data();
            vacante.id = doc.id;
            arrVacantes.push(vacante);
          });
          setVacantes(arrVacantes);
        });
    }, [])
  );

  const subirImagenesStorage = async () => {
    const imagenesBlob = [];
    await Promise.all(
      map(imagenes, async (imagen) => {
        const response = await fetch(imagen);
        const blob = await response.blob();
        const ref = firebase.storage().ref("accounts").child(uuid());
        await ref.put(blob).then(async (resultado) => {
          await firebase
            .storage()
            .ref(`sucursales/${resultado.metadata.name}`)
            .getDownloadURL()
            .then((urlFoto) => {
              imagenesBlob.push(urlFoto);
            });
        });
      })
    );
    return imagenesBlob;
  };

  return (
    <View style={styles.vista}>
      <Candidate_indexForm vacantes={vacantes} />
      <Icon
        reverse
        type="material_community"
        name="add"
        color="#0A6ED3"
        containerStyle={styles.btn}
        //Vinculamos el envió a la ruta agregar-suc
        onPress={() => navegacion.navigate("agregar-suc")}
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
