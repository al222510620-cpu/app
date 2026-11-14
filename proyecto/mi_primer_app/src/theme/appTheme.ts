import { StyleSheet } from "react-native";
import { T } from "./colors";

export const appTheme = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: T.fondo,
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    color: T.texto,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textInput: {
    fontSize: 18,
    color: T.texto,
    backgroundColor: T.tarjeta,
    textAlign: 'center',
    width: 350,
    height: 50,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: T.acentoSuave,
    marginTop: 10
  }
});
