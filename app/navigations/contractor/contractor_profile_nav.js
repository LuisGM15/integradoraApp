import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Contractor_Profile from "../../screens/contractor/contractor_profile";
import Contractor_profile_edit from "../../screens/contractor/contractor_profile_edit";
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
        name="profle"
        component={Contractor_Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profle_edit"
        component={Contractor_profile_edit}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
