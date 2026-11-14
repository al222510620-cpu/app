import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { T } from '../theme/colors';

interface Props {
  borderColor?:   string;
  color?:         string;
  onPress:        () => void;
  title:          string;
}

export const BtnTouch = ( { title, color = T.primario, borderColor = T.acentoSuave, onPress } : Props ) => {
  return(
    <TouchableOpacity
      onPress={ () => onPress() }
    >
      <View
        style={{
          ...style.btnContainer,
          backgroundColor: color,
          borderColor: borderColor
        }}
      >
          <Text
            style={ style.text }
          >
            { title }
          </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  text: {
    color: T.blanco,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  btnContainer: {
    backgroundColor: T.primario,
    justifyContent: 'center',
    width: 190,
    minHeight: 48,
    paddingVertical: 8,
    borderRadius: 24,
    marginVertical: 5,
    borderWidth: 3
  }
});