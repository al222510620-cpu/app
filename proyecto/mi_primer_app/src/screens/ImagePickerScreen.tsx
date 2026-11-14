import { useState } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  TextInput,
  Pressable,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { appTheme } from '../theme/appTheme';
import { T } from '../theme/colors';
import { BtnTouch } from '../components/BtnTouch';
import { useImagePicker } from '../hooks/useImagePicker';
import { useGaleria, ImagenGaleria } from '../hooks/useGaleria';

const fecha = (f: string) => {
  const d = new Date(f);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export const ImagePickerScreen = () => {
  const { image64, pickImage, clearImage } = useImagePicker();
  const { isLoading, imagenes, error, cargar, guardar, eliminar } = useGaleria();
  const [ descripcion, setDescripcion ] = useState('');
  const [ guardando, setGuardando ] = useState(false);
  const { width } = useWindowDimensions();
  const lado = (width - 16 * 2 - 12) / 2;

  const onGuardar = async () => {
    if (!image64) return;
    setGuardando(true);
    const ok = await guardar(image64, descripcion);
    setGuardando(false);
    if (ok) {
      clearImage();
      setDescripcion('');
      Alert.alert('Listo', 'La imagen se guardó en tu galería.');
    }
  };

  const confirmarEliminar = (item: ImagenGaleria) => {
    Alert.alert('Eliminar imagen', '¿Quieres eliminar esta imagen de la galería?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => eliminar(item.id_imagen) },
    ]);
  };

  return (
    <FlatList
      style={styles.pantalla}
      contentContainerStyle={styles.contenido}
      data={imagenes}
      keyExtractor={(item) => `${item.id_imagen}`}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={cargar} colors={[T.acento]} />
      }
      ListHeaderComponent={
        <View style={styles.cabecera}>
          <Text style={appTheme.text}>Galería</Text>

          <BtnTouch
            title={image64 ? 'Cambiar imagen' : 'Abrir galería'}
            onPress={pickImage}
          />

          {image64 && (
            <View style={styles.previa}>
              <Image
                style={styles.imagenPrevia}
                source={{ uri: `data:image/jpeg;base64,${image64}` }}
                accessibilityLabel="Imagen elegida"
              />
              <TextInput
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
                placeholder="Descripción (opcional)"
                placeholderTextColor={T.placeholder}
                maxLength={150}
                accessibilityLabel="Descripción de la imagen"
              />
              <View style={styles.fila}>
                <Pressable
                  onPress={onGuardar}
                  disabled={guardando}
                  style={({ pressed }) => [styles.boton, styles.botonPrincipal, (pressed || guardando) && { opacity: 0.8 }]}
                  accessibilityRole="button"
                >
                  <Text style={styles.botonPrincipalTexto}>{guardando ? 'Guardando...' : 'Guardar'}</Text>
                </Pressable>
                <Pressable
                  onPress={() => { clearImage(); setDescripcion(''); }}
                  disabled={guardando}
                  style={[styles.boton, styles.botonSecundario]}
                  accessibilityRole="button"
                >
                  <Text style={styles.botonSecundarioTexto}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          )}

          <Text style={styles.seccion}>Guardadas ({imagenes.length})</Text>
          {imagenes.length > 0 && (
            <Text style={styles.ayuda}>Mantén presionada una imagen para eliminarla.</Text>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          onLongPress={() => confirmarEliminar(item)}
          style={[styles.tarjeta, { width: lado }]}
          accessibilityRole="imagebutton"
          accessibilityLabel={`${item.descripcion ?? 'Imagen sin descripción'}, del ${fecha(item.fecha)}. Mantén presionado para eliminar.`}
        >
          <Image
            style={{ width: '100%', height: lado * 0.75 }}
            source={{ uri: `data:image/jpeg;base64,${item.imagen}` }}
          />
          <View style={styles.pie}>
            <Text style={styles.descripcion} numberOfLines={1}>{item.descripcion ?? 'Sin descripción'}</Text>
            <Text style={styles.fecha}>{fecha(item.fecha)}</Text>
          </View>
        </Pressable>
      )}
      ListEmptyComponent={
        !isLoading ? (
          <Text style={styles.vacio}>{error ?? 'Aún no has guardado imágenes.'}</Text>
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: T.fondo },
  contenido: { padding: 16, paddingBottom: 32 },
  cabecera: { alignItems: 'center', marginBottom: 8 },
  previa: {
    width: '100%',
    backgroundColor: T.tarjeta,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: T.borde,
    padding: 12,
    marginTop: 12,
  },
  imagenPrevia: { width: '100%', height: 220, borderRadius: 12, borderWidth: 3, borderColor: T.acento },
  input: {
    marginTop: 10,
    backgroundColor: T.fondo,
    borderWidth: 2,
    borderColor: T.acentoSuave,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: T.texto,
  },
  fila: { flexDirection: 'row', gap: 10, marginTop: 10 },
  boton: { flex: 1, borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  botonPrincipal: { backgroundColor: T.primario },
  botonPrincipalTexto: { color: T.blanco, fontSize: 16, fontWeight: '800' },
  botonSecundario: { borderWidth: 2, borderColor: T.acento, backgroundColor: T.tarjeta },
  botonSecundarioTexto: { color: T.primario, fontSize: 16, fontWeight: '800' },
  seccion: { alignSelf: 'flex-start', color: T.texto, fontSize: 20, fontWeight: '900', marginTop: 18 },
  ayuda: { alignSelf: 'flex-start', color: T.suave, fontSize: 12, marginTop: 2 },
  tarjeta: {
    backgroundColor: T.tarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: T.borde,
    overflow: 'hidden',
    marginBottom: 12,
  },
  pie: { padding: 8 },
  descripcion: { color: T.texto, fontSize: 14, fontWeight: '700' },
  fecha: { color: T.suave, fontSize: 12, marginTop: 2 },
  vacio: { color: T.suave, fontSize: 15, textAlign: 'center', marginTop: 20 },
});
