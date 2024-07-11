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
import RegistrarUser from './src/screens/(login)/registrarUser';
import IniciarSesion from './src/screens/(login)/iniciarSesion';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Ajustes" component={Ajustes} />
        <Stack.Screen name="Historial" component={Historial} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Notifiaciones" component={Notificaciones} />
        <Stack.Screen name="InicioJugar" component={InicioJugar} />
        <Stack.Screen name="RegistrarUser" component={RegistrarUser} />
        <Stack.Screen name="IniciarSesion" component={IniciarSesion} />
      </Stack.Navigator>
    </NavigationContainer>
  );}