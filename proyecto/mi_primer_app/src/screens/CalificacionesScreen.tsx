import { ReactNode } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useCalificaciones } from '../hooks/useCalificaciones';
import { Calificacion } from '../interfaces/pandoraApiRest';
import { T } from '../theme/colors';

const C = {
  fondo:    T.fondo,
  tarjeta:  T.tarjeta,
  borde:    T.borde,
  texto:    T.texto,
  suave:    T.suave,
  acento:   T.primario,
  claro:    T.acentoClaro,
  aprobado: T.exito,
  reprobado:T.error,
};

const APROBATORIA = 6;
const MAX_FILAS = 20;
const uno = (n: number) => Number(n).toFixed(1);
const colorNota = (n: number) => (n >= APROBATORIA ? C.aprobado : C.reprobado);

const Ejercicio = ({ numero, titulo, children }: { numero: number; titulo: string; children: ReactNode }) => (
  <View style={styles.ejercicio}>
    <View style={styles.ejercicioCabecera}>
      <Text style={styles.ejercicioNumero}>{numero}</Text>
      <Text style={styles.ejercicioTitulo}>{titulo}</Text>
    </View>
    <View style={styles.ejercicioCuerpo}>{children}</View>
  </View>
);

const Fila = ({ texto, valor, color = C.texto }: { texto: string; valor: string; color?: string }) => (
  <View style={styles.fila}>
    <Text style={styles.filaTexto}>{texto}</Text>
    <Text style={[styles.filaValor, { color }]}>{valor}</Text>
  </View>
);

const Vacio = ({ texto }: { texto: string }) => <Text style={styles.vacio}>{texto}</Text>;

const TarjetaCalificacion = ({ item }: { item: Calificacion }) => {
  const aprobado = item.calificacion >= APROBATORIA;
  const color = colorNota(item.calificacion);
  return (
    <View
      style={styles.tarjeta}
      accessible
      accessibilityLabel={
        `Registro ${item.id_calificacion}. ${item.alumno.nombre} ${item.alumno.apellido}, ` +
        `${item.materia.nombre}, bimestre ${item.bimestre}. Calificación ${item.calificacion}, ` +
        `${aprobado ? 'aprobado' : 'reprobado'}.`
      }
    >
      <View style={styles.datos}>
        <Text style={styles.titulo}>{item.alumno.nombre} {item.alumno.apellido}</Text>
        <Text style={styles.detalle}>{item.materia.nombre}</Text>
        <Text style={styles.detalle}>Bimestre {item.bimestre} · Registro #{item.id_calificacion}</Text>
      </View>
      <View style={[styles.circulo, { borderColor: color }]}>
        <Text style={[styles.nota, { color }]}>{uno(item.calificacion)}</Text>
        <Text style={[styles.estado, { color }]}>{aprobado ? 'Aprobado' : 'Reprobado'}</Text>
      </View>
    </View>
  );
};

export const CalificacionesScreen = () => {
  const { isLoading, error, calificaciones, ejercicios: e, loadCalificaciones } = useCalificaciones();

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={styles.lista}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadCalificaciones} colors={[C.acento]} />
      }
    >
      <View style={styles.resumen}>
        <Text style={styles.resumenTitulo}>Calificaciones</Text>
        <Text style={styles.resumenSub}>Columnas: id, alumno_id, materia_id, bimestre, calificacion</Text>
        <Text style={styles.ayuda}>Desliza hacia abajo para actualizar.</Text>
      </View>

      {error && <Vacio texto={error} />}

      {e && (
        <>
          <Text style={styles.seccion}>Ejercicios</Text>

          <Ejercicio numero={1} titulo="Total de calificaciones registradas">
            <Fila texto="Total" valor={`${e.total}`} />
          </Ejercicio>

          <Ejercicio numero={2} titulo="Promedio de calificación por materia">
            {e.promedioPorMateria.map(m => (
              <Fila key={m.id_materia} texto={`${m.materia} (${m.registros})`} valor={uno(m.promedio)} color={colorNota(m.promedio)} />
            ))}
          </Ejercicio>

          <Ejercicio numero={3} titulo="Promedio de calificación por alumno">
            {e.promedioPorAlumno.map(a => (
              <Fila key={a.id_alumno} texto={`${a.nombre} ${a.apellido} (${a.registros})`} valor={uno(a.promedio)} color={colorNota(a.promedio)} />
            ))}
          </Ejercicio>

          <Ejercicio numero={4} titulo="Calificaciones menores a 7 (aprobatorio = 6 o más)">
            {e.menoresA7.length === 0
              ? <Vacio texto="Ninguna calificación es menor a 7." />
              : e.menoresA7.map(c => (
                <Fila
                  key={c.id_calificacion}
                  texto={`${c.alumno.nombre} ${c.alumno.apellido} · ${c.materia.nombre} · B${c.bimestre}`}
                  valor={uno(c.calificacion)}
                  color={colorNota(c.calificacion)}
                />
              ))}
          </Ejercicio>

          <Ejercicio numero={5} titulo="Calificaciones del bimestre 1 con nombre del alumno y de la materia (JOIN)">
            {e.bimestre1.length === 0
              ? <Vacio texto="No hay calificaciones del bimestre 1." />
              : e.bimestre1.map(c => (
                <Fila
                  key={c.id_calificacion}
                  texto={`${c.nombre} ${c.apellido} · ${c.materia}`}
                  valor={uno(c.calificacion)}
                  color={colorNota(c.calificacion)}
                />
              ))}
          </Ejercicio>

          <Ejercicio numero={6} titulo="Alumno con mejor promedio">
            {e.mejorAlumno
              ? <Fila texto={`${e.mejorAlumno.nombre} ${e.mejorAlumno.apellido}`} valor={uno(e.mejorAlumno.promedio)} color={C.aprobado} />
              : <Vacio texto="Sin datos." />}
          </Ejercicio>

          <Ejercicio numero={7} titulo={`Materias con promedio menor al general (${uno(e.promedioGeneral)})`}>
            {e.materiasBajoPromedio.length === 0
              ? <Vacio texto="Ninguna materia está por debajo del promedio general." />
              : e.materiasBajoPromedio.map(m => (
                <Fila key={m.id_materia} texto={m.materia} valor={uno(m.promedio)} color={colorNota(m.promedio)} />
              ))}
          </Ejercicio>

          <Ejercicio numero={8} titulo={`Alumnos que no tienen ninguna calificación (${e.alumnosSinCalificaciones.length})`}>
            {e.alumnosSinCalificaciones.length === 0
              ? <Vacio texto="Todos los alumnos tienen calificaciones." />
              : <>
                {e.alumnosSinCalificaciones.slice(0, MAX_FILAS).map(a => (
                  <Fila key={a.id_alumno} texto={`${a.nombre} ${a.apellido}`} valor={`${a.grado}° ${a.grupo}`} color={C.suave} />
                ))}
                {e.alumnosSinCalificaciones.length > MAX_FILAS && (
                  <Vacio texto={`… y ${e.alumnosSinCalificaciones.length - MAX_FILAS} alumnos más.`} />
                )}
              </>}
          </Ejercicio>
        </>
      )}

      <Text style={styles.seccion}>Registros ({calificaciones.length})</Text>
      {calificaciones.map(item => <TarjetaCalificacion key={item.id_calificacion} item={item} />)}
      {!isLoading && !error && calificaciones.length === 0 && (
        <Vacio texto="Aún no hay calificaciones registradas." />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: C.fondo },
  lista: { padding: 16, paddingBottom: 32 },
  resumen: { backgroundColor: C.acento, borderRadius: 18, padding: 18, marginBottom: 8 },
  resumenTitulo: { color: '#FFFFFF', fontSize: 24, fontWeight: '900', textAlign: 'center' },
  resumenSub: { color: '#FFFFFF', fontSize: 12, textAlign: 'center', marginTop: 6 },
  ayuda: { color: '#FFFFFF', fontSize: 12, textAlign: 'center', marginTop: 6 },
  seccion: { color: C.texto, fontSize: 20, fontWeight: '900', marginTop: 16, marginBottom: 10 },
  ejercicio: {
    backgroundColor: C.tarjeta,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.borde,
    marginBottom: 12,
    overflow: 'hidden',
  },
  ejercicioCabecera: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.claro, padding: 12 },
  ejercicioNumero: {
    backgroundColor: C.acento,
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 28,
    marginRight: 10,
    overflow: 'hidden',
  },
  ejercicioTitulo: { flex: 1, color: C.texto, fontSize: 15, fontWeight: '800' },
  ejercicioCuerpo: { paddingHorizontal: 14, paddingVertical: 8 },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.borde,
  },
  filaTexto: { flex: 1, color: C.suave, fontSize: 14, paddingRight: 8 },
  filaValor: { fontSize: 16, fontWeight: '800' },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.tarjeta,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.borde,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  datos: { flex: 1, paddingRight: 8 },
  titulo: { color: C.texto, fontSize: 17, fontWeight: '800', marginBottom: 4 },
  detalle: { color: C.suave, fontSize: 14 },
  circulo: { width: 88, height: 88, borderRadius: 44, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
  nota: { fontSize: 24, fontWeight: '900' },
  estado: { fontSize: 11, fontWeight: '700' },
  vacio: { color: C.suave, fontSize: 14, textAlign: 'center', paddingVertical: 8 },
});
