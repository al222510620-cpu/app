import { EstadoEquipo } from '../../interfaces/pandoraApiRest';
import { T } from '../../theme/colors';

export const C = {
  fondo:       T.fondo,
  tarjeta:     T.tarjeta,
  borde:       T.borde,
  texto:       T.texto,
  suave:       T.suave,
  acento:      T.primario,
  claro:       T.acentoClaro,
  placeholder: T.placeholder,
  peligro:     T.error,
};

export const COLOR_ESTADO: Record<EstadoEquipo, string> = {
  'Disponible':       T.exito,
  'En uso':           '#1565C0',
  'En mantenimiento': T.aviso,
  'Dado de baja':     T.error,
};
