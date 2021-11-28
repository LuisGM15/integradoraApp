import React, { useRef } from "react";
import { View, Text } from "react-native";
import Contractor_RegistryForm from "../../components/contractor/contractor_registryForm";
import Toast from "react-native-easy-toast";

export default function Contractor_Registry() {
  const toastRef = useRef();
  return (
    <View>
      <Contractor_RegistryForm toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}
