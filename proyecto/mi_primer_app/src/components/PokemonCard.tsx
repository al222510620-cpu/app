import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NewPokemon } from '../interfaces/pokemonResponse';
import { useTypeColorPokemon } from '../hooks/useTypeColorPokemon';
import { useNavigation } from '@react-navigation/native';

interface Props {
  pokemon: NewPokemon;
}

const withWindows = Dimensions.get('window').width;
const CARD_SIZE = withWindows * 0.42;

export const PokemonCard = ({ pokemon }: Props) => {
  const { color, isLoading } = useTypeColorPokemon(`${pokemon.id}`);
  const navigation = useNavigation();

  const primaryColor = isLoading ? '#1B1B2F' : color[0];
  const secondaryColor = isLoading
    ? '#2A2A45'
    : color.length > 1
    ? color[1]
    : color[0];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PokemonDetail', { NewPokemon: pokemon })}
      activeOpacity={0.85}
      style={styles.shadowWrapper}
    >
      <View
        style={[
          styles.containerCard,
          { width: CARD_SIZE, height: CARD_SIZE },
        ]}
      >
        <View style={[styles.backgroundTop, { backgroundColor: secondaryColor }]} />
        <View style={[styles.backgroundButtom, { backgroundColor: primaryColor }]} />
        <Image
          style={styles.pokeball}
          source={require('./../../assets/pokeball-light.png')}
        />
        <Image style={styles.pokemon} source={{ uri: pokemon.image }} />
        <View style={styles.nameWrapper}>
          <Text style={styles.name} numberOfLines={1}>
            {pokemon.name}
          </Text>
          <Text style={styles.id}>#{pokemon.id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    marginBottom: 18,
    marginHorizontal: 8,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 10,
  },
  containerCard: {
    borderRadius: 999,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  backgroundTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '50%',
    transform: [
      { rotateX: '20deg' },
      { rotateY: '-45deg' },
      { scale: 2.5 },
    ],
  },
  backgroundButtom: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    transform: [
      { rotateX: '20deg' },
      { rotateY: '-45deg' },
      { scale: 2.5 },
    ],
  },
  pokeball: {
    height: 110,
    width: 110,
    position: 'absolute',
    bottom: -15,
    right: -15,
    opacity: 0.3,
  },

  pokemon: {
    height: '68%',
    width: '68%',
    position: 'absolute',
    top: '10%',           
    resizeMode: 'contain',
  },
  nameWrapper: {
    paddingBottom: 14,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  name: {
    color: '#FFFFFF',                          
    fontSize: 20,                              
    fontWeight: '100',                         
    textTransform: 'capitalize',
    letterSpacing: -0.3,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.58)',    
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  id: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: '800',                        
    marginTop: 10,                              
    letterSpacing: 0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});