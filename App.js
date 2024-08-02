import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/(home)/home';
import Ajustes from './src/screens/(home)/ajustes';
import Historial from './src/screens/(home)/historial';
import Perfil from './src/screens/(home)/perfil';
import Notificaciones from './src/screens/(home)/notificaciones';
import InicioJugar from './src/screens/(jugar)/inicioJugar';
import IniciarSesion from './src/screens/(login)/iniciarSesion';
import MostrarJugadores from './src/screens/(jugar)/mostrarJugadores';
import Registro from './src/screens/(login)/registro';
import OlvidasteContraseña from './src/screens/(login)/olvidasteContraseña';
import IngresarCodigo from './src/screens/(login)/ingresarCodigo';
import CrearNuevaContraseña from './src/screens/(login)/crearNuevaContraseña';
import ContraseñaExitosa from './src/screens/(login)/contraseñaExitosa';
import Amigos from './src/screens/(home)/amigos';
import NavbarHigh from './src/components/navbarHigh';

// Estado de autenticación simulado
const isAuthenticated = true; // Cambia esto para simular autenticación

const LoginStack = createStackNavigator();
const TabBarStack = createStackNavigator();
const NavBarStack = createStackNavigator();
const AppStack = createStackNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Registro" component={Registro} />
      <LoginStack.Screen name="IniciarSesion" component={IniciarSesion} />
      <LoginStack.Screen name="OlvidasteContraseña" component={OlvidasteContraseña} />
      <LoginStack.Screen name="IngresarCodigo" component={IngresarCodigo} />
      <LoginStack.Screen name="CrearNuevaContraseña" component={CrearNuevaContraseña} />
      <LoginStack.Screen name="ContraseñaExitosa" component={ContraseñaExitosa} />
    </LoginStack.Navigator>
  );
}

function NavBarStackScreen() {
  return (
    <NavBarStack.Navigator screenOptions={{ headerShown: false }}>
      <NavBarStack.Screen name="Perfil" component={Perfil} />
      <NavBarStack.Screen name="Notificaciones" component={Notificaciones} />
    </NavBarStack.Navigator>
  );
}

function TabBarStackScreen() {
  return (
    <TabBarStack.Navigator screenOptions={{ headerShown: false }}>
      <TabBarStack.Screen name="Home" component={Home} />
      <TabBarStack.Screen name="Ajustes" component={Ajustes} />
      <TabBarStack.Screen name="Historial" component={Historial} />
    </TabBarStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <AppStack.Screen name="TabBar" component={TabBarStackScreen} />
            <AppStack.Screen name="NavBar" component={NavBarStackScreen} />
          </>
        ) : (
          <AppStack.Screen name="Login" component={LoginStackScreen} />
        )}
      </AppStack.Navigator>
=======
      <Stack.Navigator initialRouteName="Perfil" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Ajustes" component={Ajustes} />
        <Stack.Screen name="Historial" component={Historial} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Notifiaciones" component={Notificaciones} />
        <Stack.Screen name="InicioJugar" component={InicioJugar} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="IniciarSesion" component={IniciarSesion} />
        <Stack.Screen name="MostrarJugadores" component={MostrarJugadores} />
        <Stack.Screen name="OlvidasteContraseña" component={OlvidasteContraseña} />
        <Stack.Screen name="IngresarCodigo" component={IngresarCodigo} />
        <Stack.Screen name="CrearNuevaContraseña" component={CrearNuevaContraseña} />
        <Stack.Screen name="ContraseñaExitosa" component={ContraseñaExitosa} />
        <Stack.Screen name="Amigos" component={Amigos} />
        <Stack.Screen name="NavbarHigh" component={NavbarHigh}/>
      </Stack.Navigator>
>>>>>>> d674c22ce84166c301d6b1249236e05a418a42e9
    </NavigationContainer>
  );
}

  /*
        <LoginStack.Screen name="InicioJugar" component={InicioJugar} />
        <LoginStack.Screen name="MostrarJugadores" component={MostrarJugadores} />
        <LoginStack.Screen name="Amigos" component={Amigos} />
  */