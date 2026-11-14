import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { T } from '../theme/colors';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface BtnProps {
  navigate: () => void;
  text: string;
}

const BtnMenu = ({ navigate, text }: BtnProps) => {
  return (
    <TouchableOpacity
      onPress={navigate}
      activeOpacity={0.85}
      style={styles.btnWrapper}
    >
      <View style={styles.btn}>
        <Text style={styles.btnText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const DrawerMenu = ({ navigation }: DrawerContentComponentProps) => {
  const { authState, logout } = useContext(AuthContext);
  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.drawerBackground}
    >
      <View style={styles.container}>
        <View style={styles.avatarBorder}>
          <Image
            style={styles.avatar}
            source={
              authState.avatar
                ? { uri: `data:image/png;base64,${authState.avatar}` }
                : require('./../../assets/avatar.png.jpeg')
            }
          />
        </View>
        <Text style={styles.username}>{authState.username ?? 'Entrenador'}</Text>
        <View style={styles.buttonsContainer}>
          <BtnMenu
            text="Pokédex"
            navigate={() => navigation.navigate('PokemonNavigator')}
          />
          <BtnMenu
            text="Pantallas"
            navigate={() => navigation.navigate('StackNavigator')}
          />
          <BtnMenu
            text="Formulario"
            navigate={() => navigation.navigate('FormScreen')}
          />
          <BtnMenu
            text="Galería"
            navigate={() => navigation.navigate('ImagePickerScreen')}
          />
          <BtnMenu
            text="Ubicación"
            navigate={() => navigation.navigate('LocationScreen')}
          />
          <BtnMenu
            text="Entrenadores"
            navigate={() => navigation.navigate('UserStackNavigator')}
          />
          <BtnMenu
            text="Dashboard"
            navigate={() => navigation.navigate('DataResponseScreen')}
          />
          <BtnMenu
            text="Calificaciones"
            navigate={() => navigation.navigate('CalificacionesScreen')}
          />
          <BtnMenu
            text="Alumnos"
            navigate={() => navigation.navigate('AlumnosScreen')}
          />
          <BtnMenu
            text="Inventario"
            navigate={() => navigation.navigate('InventarioNavigator')}
          />
          <BtnMenu
            text="Cerrar sesión"
            navigate={() => logout()}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerBackground: {
    backgroundColor: T.fondo,        
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  avatarBorder: {
    height: 180,
    width: 180,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: T.acento,          
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: T.acento,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  avatar: {
    height: 160,
    width: 160,
    borderRadius: 80,
  },
  username: {
    fontSize: 26,
    color: T.texto,                  
    fontWeight: '900',
    letterSpacing: -0.5,
    marginTop: 16,
    marginBottom: 8,
  },
  divider: {
    width: 60,
    height: 3,
    borderRadius: 2,
    backgroundColor: T.acento,        
    marginBottom: 24,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  btnWrapper: {
    width: '100%',
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: T.borde,           
    shadowColor: T.sombra,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  btnText: {
    color: T.texto,                  
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});