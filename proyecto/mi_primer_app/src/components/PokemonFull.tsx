import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { PokemonDetailResponse } from '../interfaces/pokemonResponse';

interface Props {
  pokemon: PokemonDetailResponse;
  types: string[];
}

export const PokemonFull = ({ pokemon }: Props) => {
  const typeNames = pokemon.types?.map(({ type }) => type.name) ?? [];

  const sprites = [
    pokemon.sprites?.front_default,
    pokemon.sprites?.back_default,
    pokemon.sprites?.front_shiny,
    pokemon.sprites?.back_shiny,
    pokemon.sprites?.front_female,
    pokemon.sprites?.back_female,
  ].filter(Boolean) as string[];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.typesRow}>
          {typeNames.map((type) => (
            <View key={type} style={styles.chip}>
              <Text style={styles.chipText}>{type.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}> Datos </Text>

        <View style={styles.cardsRow}>
          <DataCard label="Peso" value={pokemon.weight} />
          <DataCard label="Altura" value={pokemon.height} />
        </View>
        <View style={styles.cardsRow}>
          <DataCard label="Base Exp." value={pokemon.base_experience} />
          <DataCard label="Default" value={pokemon.is_default ? 'Sí' : 'No'} />
        </View>

        {sprites.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Sprites</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.spritesRow}
            >
              {sprites.map((uri, index) => (
                <View key={`${uri}-${index}`} style={styles.spriteWrapper}>
                  <Image style={styles.sprite} source={{ uri }} />
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const DataCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <View style={styles.dataCard}>
    <Text style={styles.dataLabel}>{label}</Text>
    <Text style={styles.dataValue}>{value ?? '—'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8BC34A',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 8, 
    borderColor: '#FFFFFF',
    marginTop: -24,
    paddingTop: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontFamily: 'Montserrat_700Bold', 
    fontSize: 14,
    color: '#2E7D32', 
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginTop: 16,
    textAlign: 'center',
  },

  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
    justifyContent: 'center', 
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 80,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  chipText: {
    fontFamily: 'Inter_700Bold', 
    color: '#1A1A1A',
    fontSize: 13,
    letterSpacing: 0.8,
  },

  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  dataCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dataLabel: {
    fontFamily: 'Inter_400Regular', 
    fontSize: 11,
    color: '#888',
    letterSpacing: 0.8,
    marginBottom: 6,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  dataValue: {
    fontFamily: 'Montserrat_700Bold', 
    fontSize: 26,
    color: '#1A1A1A',
    textAlign: 'center',
  },

  spritesRow: {
    gap: 12,
    paddingRight: 20,
    paddingBottom: 8,
  },
  spriteWrapper: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    backgroundColor: '#F7F7F9',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sprite: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
});