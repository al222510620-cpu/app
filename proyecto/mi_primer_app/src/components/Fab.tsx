import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { T } from '../theme/colors';

interface Props {
  action:   () => void;
  color?:   string;
  position: 'right' | 'left';
  title:    string;
}

export const Fab = ( { action, color = T.primario, position, title }:Props ) => {

  const btnPosition = ( position == 'right' ) ? style.fabLocationBr : style.fabLocationBl;

  return(
    <TouchableOpacity
      onPress={ action }
      style={ btnPosition }
    >
      <View
        style={{
          ...style.fab,
          backgroundColor: color
        }}
      >
          <Text
            style={ style.fabText }
          >
            { title }
          </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  fabLocationBr: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  fabLocationBl: {
    position: 'absolute',
    bottom: 25,
    left: 25,
  },
  fab: {
    backgroundColor: T.primario,
    width: 50, 
    height: 50,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: T.acentoSuave,
    justifyContent: 'center'
  },
  fabText: {
    color: T.blanco,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});