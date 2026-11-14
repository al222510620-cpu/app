import { useState } from 'react';
import { T } from '../../theme/colors';
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
  agua: {
    background: '#DFF5F1',
    pokeballTint: 'rgba(23, 138, 127, 0.25)',
    title: '#00695C',
    titleShadow: 'rgba(255, 255, 255, 0.8)',
    subtitle: '#43706B',
    spinner: '#178A7F',
    buttonBg: '#FFFFFF',
    buttonText: '#00695C',
    buttonBorder: '#A7E3DA',
  },
  mar: {
    background: '#E0F0F4',
    pokeballTint: 'rgba(47, 125, 140, 0.25)',
    title: '#1F5866',
    titleShadow: 'rgba(255, 255, 255, 0.8)',
    subtitle: '#2F7D8C',
    spinner: '#2F7D8C',
    buttonBg: '#FFFFFF',
    buttonText: '#1F5866',
    buttonBorder: '#B2DCE6',
  },
};

export const HomePokedex = () => {
  const { pokemonList, loadPokemon, error, isLoading } = usePokemonPaginated();
  const [themeName, setThemeName] = useState<'agua' | 'mar'>('agua');
  const theme = THEMES[themeName];

  const toggleTheme = () =>
    setThemeName((prev) => (prev === 'agua' ? 'mar' : 'agua'));

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
          Cambiar tema
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
          error ? (
            <View style={styles.errorBox}>
              <Text style={[styles.errorText, { color: theme.title }]}>{error}</Text>
              <TouchableOpacity
                onPress={loadPokemon}
                style={[
                  styles.themeButton,
                  styles.retryButton,
                  { backgroundColor: theme.buttonBg, borderColor: theme.buttonBorder },
                ]}
                activeOpacity={0.7}
              >
                <Text style={[styles.themeButtonText, { color: theme.buttonText }]}>
                  Reintentar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ActivityIndicator
              style={styles.footerLoader}
              size="large"
              color={theme.spinner}
              animating={isLoading || pokemonList.length === 0}
            />
          )
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
  themeButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 2,
  },
  themeButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
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
  color: T.primario,                          
  textAlign: 'center',                       
  textShadowColor: 'rgba(255, 255, 255, 0.9)',
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
  textShadowColor: 'rgba(255, 255, 255, 0.7)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 4,
},
  footerLoader: {
    height: 120,
  },
  errorBox: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 16,
  },
  errorText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  retryButton: {
    position: 'relative',
    top: 0,
    right: 0,
  },
});