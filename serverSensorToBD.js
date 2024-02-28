const btSerial = require("bluetooth-serial-port");
const mysql = require("mysql");

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "sensores",
};

// Crear el servidor Bluetooth
const btServer = new btSerial.BluetoothSerialPort();
const btAddress = "00:18:E5:04:56:15"; // Dirección MAC del módulo HC-05
const btChannel = 1; // Canal por defecto para el módulo HC-05

// Función para insertar datos en la tabla "sensores"
function insertDataIntoDatabase(token1, token2) {
  const dbConnection = mysql.createConnection(dbConfig);
  const sql =
    "INSERT INTO Historial (id_sensor, fecha_hora, val_numerico, unidades) VALUES (?, CURRENT_TIMESTAMP, ?, ?), (?, CURRENT_TIMESTAMP, ?, ?)";
  const sensorId1 = 1; // ID del primer sensor
  const sensorId2 = 2; // ID del segundo sensor
  const unidad1 = "%"; // Unidad de medida para la humedad
  const unidad2 = "°C"; // Unidad de medida para la temperatura
  const values = [sensorId1, token1, unidad1, sensorId2, token2, unidad2];

  dbConnection.connect((error) => {
    if (error) {
      console.error("Error al conectar a la base de datos:", error);
      return; // Salir de la función si hay un error de conexión
    }

    dbConnection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error al insertar datos en la base de datos:", error);
      } else {
        console.log("Datos insertados correctamente en la base de datos");
      }
      dbConnection.end(); // Cerrar la conexión después de la consulta
    });
  });
}

btServer.findSerialPortChannel(btAddress, function (channel) {
  btServer.connect(
    btAddress,
    btChannel,
    function () {
      console.log("Conectado al dispositivo Bluetooth");
      let buffer = "";

      btServer.on("data", function (data) {
        buffer += data.toString();
        const newlineIndex = buffer.indexOf("\n");

        if (newlineIndex !== -1) {
          
          const dataString = buffer.substring(0, newlineIndex).trim();
          buffer = buffer.substring(newlineIndex + 1);
          //console.log("Datos recibidos del Bluetooth:", dataString);
          //dividir en un arreglo los datos mandados via bluetoot separador por una coma
          //ejemplo 32.00,20.60,475,1.00
          if (dataString.length > 0) {
            const splitdata = dataString.split(",");
            const token1 = splitdata[0];
            const token2 = splitdata[1];

            console.log("-----------------------------------");
            console.log("Porcentaje de Humedad", token1, "%");
            console.log("Temperatura", token2, "°C");
            console.log("-----------------------------------");

            // Insertar datos en la base de datos
            insertDataIntoDatabase(token1, token2);
          } else {
            console.log("Datos vacíos recibidos del Bluetooth");
          }
        }
      });
    },
    function () {
      console.error("No se pudo conectar al dispositivo Bluetooth");
    }
  );
});
