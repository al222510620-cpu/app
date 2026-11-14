import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { InventarioParams } from '../../navigator/InventarioNavigator';
import { EquipoForm, useInventario } from '../../hooks/useInventario';
import { useImagePicker } from '../../hooks/useImagePicker';
import { ESTADOS_EQUIPO } from '../../interfaces/pandoraApiRest';
import { C, COLOR_ESTADO } from './estilosInventario';

interface Props extends StackScreenProps<InventarioParams, 'InventarioForm'> {}

const VACIO: EquipoForm = {
  nombre_equipo: '',
  codigo_inventario: '',
  marca: '',
  modelo: '',
  numero_serie: '',
  ubicacion: '',
  responsable: '',
  estado: 'Disponible',
  fecha_compra: '',
  observaciones: '',
  imagen: null,
};

const CAMPOS: { campo: keyof EquipoForm; etiqueta: string; placeholder: string }[] = [
  { campo: 'nombre_equipo',     etiqueta: '1. Nombre del equipo',    placeholder: 'Ej. Laptop' },
  { campo: 'codigo_inventario', etiqueta: '2. Código de inventario', placeholder: 'Ej. INV-LAP-0001' },
  { campo: 'marca',             etiqueta: '3. Marca',                placeholder: 'Ej. Dell' },
  { campo: 'modelo',            etiqueta: '4. Modelo',               placeholder: 'Ej. Latitude 5440' },
  { campo: 'numero_serie',      etiqueta: '5. Número de serie',      placeholder: 'Ej. DE123456A' },
  { campo: 'ubicacion',         etiqueta: '6. Ubicación',            placeholder: 'Ej. Laboratorio de cómputo 1' },
  { campo: 'responsable',       etiqueta: '7. Responsable',          placeholder: 'Ej. Diego López' },
];

const fechaValida = (f: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f)) return false;
  const d = new Date(`${f}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === f;
};

export const InventarioForm = ({ navigation, route }: Props) => {
  const equipo = route.params?.equipo;
  const esNuevo = !equipo;
  const { crear, actualizar, eliminar } = useInventario();
  const { image64, pickImage } = useImagePicker();
  const [ form, setForm ] = useState<EquipoForm>(() => {
    if (!equipo) return VACIO;
    const { id_inventario, ...resto } = equipo;
    return { ...resto, observaciones: resto.observaciones ?? '' };
  });
  const [ guardando, setGuardando ] = useState(false);

  const cambiar = (campo: keyof EquipoForm, valor: string | null) =>
    setForm(prev => ({ ...prev, [campo]: valor }));

  useEffect(() => {
    image64 && cambiar('imagen', image64);
  }, [image64]);

  const guardar = async () => {
    const faltan = CAMPOS.filter(c => !String(form[c.campo] ?? '').trim()).map(c => c.etiqueta);
    if (faltan.length) {
      Alert.alert('Faltan datos', faltan.join('\n'));
      return;
    }
    if (!fechaValida(form.fecha_compra)) {
      Alert.alert('Fecha no válida', 'Escribe la fecha de compra como AAAA-MM-DD, por ejemplo 2024-08-15.');
      return;
    }
    const datos: EquipoForm = {
      ...form,
      observaciones: form.observaciones?.trim() ? form.observaciones.trim() : null,
    };
    setGuardando(true);
    const ok = esNuevo ? await crear(datos) : await actualizar(equipo.id_inventario, datos);
    setGuardando(false);
    if (ok) {
      Alert.alert('Listo', esNuevo ? 'Equipo registrado.' : 'Equipo actualizado.');
      navigation.goBack();
    }
  };

  const confirmarEliminar = () => {
    if (!equipo) return;
    Alert.alert('Eliminar equipo', `¿Eliminar ${equipo.nombre_equipo} (${equipo.codigo_inventario})?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          if (await eliminar(equipo.id_inventario)) navigation.goBack();
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView style={styles.contenedor} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.cabecera}>
          <Pressable onPress={() => navigation.goBack()} style={styles.volver} accessibilityRole="button" accessibilityLabel="Regresar">
            <Text style={styles.volverTexto}>←</Text>
          </Pressable>
          <Text style={styles.titulo}>{esNuevo ? 'Registrar equipo' : 'Editar equipo'}</Text>
        </View>

        {CAMPOS.map(({ campo, etiqueta, placeholder }) => (
          <View key={campo} style={styles.grupo}>
            <Text style={styles.etiqueta}>{etiqueta}</Text>
            <TextInput
              style={styles.input}
              value={String(form[campo] ?? '')}
              onChangeText={(t) => cambiar(campo, t)}
              placeholder={placeholder}
              placeholderTextColor={C.placeholder}
              autoCapitalize={campo === 'codigo_inventario' || campo === 'numero_serie' ? 'characters' : 'sentences'}
              accessibilityLabel={etiqueta}
            />
          </View>
        ))}

        <View style={styles.grupo}>
          <Text style={styles.etiqueta}>8. Estado</Text>
          <View style={styles.chips}>
            {ESTADOS_EQUIPO.map(estado => {
              const activo = form.estado === estado;
              return (
                <Pressable
                  key={estado}
                  onPress={() => cambiar('estado', estado)}
                  style={[
                    styles.chip,
                    { borderColor: COLOR_ESTADO[estado] },
                    activo && { backgroundColor: COLOR_ESTADO[estado] },
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: activo }}
                >
                  <Text style={[styles.chipTexto, { color: activo ? '#FFFFFF' : COLOR_ESTADO[estado] }]}>{estado}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.grupo}>
          <Text style={styles.etiqueta}>9. Fecha de compra (AAAA-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={form.fecha_compra}
            onChangeText={(t) => cambiar('fecha_compra', t)}
            placeholder="2024-08-15"
            placeholderTextColor={C.placeholder}
            keyboardType="numbers-and-punctuation"
            maxLength={10}
            accessibilityLabel="Fecha de compra"
          />
        </View>

        <View style={styles.grupo}>
          <Text style={styles.etiqueta}>10. Observaciones (opcional)</Text>
          <TextInput
            style={[styles.input, styles.multilinea]}
            value={form.observaciones ?? ''}
            onChangeText={(t) => cambiar('observaciones', t)}
            placeholder="Ej. Incluye cargador"
            placeholderTextColor={C.placeholder}
            multiline
            maxLength={500}
            accessibilityLabel="Observaciones"
          />
        </View>

        <View style={styles.grupo}>
          <Text style={styles.etiqueta}>Imagen 1</Text>
          {form.imagen ? (
            <Image
              style={styles.imagen}
              source={{ uri: `data:image/jpeg;base64,${form.imagen}` }}
              accessibilityLabel="Imagen del equipo"
            />
          ) : (
            <Text style={styles.sinImagen}>Sin imagen</Text>
          )}
          <View style={styles.filaBotones}>
            <Pressable onPress={pickImage} style={[styles.boton, styles.botonSecundario]} accessibilityRole="button">
              <Text style={styles.botonSecundarioTexto}>{form.imagen ? 'Cambiar imagen' : 'Elegir imagen'}</Text>
            </Pressable>
            {form.imagen && (
              <Pressable onPress={() => cambiar('imagen', null)} style={[styles.boton, styles.botonSecundario]} accessibilityRole="button">
                <Text style={styles.botonSecundarioTexto}>Quitar</Text>
              </Pressable>
            )}
          </View>
        </View>

        <Pressable
          onPress={guardar}
          disabled={guardando}
          style={({ pressed }) => [styles.boton, styles.botonPrincipal, (pressed || guardando) && { opacity: 0.8 }]}
          accessibilityRole="button"
        >
          <Text style={styles.botonPrincipalTexto}>
            {guardando ? 'Guardando...' : esNuevo ? 'Registrar equipo' : 'Guardar cambios'}
          </Text>
        </Pressable>

        {!esNuevo && (
          <Pressable onPress={confirmarEliminar} style={[styles.boton, styles.botonPeligro]} accessibilityRole="button">
            <Text style={styles.botonPrincipalTexto}>Eliminar equipo</Text>
          </Pressable>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: C.fondo },
  scroll: { padding: 16, paddingBottom: 40 },
  cabecera: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  volver: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.acento, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  volverTexto: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  titulo: { color: C.texto, fontSize: 22, fontWeight: '900' },
  grupo: { marginBottom: 12 },
  etiqueta: { color: C.texto, fontSize: 15, fontWeight: '700', marginBottom: 6 },
  input: {
    backgroundColor: C.tarjeta,
    borderWidth: 1,
    borderColor: C.borde,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: C.texto,
  },
  multilinea: { minHeight: 80, textAlignVertical: 'top' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 2, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8 },
  chipTexto: { fontSize: 14, fontWeight: '700' },
  imagen: { width: '100%', height: 200, borderRadius: 12, marginBottom: 8, resizeMode: 'cover' },
  sinImagen: { color: C.suave, fontSize: 14, marginBottom: 8 },
  filaBotones: { flexDirection: 'row', gap: 10 },
  boton: { borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16, alignItems: 'center', marginTop: 6 },
  botonSecundario: { borderWidth: 2, borderColor: C.acento, backgroundColor: C.tarjeta, flex: 1 },
  botonSecundarioTexto: { color: C.acento, fontSize: 15, fontWeight: '800' },
  botonPrincipal: { backgroundColor: C.texto, marginTop: 12 },
  botonPrincipalTexto: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  botonPeligro: { backgroundColor: C.peligro, marginTop: 10 },
});
