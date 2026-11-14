import Constants from 'expo-constants';

const PUERTO_API = 3000;

const hostMetro = Constants.expoConfig?.hostUri?.split(':')[0];

export const API_URL: string =
  process.env.EXPO_PUBLIC_API_URL ??
  ( hostMetro ? `http://${hostMetro}:${PUERTO_API}` : `http://localhost:${PUERTO_API}` );
