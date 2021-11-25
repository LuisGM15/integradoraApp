import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
/* Importaciones de mis pantallas */
import Candidate_index from "../screens/candidate/candidate_index";
import Candidate_profile from "../screens/candidate/candidate_profile";

const Tab = createBottomTabNavigator();

export default function Candidate_Navigation() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="inicio">
        <Drawer.Screen name="inicio" component={Candidate_index} />
        <Drawer.Screen name="perfil" component={Candidate_profile} />
      </Drawer.Navigator>
      {/* <Tab.Navigator
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
      </Tab.Navigator> */}
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
