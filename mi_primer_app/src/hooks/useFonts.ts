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

export const useAppFonts = (): boolean => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Montserrat_400Regular,
    Montserrat_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  return fontsLoaded;
};
