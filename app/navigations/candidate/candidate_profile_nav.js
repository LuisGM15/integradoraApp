import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Contractor_Profile from "../../screens/contractor/contractor_profile";
import Contractor_profile_edit from "../../screens/contractor/contractor_profile_edit";
import Perfil_mostrar from "../../components/candidate/candidate_profileForm_mostrar";
import "../../utils/globals";

const Stack = createNativeStackNavigator();

export default function Contractor_profile_nav() {
  return (
    <Stack.Navigator
      initialRouteName="profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: global.color_principal,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="candidate_profle"
        component={Perfil_mostrar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="candidate_profle_edit"
        component={Contractor_profile_edit}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
