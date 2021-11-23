import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/dashboard/Login";
import Registry from "../screens/dashboard/Registry";
import Contrator_index from "../screens/contractor/contractor_index";

const Stack = createNativeStackNavigator();

export default function Dashboard() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "darkslateblue",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
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
          name="contrator_index"
          component={Contrator_index}
          options={{ title: "Bienvenido" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
