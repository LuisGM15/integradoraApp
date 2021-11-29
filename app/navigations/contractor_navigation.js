import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import "../utils/globals";
/* Importaciones de mis pantallas */
import Contractor_index from "../screens/contractor/contractor_index";
import Contractor_business_nav from "../navigations/contractor/contractor_business_nav";
import Contractor_profile_nav from "./contractor/contractor_profile_nav";
import Contractor_vacants_nav from "./contractor/contractor_vacants_nav";
const Tab = createBottomTabNavigator();

export default function Contrator_navigation() {
  return (
    <Tab.Navigator
      initialRouteName="home_contractor"
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
        name="home_contractor"
        component={Contractor_index}
        options={{
          title: "Inicio",
        }}
      />
      <Tab.Screen
        name="contractor_vacantes"
        component={Contractor_vacants_nav}
        options={{ title: "Vacantes" }}
      />
      <Tab.Screen
        name="perfil_contractor"
        component={Contractor_profile_nav}
        options={{ title: "Mi perfil" }}
      />
      <Tab.Screen
        name="negocio_contractor_nav"
        component={Contractor_business_nav}
        options={{ title: "Mi negocio" }}
      />
    </Tab.Navigator>
  );
}

function opciones(ruta, color) {
  let iconName;
  switch (ruta.name) {
    case "home_contractor":
      iconName = "home";
      break;
    case "perfil":
      iconName = "favorite";
      break;
    case "intereses":
      iconName = "favorite";
      break;
    case "Contratista":
      iconName = "favorite";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-comunity" name={iconName} size={22} color={color} />
  );
}

const styles = StyleSheet.create({
  icon: { paddingRight: 20 },
});
