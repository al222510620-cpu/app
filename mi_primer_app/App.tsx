import { ReactNode } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { DrawerNavigator } from './src/navigator/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
    </AppState>
  );
}

const AppState = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  );
}

export default App;