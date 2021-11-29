import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Contractor_business from "../../screens/contractor/contractor_business";
import Contractor_Edit_Business from "../../components/contractor/contractor_edit_business";

import "../../utils/globals";

const Stack = createNativeStackNavigator();

export default function Contractor_business_nav() {
  return (
    <Stack.Navigator
      initialRouteName="business"
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
        name="business"
        component={Contractor_business}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="business_edit"
        component={Contractor_Edit_Business}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
