import { useContext } from 'react';
import { T } from '../theme/colors';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import { StackNavigator } from './StackNavigator';
import { PokemonNavigator } from './PokemonNavigator';
import { DrawerMenu } from '../components/DrawerMenu';
import { FormScreen } from '../screens/FormScreen';
import { ImagePickerScreen } from '../screens/ImagePickerScreen';
import { LocationScreen } from '../screens/LocationScreen';
import { UserStackNavigator } from './UserStackNavigator';
import { DataResponseScreen } from '../screens/DataResponseScreen';
import { CalificacionesScreen } from '../screens/CalificacionesScreen';
import { AlumnosScreen } from '../screens/AlumnosScreen';
import { InventarioNavigator } from './InventarioNavigator';
import { AuthNavigator } from './AuthNavigator';
import { AuthContext } from '../context/AuthContext';

export type RootDrawerParams = {
  StackNavigator: undefined;
  PokemonNavigator: undefined;
  FormScreen: undefined;
  ImagePickerScreen: undefined;
  LocationScreen: undefined;
  UserStackNavigator: undefined;
  DataResponseScreen: undefined;
  CalificacionesScreen: undefined;
  AlumnosScreen: undefined;
  InventarioNavigator: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParams>();

const MainDrawer = () => {
  const { width } = useWindowDimensions();
  const isTablet = width > 720;

  return (
    <Drawer.Navigator
      initialRouteName="PokemonNavigator"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',      
          elevation: 0,                    
          shadowOpacity: 0,                
          borderBottomWidth: 0,
        },
        headerTintColor: T.texto,        
        headerTitleAlign: 'center',       
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '800',
          letterSpacing: -0.3,
        },
        drawerType: isTablet ? 'permanent' : 'front',
        drawerPosition: 'right',
        overlayColor: 'rgba(23, 138, 127, 0.25)',
        drawerStyle: {
          backgroundColor: T.fondo,
          width: isTablet ? 320 : width * 0.75,
        },
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#FFFFFF',
        swipeEdgeWidth: 80,
      }}
      drawerContent={(props) => <DrawerMenu {...props} />}
    >
      <Drawer.Screen
        name="PokemonNavigator"
        component={PokemonNavigator}
        options={{ title: 'Pokédex' }}
      />
      <Drawer.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{ title: 'Palitos y bolitas' }}
      />
      <Drawer.Screen
        name="FormScreen"
        component={FormScreen}
        options={{ title: 'Formulario' }}
      />
      <Drawer.Screen
        name="ImagePickerScreen"
        component={ImagePickerScreen}
        options={{ title: 'Galería' }}
      />
      <Drawer.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{ title: 'Ubicación' }}
      />
      <Drawer.Screen
        name="UserStackNavigator"
        component={UserStackNavigator}
        options={{ title: 'Entrenadores' }}
      />
      <Drawer.Screen
        name="DataResponseScreen"
        component={DataResponseScreen}
        options={{ title: 'Dashboard' }}
      />
      <Drawer.Screen
        name="CalificacionesScreen"
        component={CalificacionesScreen}
        options={{ title: 'Calificaciones' }}
      />
      <Drawer.Screen
        name="AlumnosScreen"
        component={AlumnosScreen}
        options={{ title: 'Alumnos' }}
      />
      <Drawer.Screen
        name="InventarioNavigator"
        component={InventarioNavigator}
        options={{ title: 'Inventario' }}
      />
    </Drawer.Navigator>
  );
};

export const DrawerNavigator = () => {
  const { authState } = useContext(AuthContext);
  return authState.isLoggedIn ? <MainDrawer /> : <AuthNavigator />;
};
