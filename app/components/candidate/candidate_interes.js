import React, { useState } from "react"; //useState para radioButton
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input, Icon, Button } from "react-native-elements";




export default function Candidate_Profile_Form() {
    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <Input
                    placeholder="Habilidades, conocimientos"
                    containerStyle={styles.inputForm}
                />
                {/* <Button
        title="Registrar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      /> */}
                {/*  <Icon
                    reverse
                    type="material_community"
                    name="add"
                    color="#0A6ED3"
                    containerStyle={styles.btn}
                    //Vinculamos el envió a la ruta agregar-suc
                    onPress={() => Send()}
                /> */}
            </View>
        </ScrollView>
    );


}

const styles = StyleSheet.create({
    formContainer: {
        /*  flex: 1, */
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