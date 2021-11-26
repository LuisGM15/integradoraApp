import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/dashboard/Login";
import Registry from "../screens/dashboard/Registry";
import Contrator_index from "../screens/contractor/contractor_index";
import Candidate_index from "../screens/candidate/candidate_index";
import Candidate_Navigation from "./candidate_navigation";
import "../utils/globals";

const Stack = createNativeStackNavigator();

export default function Dashboard() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
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
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="registry"
          component={Registry}
          options={{ title: "Registro" }}
        />
        <Stack.Screen
          name="contractor_index"
          component={Contrator_index}
          options={{ title: "Bienvenido Contratista" }}
        />
        <Stack.Screen
          name="candidate_index"
          component={Candidate_Navigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
