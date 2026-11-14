import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useLogin } from '../../hooks/useLogin';
import { T } from '../../theme/colors';
import type { AuthParams } from '../../navigator/AuthNavigator';
import type { UserRespose } from '../../interfaces/pandoraApiRest';

const C = {
  rojo:      T.acento,
  rojoOscuro:'#004D43',
  negro:     T.texto,
  blanco:    T.blanco,
  gris:      T.fondo,
  borde:     T.borde,
  texto:     T.texto,
  suave:     T.suave,
  azul:      T.primario,
};

const NUEVO_ENTRENADOR: UserRespose = {
  id_user: 0,
  username: '',
  email: '',
  password: '',
  image: '',
  location: '',
  update: new Date(),
};

export default function LoginUser() {
  const { isLoading, state, handleLogin, handleInputChange } = useLogin();
  const navigation = useNavigation<StackNavigationProp<AuthParams>>();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.fondo} pointerEvents="none">
        <View style={styles.mitadRoja} />
        <View style={styles.franja} />
        <View style={styles.mitadBlanca} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.tarjeta}>
            <Text style={styles.titulo} accessibilityRole="header">Hola, entrenadora</Text>
            <Text style={styles.subtitulo}>Inicia sesión para continuar tu aventura</Text>

            <Text style={styles.etiqueta}>Correo</Text>
            <TextInput
              value={state.email}
              onChangeText={(t) => handleInputChange('email', t)}
              placeholder="ash@pueblopaleta.com"
              placeholderTextColor={T.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={styles.input}
              accessibilityLabel="Correo"
            />

            <Text style={styles.etiqueta}>Contraseña</Text>
            <TextInput
              value={state.password}
              onChangeText={(t) => handleInputChange('password', t)}
              placeholder="••••••••"
              placeholderTextColor={T.placeholder}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              style={styles.input}
              accessibilityLabel="Contraseña"
              onSubmitEditing={handleLogin}
              returnKeyType="go"
            />

            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.boton,
                (pressed || isLoading) && { backgroundColor: C.rojoOscuro },
              ]}
              accessibilityRole="button"
              accessibilityState={{ busy: isLoading, disabled: isLoading }}
            >
              {isLoading
                ? <ActivityIndicator color={C.blanco} />
                : <Text style={styles.botonTexto}>Entrar</Text>}
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('FormUser', { ...NUEVO_ENTRENADOR })}
              style={styles.registro}
              accessibilityRole="button"
            >
              <Text style={styles.registroTexto}>
                Nueva entrenadora <Text style={styles.registroLink}>Regístrate</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.blanco },
  fondo: { ...StyleSheet.absoluteFill },
  mitadRoja: { flex: 1, backgroundColor: C.rojo },
  franja: { height: 14, backgroundColor: C.negro },
  mitadBlanca: { flex: 1, backgroundColor: C.gris },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  tarjeta: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    backgroundColor: C.blanco,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: C.negro,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 22,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  titulo: {
    color: T.primario,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitulo: {
    color: C.suave,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 18,
  },
  etiqueta: { color: C.texto, fontSize: 14, fontWeight: '700', marginBottom: 6 },
  input: {
    backgroundColor: C.gris,
    borderWidth: 2,
    borderColor: C.borde,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: C.texto,
    marginBottom: 14,
  },
  boton: {
    backgroundColor: T.primario,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: C.negro,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    minHeight: 54,
    justifyContent: 'center',
  },
  botonTexto: { color: C.blanco, fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
  registro: { marginTop: 16, alignItems: 'center', paddingVertical: 6 },
  registroTexto: { color: C.suave, fontSize: 15 },
  registroLink: { color: C.azul, fontWeight: '800' },
});
