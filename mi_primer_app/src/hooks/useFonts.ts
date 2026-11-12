import { useFonts } from 'expo-font';
import { 
  Inter_400Regular, 
  Inter_700Bold 
} from '@expo-google-fonts/inter';
import { 
  Montserrat_400Regular, 
  Montserrat_700Bold 
} from '@expo-google-fonts/montserrat';
import { 
  OpenSans_400Regular, 
  OpenSans_700Bold 
} from '@expo-google-fonts/open-sans';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Montserrat_400Regular,
    Montserrat_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  // Mientras las fuentes cargan, mostramos un indicador
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5C6BC0" />
      </View>
    );
  }

  // Una vez cargadas, renderizamos tu app normal
  return (
    // ... aquí va el resto de tu navegación o componentes
    <HomePokedex /> 
  );
}