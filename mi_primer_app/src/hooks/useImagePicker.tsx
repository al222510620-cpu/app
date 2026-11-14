import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

interface UseImagePicker{
  image64: string | null;
  pickImage: () => Promise<void>;
  clearImage: () => void;
}

export const useImagePicker = (): UseImagePicker => {

  const [ image64, setImage64 ] = useState<string|null>(null);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if ( status !== "granted" ) {
        Alert.alert(
          "Permiso requerido",
          "Para elegir una imagen, permite el acceso a tu galería en los ajustes del teléfono.",
          [{ text: "Aceptar" }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3,
        base64: true,
      });

      if ( result.canceled ) return;

      const base64 = result.assets[0]?.base64;
      if ( !base64 ) {
        Alert.alert("No se pudo leer la imagen", "Intenta con otra foto.");
        return;
      }
      setImage64(base64);
    } catch ( error ) {
      console.log('Error al elegir imagen:', error);
      Alert.alert("No se pudo abrir la galería", "Intenta de nuevo.");
    }
  };

  const clearImage = () => setImage64(null);

  return { image64, pickImage, clearImage };
}
