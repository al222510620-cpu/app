import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  StyleSheet,
} from 'react-native';
import { appTheme } from '../theme/appTheme';
import { T } from '../theme/colors';
import { useForm } from '../hooks/useForm';
import { useFormularios, RegistroFormulario } from '../hooks/useFormularios';

export const FormScreen = () => {
  const { state, handleInputChage, resetForm } = useForm();
  const { registros, isLoading, cargar, guardar, eliminar } = useFormularios();
  const [ enviando, setEnviando ] = useState(false);

  const enviar = async () => {
    setEnviando(true);
    const ok = await guardar(state);
    setEnviando(false);
    if (ok) {
      resetForm();
      Alert.alert('Listo', 'Tus datos se guardaron.');
    }
  };

  const confirmarEliminar = (r: RegistroFormulario) => {
    Alert.alert('Eliminar registro', `¿Eliminar el registro de ${r.username}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => eliminar(r.id_formulario) },
    ]);
  };

  return(
    <ScrollView
      style={{ flex: 1, backgroundColor: T.fondo }}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={cargar} colors={[T.acento]} />
      }
    >
      <Text
        style={ appTheme.text }
      >
        Formulario
      </Text>
      <View>
        <TextInput
          style={ appTheme.textInput }
          value={ state.username }
          onChangeText={ (text) => handleInputChage('username',text) }
          placeholder='Ingresa nombre del usuario'
          placeholderTextColor={T.placeholder}
          accessibilityLabel='Nombre del usuario'
        />
        <TextInput
          style={ appTheme.textInput }
          value={ state.password }
          onChangeText={ (text) => handleInputChage('password',text) }
          placeholder='Ingresa contraseña'
          placeholderTextColor={T.placeholder}
          keyboardType='default'
          secureTextEntry={true}
          accessibilityLabel='Contraseña'
        />
        <TextInput
          style={ appTheme.textInput }
          value={ state.age }
          onChangeText={ (text) => handleInputChage('age', text.replace(/[^0-9]/g, '')) }
          placeholder='Edad'
          placeholderTextColor={T.placeholder}
          keyboardType='number-pad'
          maxLength={3}
          accessibilityLabel='Edad'
        />
        <TextInput
          style={ appTheme.textInput }
          value={ state.stateCivil }
          onChangeText={ (text) => handleInputChage('stateCivil',text) }
          placeholder='Estado Civil'
          placeholderTextColor={T.placeholder}
          accessibilityLabel='Estado civil'
        />
        <TouchableOpacity
          onPress={ enviar }
          disabled={ enviando }
          accessibilityRole='button'
        >
          <View
            style={{
              backgroundColor: T.primario,
              width: 200,
              minHeight: 48,
              marginTop: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 24,
              opacity: enviando ? 0.7 : 1,
            }}
          >
            <Text
              style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: T.blanco }}
            >
              { enviando ? 'Guardando...' : 'Enviar datos' }
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.seccion}>Datos guardados ({registros.length})</Text>
      {registros.length === 0 && !isLoading && (
        <Text style={styles.vacio}>Aún no has enviado datos.</Text>
      )}
      {registros.map(r => (
        <TouchableOpacity
          key={r.id_formulario}
          onLongPress={() => confirmarEliminar(r)}
          style={styles.tarjeta}
          accessibilityLabel={`${r.username}, ${r.edad} años, ${r.estado_civil}. Mantén presionado para eliminar.`}
        >
          <Text style={styles.nombre}>{r.username}</Text>
          <Text style={styles.detalle}>{r.edad} años · {r.estado_civil}</Text>
        </TouchableOpacity>
      ))}
      {registros.length > 0 && (
        <Text style={styles.ayuda}>Mantén presionado un registro para eliminarlo.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { alignItems: 'center', padding: 16, paddingBottom: 32 },
  seccion: { alignSelf: 'stretch', color: T.texto, fontSize: 20, fontWeight: '900', marginTop: 24, marginBottom: 8 },
  vacio: { color: T.suave, fontSize: 15 },
  tarjeta: {
    alignSelf: 'stretch',
    backgroundColor: T.tarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: T.borde,
    padding: 14,
    marginBottom: 10,
  },
  nombre: { color: T.texto, fontSize: 17, fontWeight: '800' },
  detalle: { color: T.suave, fontSize: 14, marginTop: 2 },
  ayuda: { color: T.suave, fontSize: 12, marginTop: 4 },
});
