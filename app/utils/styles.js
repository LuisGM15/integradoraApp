import { StyleSheet } from "react-native";

global.styles = StyleSheet.create({
    btnCepo: {

        paddingBottom: 20,
        paddingTop: 10
    },
    btnCerrar: {
        height: 45,
        width: 200,
        backgroundColor: "#29528E",
    },
    textOlvidar: {
        fontWeight: "bold",
        paddingBottom: 20
    },
    link: {
        color: "#29528E",
        fontWeight: "bold",
        fontSize: 15,

    },
    textRegistrar: {
        fontWeight: "bold",
        paddingTop: 40,
    },
    boxLogin: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    espacio: {
        height: 20,
    },
    imagenLogin: {
        width: 90,
        height: 90,
    },
    login: {
        paddingTop: 150,
        textAlignVertical: "center",
        padding: 25,
    },
    centrar: {
        justifyContent: "center",
        alignItems: "center"
    },
    btnForm: {
        backgroundColor: "#29528E",
        width: 200,
    },
    formulario: {
        padding: 25
    },
    lab: {
        color: "#29528E",
    },
    inp: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 15,
    },
    boxMiPerfil: {
        flexDirection: "row",
        paddingTop: 10,

    },
    miPerfilSub: {
        fontWeight: "bold",
        color: "#000000",
        paddingLeft: 2

    },
    miPerfil: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#000000",
        paddingTop: 20,
    },
    imagenP: {
        width: 90,
        height: 90,
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
    vista: {
        flex: 1,
        backgroundColor: "#FFFF",
        justifyContent: "center",
        alignItems: "center"


    },
    vista2: {
        flex: 1,
        backgroundColor: "#FFFF",
        /* justifyContent: "center", */
        alignItems: "center"


    },
    concepto: {
        color: "#29528E",
        fontWeight: "bold",

    },
    linea: {
        borderBottomColor: '#29528E',
        borderBottomWidth: 1,
    },
    titulo: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#000000"
    },
    subtitulo: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000000"
    },
    boxC: {
        paddingLeft: 10
    },
    box: {
        flexDirection: "row"
    },
    tarjeta: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        borderColor: "#FFFFFF",
    },
    /* fin */
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
        width: 60,
        height: 60,
    },
    nombre: {
        fontWeight: "bold",
        color: "#000000"
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