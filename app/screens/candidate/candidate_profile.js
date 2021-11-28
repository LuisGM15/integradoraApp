import React, { useRef } from "react";
import { View, Text } from "react-native";
import Candidate_Profile_Form from "../../components/candidate/candidate_profileForm";
import Toast from "react-native-easy-toast";

export default function Candidate_profile() {
  const toastRef = useRef();

  return (
    <View>
      <Candidate_Profile_Form toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}
