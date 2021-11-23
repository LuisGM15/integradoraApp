import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
/* Importaciones de mis pantallas */
import Busquedas from "../screens/Busquedas";
import RutasCuentas from "./RutasCuenta";
import Favoritos from "../screens/Favoritos";
import RutasSucursales from "./RutasSucursales";
import TopSucursales from "../screens/TopSucursales";

const Tab = createBottomTabNavigator();

export default function Navegacion() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="cuenta"
        tabBarStyle={{
          //Color del tecto e icono cuando no esta activado
          tabBarInactiveTintColor: "#52585E",
          //Color del tecto e icono cuando esta activado
          tabBarActiveTintColor: "#00a680",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => opciones(route, color),
        })}
      >
        <Tab.Screen
          name="busquedas"
          component={Busquedas}
          options={{ title: "Busquedas" }}
        />
        <Tab.Screen
          name="cuenta"
          component={RutasCuentas}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="favoritos"
          component={Favoritos}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="sucursales"
          component={RutasSucursales}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="topSucursales"
          component={TopSucursales}
          options={{ title: "TopSucursales" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function opciones(ruta, color) {
  let iconName;
  switch (ruta.name) {
    case "sucursales":
      iconName = "home";
      break;
    case "favoritos":
      iconName = "favorite";
      break;
    case "busquedas":
      iconName = "search";
      break;
    case "cuenta":
      iconName = "person";
      break;
    case "topSucursales":
      iconName = "show-chart";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-comunity" name={iconName} size={22} color={color} />
  );
}
