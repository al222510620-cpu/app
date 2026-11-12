import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { usePokemonPaginated } from '../../hooks/usePokemonPaginated';
import { appTheme } from '../../theme/appTheme';
import { PokemonCard } from '../../components/PokemonCard';

const THEMES = {
  pastel: {
    background: '#FFE5EC',                    
    pokeballTint: 'rgba(255, 182, 193, 0.5)', 
    title: '#8B3A62',                        
    titleShadow: 'rgba(255, 255, 255, 0.8)',  
    subtitle: '#B8638A',                      
    spinner: '#FF6B9D',                       
    buttonBg: '#FFFFFF',
    buttonText: '#FF6B9D',
    buttonBorder: '#FFB6C1',
  },
};

export const HomePokedex = () => {
  const { pokemonList, loadPokemon } = usePokemonPaginated();
  const [themeName, setThemeName] = useState<'pastel' | 'mint'>('pastel');
  const theme = THEMES[themeName];

  const toggleTheme = () =>
    setThemeName((prev) => (prev === 'pastel' ? 'mint' : 'pastel'));

  return (
    <View style={[appTheme.container, { backgroundColor: theme.background }]}>

      <Image
        source={require('./../../../assets/pokeball-dark.png')}
        style={[styles.backgroundPokeball, { tintColor: theme.pokeballTint }]}
      />

      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          styles.themeButton,
          {
            backgroundColor: theme.buttonBg,
            borderColor: theme.buttonBorder,
          },
        ]}
        activeOpacity={0.7}
      >
        <Text style={[styles.themeButtonText, { color: theme.buttonText }]}>
        </Text>
      </TouchableOpacity>

      <FlatList
        data={pokemonList}
        keyExtractor={(pokemon, index) => `${pokemon.id}${index}`}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.title,
                  textShadowColor: theme.titleShadow,
                },
              ]}
            >
              Pokédex
            </Text>
            <Text style={[styles.subtitle, { color: theme.subtitle }]}>
              Encuentra tu Pokémon favorito
            </Text>
          </View>
        }
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReached={loadPokemon}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          <ActivityIndicator
            style={styles.footerLoader}
            size="large"
            color={theme.spinner}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundPokeball: {
    alignSelf: 'center',
    height: 420,
    width: 420,
    opacity: 50,
    position: 'absolute',
    top: '22%',
    zIndex: 0,
    tintColor: '#000000',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  title: {
  fontSize: 46,
  fontWeight: '900',
  letterSpacing: -1.5,
  color: '#8B3A62',                          
  textAlign: 'center',                       
  textShadowColor: 'black(255, 255, 255, 0.9)',  
  textShadowOffset: { width: 0, height: 3 },
  textShadowRadius: 10,
},

subtitle: {
  fontSize: 16,
  fontWeight: '500',
  color: 'black',                         
  textAlign: 'center',                       
  marginTop: 4,
  letterSpacing: 0.2,
  textShadowColor: 'black(255, 255, 255, 0.7)',  
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 4,
},
  footerLoader: {
    height: 120,
  },
});