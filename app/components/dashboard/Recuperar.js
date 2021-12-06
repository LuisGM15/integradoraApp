import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";


import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Recuperar() {
    const [correo, setCorreo] = useState();

    useEffect(() => {
        setCorreo(firebase.auth().currentUser.email)
    }, []);
    return (
        <View style={styles.formulario}>
            <View style={styles.centrar}>
                <Text style={styles.concepto}>Se ha enviado la nueva contraseña al correo: </Text>

                <Text style={styles.titulo}>{correo}</Text>
            </View>
        </View>
    );
}
