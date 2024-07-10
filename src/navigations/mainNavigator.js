import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/(home)/home';
import Ajustes from '../screens/(home)/../screens/(home)/ajustes';
import Perfil from '../screens/(home)/perfil';
import Historial from '../screens/(home)/historial';
import Notifiaciones from '../screens/(home)/notificaciones';

const HomeStack = createStackNavigator();

const HomeNavigation = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen name="ajustes" component={Ajustes} />
      <HomeStack.Screen name="perfil" component={Perfil} />
      <HomeStack.Screen name="historial" component={Historial} />
      <HomeStack.Screen name="notifiaciones" component={Notifiaciones} />
    </HomeStack.Navigator>
  );
  