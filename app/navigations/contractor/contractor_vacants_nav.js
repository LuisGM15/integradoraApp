import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Contractor_business from "../../screens/contractor/contractor_business";
import Contractor_Vacants from "../../screens/contractor/contractor_vacants";
import Contractor_Vacants_Add from "../../screens/contractor/contrator_vacants_add";

import "../../utils/globals";

const Stack = createNativeStackNavigator();

export default function Contractor_vacants_nav() {
  return (
    <Stack.Navigator
      initialRouteName="vacants"
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
        name="vacants"
        component={Contractor_Vacants}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="vacants_add"
        component={Contractor_Vacants_Add}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
