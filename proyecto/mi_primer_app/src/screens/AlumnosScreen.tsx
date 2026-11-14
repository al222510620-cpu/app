import { memo, useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useAlumnos } from '../hooks/useAlumnos';
import { Alumno } from '../interfaces/pandoraApiRest';
import { T } from '../theme/colors';

const APROBATORIA = 6;

const TarjetaAlumno = memo(({ item }: { item: Alumno }) => {
  const color = item.promedio >= APROBATORIA ? T.exito : T.error;
  return (
    <View
      style={styles.tarjeta}
      accessible
      accessibilityLabel={
        `Alumno ${item.id_alumno}. ${item.nombre} ${item.apellido}, ${item.grado}° ${item.grupo}. ` +
        `Promedio ${Number(item.promedio).toFixed(1)}. ${item.activo ? 'Activo' : 'Inactivo'}.`
      }
    >
      <View style={styles.datos}>
        <Text style={styles.titulo}>{item.nombre} {item.apellido}</Text>
        <Text style={styles.detalle}>
          {item.grado}° {item.grupo} · Nac. {item.fecha_nacimiento} · #{item.id_alumno}
        </Text>
        <Text style={[styles.estado, { color: item.activo ? T.exito : T.suave }]}>
          {item.activo ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
      <Text style={[styles.promedio, { color }]}>{Number(item.promedio).toFixed(1)}</Text>
    </View>
  );
});

export const AlumnosScreen = () => {
  const { isLoading, error, alumnos, loadAlumnos } = useAlumnos();
  const [ busqueda, setBusqueda ] = useState('');

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return alumnos;
    return alumnos.filter(a =>
      `${a.nombre} ${a.apellido}`.toLowerCase().includes(q) || `${a.id_alumno}` === q
    );
  }, [alumnos, busqueda]);

  return (
    <FlatList
      style={styles.contenedor}
      contentContainerStyle={styles.lista}
      data={filtrados}
      keyExtractor={item => `${item.id_alumno}`}
      renderItem={({ item }) => <TarjetaAlumno item={item} />}
      initialNumToRender={15}
      maxToRenderPerBatch={20}
      windowSize={7}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadAlumnos} colors={[T.primario]} />
      }
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <>
          <View style={styles.resumen}>
            <Text style={styles.resumenTitulo}>Alumnos</Text>
            <Text style={styles.resumenSub}>
              {busqueda ? `${filtrados.length} de ${alumnos.length}` : `${alumnos.length}`} registros
            </Text>
            <Text style={styles.ayuda}>Desliza hacia abajo para actualizar.</Text>
          </View>
          <TextInput
            style={styles.buscador}
            placeholder="Buscar por nombre, apellido o id"
            placeholderTextColor={T.placeholder}
            value={busqueda}
            onChangeText={setBusqueda}
            accessibilityLabel="Buscar alumno"
          />
          {error && <Text style={styles.vacio}>{error}</Text>}
        </>
      }
      ListEmptyComponent={
        !isLoading && !error
          ? <Text style={styles.vacio}>{busqueda ? 'Ningún alumno coincide.' : 'Aún no hay alumnos registrados.'}</Text>
          : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: T.fondo },
  lista: { padding: 16, paddingBottom: 32 },
  resumen: { backgroundColor: T.primario, borderRadius: 18, padding: 18, marginBottom: 12 },
  resumenTitulo: { color: '#FFFFFF', fontSize: 24, fontWeight: '900', textAlign: 'center' },
  resumenSub: { color: '#FFFFFF', fontSize: 14, textAlign: 'center', marginTop: 6, fontWeight: '700' },
  ayuda: { color: '#FFFFFF', fontSize: 12, textAlign: 'center', marginTop: 6 },
  buscador: {
    backgroundColor: T.tarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: T.borde,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: T.texto,
    marginBottom: 12,
  },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: T.tarjeta,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: T.borde,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
  },
  datos: { flex: 1, paddingRight: 8 },
  titulo: { color: T.texto, fontSize: 16, fontWeight: '800', marginBottom: 2 },
  detalle: { color: T.suave, fontSize: 13 },
  estado: { fontSize: 12, fontWeight: '700', marginTop: 2 },
  promedio: { fontSize: 24, fontWeight: '900' },
  vacio: { color: T.suave, fontSize: 14, textAlign: 'center', paddingVertical: 8 },
});
