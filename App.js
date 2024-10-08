import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/(home)/home';
import Ajustes from './src/screens/(ajustes)/ajustes';
import Clubes from './src/screens/(ajustes)/clubes';
import Terminos from './src/screens/(ajustes)/terminos';
import Historial from './src/screens/(home)/historial';
import Perfil from './src/screens/(home)/perfil';
import Notificaciones from './src/screens/(notificaciones)/notificaciones';
import IniciarSesion from './src/screens/(login)/iniciarSesion';
import Registro from './src/screens/(login)/registro';
import OlvidasteContraseña from './src/screens/(login)/olvidasteContraseña';
import IngresarCodigo from './src/screens/(login)/ingresarCodigo';
import CrearNuevaContraseña from './src/screens/(login)/crearNuevaContraseña';
import ContraseñaExitosa from './src/screens/(login)/contraseñaExitosa';
import InicioJugar from './src/screens/(jugar)/inicioJugar';
import MostrarJugadoresEquipo1 from './src/screens/(jugar)/mostrarJugadoresEquipo1';
import MostrarJugadoresEquipo2 from './src/screens/(jugar)/mostrarJugadoresEquipo2';
import PuntajeJugar from './src/screens/(jugar)/puntajeJugar';
import FinalJugar from './src/screens/(jugar)/finalJugar';
import Ranking from './src/screens/(home)/ranking';
import ConfirmarPartido from './src/screens/(notificaciones)/confirmarPartido';
import Sancion from './src/screens/(notificaciones)/sancion';
import Notificacion from './src/screens/(notificaciones)/notificacion';
import Global from './src/screens/(notificaciones)/global';
import ConfirmarPartidoTorneo from './src/screens/(notificaciones)/confirmarPartidoTorneo';
import { AuthProvider, useAuth } from './src/components/AuthProvider';


const LoginStack = createStackNavigator();
const TabBarStack = createStackNavigator();
const NavBarStack = createStackNavigator();
const HomeStack = createStackNavigator();
const JugarStack = createStackNavigator();
const AppStack = createStackNavigator();
const PerfilStack = createStackNavigator();
const NotificacionesStack = createStackNavigator();
const AjustesStack = createStackNavigator();
const HistorialStack = createStackNavigator();




function LoginStackScreen() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="IniciarSesion" component={IniciarSesion} />
      <LoginStack.Screen name="Registro" component={Registro} />
      <LoginStack.Screen name="OlvidasteContraseña" component={OlvidasteContraseña} />
      <LoginStack.Screen name="IngresarCodigo" component={IngresarCodigo} />
      <LoginStack.Screen name="CrearNuevaContraseña" component={CrearNuevaContraseña} />
      <LoginStack.Screen name="ContraseñaExitosa" component={ContraseñaExitosa} />
    </LoginStack.Navigator>
  );
}

function NotificacionesStackScreen() {
  return (
    <NotificacionesStack.Navigator screenOptions={{ headerShown: false }}>
      <NotificacionesStack.Screen name="Notificaciones" component={Notificaciones} />
      <NotificacionesStack.Screen name="ConfirmarPartido" component={ConfirmarPartido}/>
      <NotificacionesStack.Screen name="Sancion" component={Sancion}/>
      <NotificacionesStack.Screen name="Notificacion" component={Notificacion}/>
      <NotificacionesStack.Screen name="Global" component={Global}/>
      <NotificacionesStack.Screen name="ConfirmarPartidoTorneo" component={ConfirmarPartidoTorneo}/>
    </NotificacionesStack.Navigator>
  );
}

function AjustesStackScreen() {
  return (
    <AjustesStack.Navigator screenOptions={{ headerShown: false }}>
      <AjustesStack.Screen name="Ajustes" component={Ajustes}/>
      <AjustesStack.Screen name='Clubes' component={Clubes}/>
      <AjustesStack.Screen name='TerminosCondiciones' component={Terminos}/>
      <AjustesStack.Screen name='Login' component={LoginStackScreen}/>
      <AjustesStack.Screen name="Nabbar" component={NavBarStackScreen}/>
    </AjustesStack.Navigator>
  );
}

function HistorialStackScreen() {
  return (
    <HistorialStack.Navigator screenOptions={{ headerShown: false }}>
      <HistorialStack.Screen name="Historial" component={Historial} />
    </HistorialStack.Navigator>
  );
}

function PerfilStackScreen() {
  return (
    <PerfilStack.Navigator screenOptions={{ headerShown: false }}>
      <PerfilStack.Screen name="Perfil" component={Perfil} />
    </PerfilStack.Navigator>
  );
}

function JugarStackScreen() {
  return (
    <JugarStack.Navigator screenOptions={{ headerShown: false }}>
      <JugarStack.Screen name="InicioJugar" component={InicioJugar} />
      <JugarStack.Screen name="MostrarJugadoresEquipo1" component={MostrarJugadoresEquipo1} />
      <JugarStack.Screen name="MostrarJugadoresEquipo2" component={MostrarJugadoresEquipo2} />
      <JugarStack.Screen name="PuntajeJugar" component={PuntajeJugar}/>
      <JugarStack.Screen name="FinalJugar" component={FinalJugar}/>
      <JugarStack.Screen name= "Home" component={Home}></JugarStack.Screen>
    </JugarStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={Home} />
      <HomeStack.Screen name="JugarStack" component={JugarStackScreen} />
      <HomeStack.Screen name="Ranking" component={Ranking} />
    </HomeStack.Navigator>
  );
}

function NavBarStackScreen() {
  return (
    <NavBarStack.Navigator screenOptions={{ headerShown: false }}>
      <NavBarStack.Screen name="NotificacionesStack" component={NotificacionesStackScreen} />
      <NavBarStack.Screen name="PerfilStack" component={PerfilStackScreen} />
      <NavBarStack.Screen name="AjustesStack" component={AjustesStackScreen}/>
    </NavBarStack.Navigator>
  );
}

function TabBarStackScreen() {
  return (
    <TabBarStack.Navigator screenOptions={{ headerShown: false }}>
      <TabBarStack.Screen name="HomeStack" component={HomeStackScreen} />
      <TabBarStack.Screen name="HistorialStack" component={HistorialStackScreen} />
      <TabBarStack.Screen name="AjustesStack" component={AjustesStackScreen} />
    </TabBarStack.Navigator>
  );
}


  function AppNavigator() {
    const { isAuthenticated } = useAuth();
  
    
    return (
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <AppStack.Screen name="TabBar" component={TabBarStackScreen} />
            <AppStack.Screen name="NabBar" component={NavBarStackScreen} />
          </>
        ) : (
          <AppStack.Screen name="Login" component={LoginStackScreen} />
        )}
      </AppStack.Navigator>
    );
  }
  
 
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}