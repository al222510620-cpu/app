import { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, RefreshControl} from 'react-native';
import { useDataResponse } from '../hooks/useDataResponse';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { appTheme } from '../theme/appTheme';
import { T } from '../theme/colors';

const C = {
  fondo: T.fondo,
  tarjeta: T.tarjeta,
  borde: T.borde,
  texto: T.texto,
  suave: T.suave,
  frio: T.secundario,
  calor: T.primario,
  top: '#4DB6AC',
  verde: T.acento,
  morado: '#7FB8C6',
};

export const DataResponseScreen = () => {
  const { isLoading, data, loadData } = useDataResponse();

  type Fecha = Date | string;
  type Punto = { value: number, label: string };

  const hora = (f: Fecha) => {
    const d = new Date(f);
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  const dia = (f: Fecha) => {
    const d = new Date(f);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  }

  const estiloEjes = {
    xAxisLabelTextStyle: { color: C.suave, fontSize: 10 }, 
    yAxisTextStyle: { color: C.suave, fontSize: 10 },
    xAxisColor: C.borde,
    yAxisColor: C.borde,
    rulesColor: C.borde,
    noOfSections: 4,
    isAnimated: true,
  };

  const Tarjeta = ({ titulo, subtitulo, children }: {
    titulo: string;
    subtitulo: string;
    children: ReactNode;
  }) => {
    return (
      <View
        style={ style.tarjeta }
      >
        <Text
          style={ style.titulo }
        >
          { titulo }
        </Text>
        <Text
          style={ style.sub }
        >
          { subtitulo }
        </Text>
        <View
          style={{ marginTop: 16 }}
        >
          { children }
        </View>
      </View>
    );
  }

  const Stat = ({ label, valor, color, unidad = '°C' }: {
    label: string;
    valor: number;
    color: string;
    unidad?: string;
  }) => {
    return ( 
      <View
        style={{
          ...style.stat,
          borderTopColor: color
        }}
      >
        <Text
          style={ style.statLabel }
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          { label }
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            ...style.statValor,
            backgroundColor: color
          }}
        >
          { Number.isFinite(Number(valor)) ? Number(valor).toFixed(1) : '--' } { unidad }
        </Text>
      </View>
    );
  }

  const GraficoLinea = ({ datos, color }: { datos: Punto[]; color: string }) => {

    const { width } = useWindowDimensions();

    return (
      <LineChart
        {...estiloEjes}
        data={datos}
        color={color}
        width={width - 122}
        adjustToWidth
        curved              
        areaChart           
        thickness={3} 
        startFillColor={color}      
        endFillColor={C.tarjeta}
        startOpacity={0.4}
        endOpacity={0.02}
        dataPointsColor={color}
        dataPointsRadius={3}
      />
    );
  };

  if(!data){
    return( 
      <View
        style={ appTheme.container }
      >
        <Text
          style={ appTheme.text }
        >
          Cargando...
        </Text>
      </View>
    );
  }

  const { total, estadistica }= data;

  const temperatura = data.ultimasHoras.map(a => ({
    value: Number(a.temperatura_celcius),
    label: hora(a.fecha),
  }));

  const distancia = data.ultimasHoras.map(a => ({
    value: Number(a.distancia_cm),
    label: hora(a.fecha),
  }));

  const diasFrios = data.diasFrios.map(d => ({
    value: Number(d.promedio),
    label: dia(d.dia),
  }));

  const diasCalurosos = data.diasCalurosos.map(d => ({
    value: Number(d.promedio),
    label: dia(d.dia),
  }));

  const top = data.topTemperaturas.map(a => ({
    value: Number(a.temperatura_celcius),
    label: hora(a.fecha),
  }));

  const lecturasPorDia = [
    { value: data.hoy.length, color: C.verde, label: 'Hoy' },
    { value: data.ayer.length, color: C.top, label: 'Ayer' },
    { value: data.anteayer.length, color: C.morado, label: 'Antier' },
  ];

  return(
    <ScrollView
      scrollEnabled={ true }
      style={ style.pantalla }
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadData}
          tintColor={C.frio}
          colors={[ C.frio ]}
          progressBackgroundColor={ C.tarjeta }
        />
      }
    >
      <View>
        <Text style={style.header}>Monitor del sensor</Text>
        <Text style={style.sub}>{total} lecturas registradas</Text>
      </View>

      <View style={style.fila}>
        <Stat label="Promedio" valor={estadistica.temp_promedio} color={C.verde} />
        <Stat label="Mínima" valor={estadistica.temp_minima} color={C.frio} />
        <Stat label="Máxima" valor={estadistica.temp_maxima} color={C.calor} />
      </View>

      <Tarjeta titulo="Temperatura" subtitulo="Últimas 6 horas (°C)">
        <GraficoLinea datos={temperatura} color={C.calor} />
      </Tarjeta>

      <View style={[style.fila, { marginTop: 16 }]}>
        <Stat label="Dist. prom." valor={estadistica.dist_promedio} color={C.verde} unidad="cm" />
        <Stat label="Dist. mín." valor={estadistica.dist_minima} color={C.frio} unidad="cm" />
        <Stat label="Dist. máx." valor={estadistica.dist_maxima} color={C.calor} unidad="cm" />
      </View>

      <Tarjeta
        titulo="Distancia"
        subtitulo="Últimas lecturas (cm)"
      >
        <GraficoLinea datos={distancia} color={C.verde} />
      </Tarjeta>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  pantalla: { flex:1, backgroundColor: C.fondo },
  centro: { justifyContent: 'center', alignItems: 'center' },
  header: { color: C.texto, fontSize: 13 },
  sub: { color: C.texto, fontSize: 26, fontWeight: "bold" },
  fila: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, backgroundColor: C.tarjeta, borderRadius: 12, borderTopWidth: 3, padding: 12 },
  statValor: { color: T.blanco, fontSize: 18, fontWeight: 'bold', marginTop: 4, borderRadius: 6, paddingHorizontal: 4, textAlign: 'center' },
  statLabel: { color: C.suave, fontSize: 13, fontWeight: '600' },
  tarjeta: {
    backgroundColor: C.tarjeta,
    borderColor: C.borde,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 16,
    marginTop: 16
  },
  titulo: { color: C.texto, fontSize: 17, fontWeight: 'bold' },
  leyenda: { flexDirection: 'row', textAlign: 'center', gap: 6 },
  punto: { width: 10, height: 10, borderRadius: 5 }
});
