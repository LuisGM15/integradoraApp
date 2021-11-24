import React, { useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Login_Form from "../../components/dashboard/Login_Form";
import Toast from "react-native-easy-toast";

export default function Registry() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      {/* <Image
        source={require("../../../assets/img/user.png")}
        resizeMethod="auto"
        style={styles.imagen}
      /> */}
      <View style={styles.formulario}>
        <Login_Form toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="top" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
});
