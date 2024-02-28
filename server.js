const btSerial = require("bluetooth-serial-port");

// Crear el servidor Bluetooth
const btServer = new btSerial.BluetoothSerialPort();
const btAddress = "00:18:E5:04:56:15"; // Dirección MAC del módulo HC-05
const btChannel = 1; // Canal por defecto para el módulo HC-05

btServer.findSerialPortChannel(btAddress, function (channel) {
  btServer.connect(
    btAddress,
    btChannel,
    function () {
      console.log("Conectado al dispositivo Bluetooth");
      let buffer = ""; // Variable para almacenar datos parciales recibidos del Bluetooth
      btServer.on("data", function (data) {
        buffer += data.toString(); // Concatenar los datos recibidos al buffer
        // Buscar el carácter de nueva línea (\n) en el buffer
        const newlineIndex = buffer.indexOf("\n");
        // Si se encuentra el carácter de nueva línea
        if (newlineIndex !== -1) {
          // Extraer la cadena antes del carácter de nueva línea
          const dataString = buffer.substring(0, newlineIndex).trim();
          buffer = buffer.substring(newlineIndex + 1); // Eliminar la parte del buffer antes del carácter de nueva línea
          // Verificar la longitud mínima de los datos antes de imprimirlos
          if (dataString.length > 0) {
            //console.log("Datos recibidos del Bluetooth:", dataString);
            //dividir en un arreglo los datos mandados via bluetoot separador por una coma
            //ejemplo 32.00,20.60,475,1.00
            const splitdata = dataString.split(",");
            const token1 = splitdata[0]; //valor 0 humedad
            const token2 = splitdata[1]; //valor 1 Temperatura
            const token3 = splitdata[2]; //valor 2 Cantidad de Luz
            const token4 = splitdata[3]; //valor 3 Nivel de agua

            //agregar mas valores aqui
            //IMPRIMIR VALORES EN CONSOLA
            console.log("-----------------------------------");
            console.log("Porcentaje de Humedad", token1, "%");
            console.log("Temperatura", token2, "°C");
            console.log("Intencidad Luminica", token3, "Lumens");
            console.log("Nivel", token4, "");
            console.log("-----------------------------------");

            return token1, token2, token3, token4;
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
