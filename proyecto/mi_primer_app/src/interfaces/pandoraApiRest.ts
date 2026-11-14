export interface UserRespose {
  id_user:    number;
  username:   string;
  email:      string;
  password:   string;
  image:      string;
  location:   string;
  update:     Date;
}

export type RequestLogin = UserRespose | false;

export interface DataResponse {
  total:           number;
  diasFrios:       Dias[];
  diasCalurosos:   Dias[];
  topTemperaturas: Sensor[];
  estadistica:     Estadisticas;
  ultimasHoras:    Sensor[];
  alertas:         Sensor[];
  hoy:             Sensor[];
  ayer:            Sensor[];
  anteayer:        Sensor[];
}

export interface Sensor {
  id_sensor:           number;
  fecha:               Date;
  distancia_cm:        number;
  distancia_inch:      number;
  temperatura_celcius: number;
  temperatura_f:       number;
}

export interface Dias {
    dia:      Date;
    promedio: number;
}

export interface Estadisticas {
    total:         string;
    temp_promedio: number;
    temp_maxima:   number;
    temp_minima:   number;
    dist_promedio: number;
    dist_minima:   number;
    dist_maxima:   number;
}

export type EstadoEquipo = 'Disponible' | 'En uso' | 'En mantenimiento' | 'Dado de baja';

export const ESTADOS_EQUIPO: EstadoEquipo[] = ['Disponible', 'En uso', 'En mantenimiento', 'Dado de baja'];

export interface Equipo {
  id_inventario:     number;
  nombre_equipo:     string;
  codigo_inventario: string;
  marca:             string;
  modelo:            string;
  numero_serie:      string;
  ubicacion:         string;
  responsable:       string;
  estado:            EstadoEquipo;
  fecha_compra:      string;
  observaciones:     string | null;
  imagen:            string | null;
}

export interface Alumno {
  id_alumno:        number;
  nombre:           string;
  apellido:         string;
  grado:            number;
  grupo:            string;
  fecha_nacimiento: string;
  promedio:         number;
  activo:           boolean;
}

export interface Materia {
  id_materia:   number;
  nombre:       string;
  area:         string;
  horas_semana: number;
  obligatoria:  boolean;
}

export interface Calificacion {
  id_calificacion: number;
  alumno_id:       number;
  materia_id:      number;
  bimestre:        number;
  calificacion:    number;
  alumno:          Alumno;
  materia:         Materia;
}

export interface PromedioMateria {
  id_materia: number;
  materia:    string;
  promedio:   number;
  registros:  number;
}

export interface PromedioAlumno {
  id_alumno: number;
  nombre:    string;
  apellido:  string;
  promedio:  number;
  registros: number;
}

export interface CalificacionBimestre {
  id_calificacion: number;
  nombre:          string;
  apellido:        string;
  materia:         string;
  calificacion:    number;
}

export interface EjerciciosCalificaciones {
  promedioGeneral:          number;
  total:                    number;
  promedioPorMateria:       PromedioMateria[];
  promedioPorAlumno:        PromedioAlumno[];
  menoresA7:                Calificacion[];
  bimestre1:                CalificacionBimestre[];
  mejorAlumno:              PromedioAlumno | null;
  materiasBajoPromedio:     PromedioMateria[];
  alumnosSinCalificaciones: Alumno[];
}
