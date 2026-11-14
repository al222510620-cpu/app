import { createStackNavigator } from '@react-navigation/stack';
import LoginUser from '../screens/users/LoginUser';
import { FormUser } from '../screens/users/FormUser';
import { UserRespose } from '../interfaces/pandoraApiRest';

export type AuthParams = {
  LoginUser: undefined;
  FormUser: UserRespose;
};

const Stack = createStackNavigator<AuthParams>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginUser"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginUser" component={LoginUser} />
      <Stack.Screen name="FormUser" component={FormUser} />
    </Stack.Navigator>
  );
};
