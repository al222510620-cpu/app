import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { PokemonParams } from '../../navigator/PokemonNavigator';
import { useTypeColorPokemon } from '../../hooks/useTypeColorPokemon';
import { useDetailPokemon } from '../../hooks/useDetailPokemon';
import { PokemonFull } from '../../components/PokemonFull';

interface Props extends StackScreenProps<PokemonParams, 'PokemonDetail'> {}

export const PokemonDetail = ({ navigation, route }: Props) => {
  const data = route.params.NewPokemon;
  const { id, name, url, image } = data;
  const { isLoading, color } = useTypeColorPokemon(id);
  const { detailPokemon } = useDetailPokemon(id);

  const primaryColor = isLoading ? '#1B1B2F' : color[0];
  const secondaryColor = isLoading
    ? '#2A2A45'
    : color.length > 1
    ? color[1]
    : color[0];

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={[styles.leftContainer, { backgroundColor: secondaryColor }]} />
        <View style={[styles.rightContainer, { backgroundColor: primaryColor }]} />
        <Image
          source={require('./../../../assets/pokeball-light.png')}
          style={styles.pokeball}
        />
        <Image source={{ uri: image }} style={styles.pokemon} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.arrowText}>←</Text>
        </TouchableOpacity>
        <View style={styles.titleWrapper} pointerEvents="none">
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.idText}>{`#${id}`}</Text>
        </View>
      </View>
      <View style={styles.bodySection}>
        {!detailPokemon ? (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator size="large" color={primaryColor} />
          </View>
        ) : (
          <PokemonFull pokemon={detailPokemon} types={color} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    flex: 2.1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  leftContainer: {
    borderBottomLeftRadius: 8000,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '50%',
  },
  rightContainer: {
    borderTopRightRadius: 8000,
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50%',
  },
  pokeball: {
    height: 280,
    width: 280,
    position: 'absolute',
    top: 20,
    opacity: 0.28,
    tintColor: 'black',
  },

  pokemon: {
    height: 230,
    width: 230,
    position: 'absolute',
    top: 45,
    resizeMode: 'contain',
  },
  arrowBtn: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 10,
  },
  arrowText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: -3,
  },
  titleWrapper: {
    position: 'absolute',
    top: 280,
    left: 1,
    right: 4,
    alignItems: 'center',
    paddingHorizontal: 80,
    zIndex: 12,
  },
  nameText: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '900',
    textTransform: 'capitalize',
    letterSpacing: -0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 9,
  },
  idText: {
    fontSize: 30,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 2,
    textAlign: 'center',
  },
  bodySection: {
    flex: 1.9,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 52,
    borderTopRightRadius: 52,
    marginTop: -24,
    paddingTop: 16,
    overflow: 'hidden',
  },
  loaderWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});