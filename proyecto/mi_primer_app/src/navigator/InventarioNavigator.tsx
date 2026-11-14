import { createStackNavigator } from '@react-navigation/stack';
import { InventarioScreen } from '../screens/inventario/InventarioScreen';
import { InventarioForm } from '../screens/inventario/InventarioForm';
import { Equipo } from '../interfaces/pandoraApiRest';

export type InventarioParams = {
  InventarioScreen: undefined;
  InventarioForm: { equipo?: Equipo } | undefined;
};

const Stack = createStackNavigator<InventarioParams>();

export const InventarioNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="InventarioScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="InventarioScreen" component={InventarioScreen} />
      <Stack.Screen name="InventarioForm" component={InventarioForm} />
    </Stack.Navigator>
  );
};
