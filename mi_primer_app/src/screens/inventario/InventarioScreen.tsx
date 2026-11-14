import { useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, Image, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useInventario } from '../../hooks/useInventario';
import { Equipo, ESTADOS_EQUIPO } from '../../interfaces/pandoraApiRest';
import { InventarioParams } from '../../navigator/InventarioNavigator';
import { C, COLOR_ESTADO } from './estilosInventario';

interface Props extends StackScreenProps<InventarioParams, 'InventarioScreen'> {}

const TarjetaEquipo = ({ item, onPress }: { item: Equipo; onPress: () => void }) => {
  const color = COLOR_ESTADO[item.estado] ?? C.suave;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tarjeta, pressed && { opacity: 0.85 }]}
      accessibilityRole="button"
      accessibilityLabel={
        `${item.nombre_equipo} ${item.marca} ${item.modelo}, código ${item.codigo_inventario}, ` +
        `${item.estado}, en ${item.ubicacion}. Toca para editar.`
      }
    >
      {item.imagen ? (
        <Image style={styles.foto} source={{ uri: `data:image/jpeg;base64,${item.imagen}` }} />
      ) : (
        <View style={[styles.foto, styles.sinFoto]}>
          <Text style={styles.sinFotoTexto}>{item.nombre_equipo.slice(0, 2).toUpperCase()}</Text>
        </View>
      )}
      <View style={styles.datos}>
        <Text style={styles.nombre} numberOfLines={1}>{item.nombre_equipo}</Text>
        <Text style={styles.detalle} numberOfLines={1}>{item.marca} · {item.modelo}</Text>
        <Text style={styles.codigo} numberOfLines={1}>{item.codigo_inventario}</Text>
        <Text style={styles.detalle} numberOfLines={1}>{item.ubicacion}</Text>
        <Text style={[styles.etiqueta, { backgroundColor: color }]}>{item.estado}</Text>
      </View>
    </Pressable>
  );
};

export const InventarioScreen = ({ navigation }: Props) => {
  const { isLoading, error, equipos, loadInventario } = useInventario();
  const focused = useIsFocused();

  useEffect(() => {
    focused && loadInventario();
  }, [focused]);

  const conteo = (estado: string) => equipos.filter(e => e.estado === estado).length;

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={equipos}
        keyExtractor={(item) => `${item.id_inventario}`}
        renderItem={({ item }) => (
          <TarjetaEquipo
            item={item}
            onPress={() => navigation.navigate('InventarioForm', { equipo: item })}
          />
        )}
        contentContainerStyle={styles.lista}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadInventario} colors={[C.acento]} />
        }
        ListHeaderComponent={
          <View>
            <View style={styles.resumen}>
              <Text style={styles.resumenTitulo}>Inventario de equipo</Text>
              <Text style={styles.resumenSub}>Base de datos: MSSQL · Campos: 10 · Imágenes: 1</Text>
              <Text style={styles.total}>{equipos.length} equipos</Text>
              <View style={styles.estados}>
                {ESTADOS_EQUIPO.map(estado => (
                  <View key={estado} style={styles.estadoCaja}>
                    <Text style={styles.estadoNumero}>{conteo(estado)}</Text>
                    <Text style={styles.estadoTexto}>{estado}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Pressable
              onPress={() => navigation.navigate('InventarioForm', undefined)}
              style={({ pressed }) => [styles.botonNuevo, pressed && { opacity: 0.85 }]}
              accessibilityRole="button"
            >
              <Text style={styles.botonNuevoTexto}>+ Registrar equipo</Text>
            </Pressable>
            <Text style={styles.ayuda}>Toca un equipo para editarlo. Desliza hacia abajo para actualizar.</Text>
          </View>
        }
        ListEmptyComponent={
          !isLoading ? (
            <Text style={styles.vacio}>{error ?? 'Aún no hay equipos registrados.'}</Text>
          ) : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: C.fondo },
  lista: { padding: 16, paddingBottom: 32 },
  resumen: { backgroundColor: C.acento, borderRadius: 18, padding: 18 },
  resumenTitulo: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', textAlign: 'center' },
  resumenSub: { color: '#FFFFFF', fontSize: 12, textAlign: 'center', marginTop: 4 },
  total: { color: '#FFFFFF', fontSize: 28, fontWeight: '900', textAlign: 'center', marginTop: 10 },
  estados: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  estadoCaja: { flex: 1, alignItems: 'center' },
  estadoNumero: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  estadoTexto: { color: '#FFFFFF', fontSize: 11, fontWeight: '600', textAlign: 'center' },
  botonNuevo: { backgroundColor: C.texto, borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  botonNuevoTexto: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  ayuda: { color: C.suave, fontSize: 12, textAlign: 'center', marginVertical: 10 },
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: C.tarjeta,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.borde,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  foto: { width: 86, height: 86, borderRadius: 12, marginRight: 12 },
  sinFoto: { backgroundColor: C.claro, alignItems: 'center', justifyContent: 'center' },
  sinFotoTexto: { color: C.acento, fontSize: 24, fontWeight: '900' },
  datos: { flex: 1 },
  nombre: { color: C.texto, fontSize: 17, fontWeight: '800' },
  detalle: { color: C.suave, fontSize: 13, marginTop: 1 },
  codigo: { color: C.texto, fontSize: 13, fontWeight: '700', marginTop: 1 },
  etiqueta: {
    alignSelf: 'flex-start',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 6,
    overflow: 'hidden',
  },
  vacio: { color: C.suave, fontSize: 16, textAlign: 'center', marginTop: 30 },
});
