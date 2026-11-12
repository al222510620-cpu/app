import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import { StackNavigator } from './StackNavigator';
import { PokemonNavigator } from './PokemonNavigator';
import { DrawerMenu } from '../components/DrawerMenu';
import { FormScreen } from '../screens/FormScreen';

export type RootDrawerParams = {
  StackNavigator: undefined;
  PokemonNavigator: undefined;
  FormScreen: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigator = () => {
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
        headerTintColor: 'black',        
        headerTitleAlign: 'center',       
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '800',
          letterSpacing: -0.3,
        },
        drawerType: isTablet ? 'permanent' : 'front',
        drawerPosition: 'right',
        overlayColor: 'rgba(36, 177, 177, 0.35)',
        drawerStyle: {
          backgroundColor: '#24B1B1',
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
    </Drawer.Navigator>
  );
};