import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
const db = firebase.firestore(firebaseApp);
import Candidate_Profile_Form from "../../components/candidate/candidate_interes";

export default function Candidate_interests() {
  return (
    <View style={styles.vista}>
      <Text>...................</Text>
      <Candidate_Profile_Form />
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
});
