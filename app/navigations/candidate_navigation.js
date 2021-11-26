import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import "../utils/globals";
/* Importaciones de mis pantallas */
import Candidate_index from "../screens/candidate/candidate_index";
import Candidate_profile from "../screens/candidate/candidate_profile";

const Tab = createBottomTabNavigator();

/* global.color_principal */
export default function Candidate_Navigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Cuentas"
      tabBarStyle={{
        //Color del tecto e icono cuando no esta activado
        tabBarInactiveTintColor: "#52585E",
        //Color del tecto e icono cuando esta activado
        tabBarActiveTintColor: "#00a680",
        backgroundColor: global.color_principal,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => opciones(route, color),
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: global.color_principal,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={Candidate_index}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name="perfil"
        component={Candidate_profile}
        options={{ title: "Mi perfil" }}
      />
    </Tab.Navigator>
  );
}

function opciones(ruta, color) {
  let iconName;
  switch (ruta.name) {
    case "home":
      iconName = "home";
      break;
    case "perfil":
      iconName = "favorite";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-comunity" name={iconName} size={22} color={color} />
  );
}
