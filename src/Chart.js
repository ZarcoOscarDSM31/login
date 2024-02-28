import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [], // Inicializamos las series como un arreglo vacío
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Tendencias de registros por mes',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: [] // Inicializamos las categorías como un arreglo vacío
        }
      },
    };
  }

  componentDidMount() {
    // Realizamos una llamada a la API para obtener los datos de la tabla 'historial'
    fetch('http://localhost:3000/historial')
      .then(response => response.json())
      .then(data => {
        const categories = [];
        const humidityData = [];
        const temperatureData = [];

        // Recorremos los datos obtenidos de la API
        data.forEach(item => {
          categories.push(item.fecha_hora); // Agregamos la fecha/hora como categoría en el eje x
          if (item.unidades === '%') {
            humidityData.push(item.val_numerico); // Si la unidad es '%', agregamos el valor a los datos de humedad
          } else if (item.unidades === '°C') {
            temperatureData.push(item.val_numerico); // Si la unidad es '°C', agregamos el valor a los datos de temperatura
          }
        });

        // Actualizamos el estado con los datos recopilados
        this.setState({
          series: [
            { name: "Porcentaje de Humedad", data: humidityData },
            { name: "Temperatura (°C)", data: temperatureData }
          ],
          options: {
            ...this.state.options,
            xaxis: { categories: categories }
          }
        });
      })
      .catch(error => console.error('Error al obtener los datos de la API:', error));
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
      </div>
    );
  }
}

export default ApexChart;
