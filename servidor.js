const btSerial = require('bluetooth-serial-port');
const WebSocket = require('ws');

// Configurar el servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });
// Función para analizar la cadena de datos y extraer humedad y temperatura
function parseDataString(dataString) {
    console.log('Datos recibidos:', dataString); // Para depuración

    const lines = dataString.trim().split('...'); // Dividir las líneas utilizando el marcador
    const parsedData = [];

    lines.forEach(line => {
        const parts = line.trim().split(',');
        if (parts.length === 2) {
            const humidity = parseFloat(parts[0]);
            const temperature = parseFloat(parts[1]);

            if (!isNaN(humidity) && !isNaN(temperature)) {
                parsedData.push({ humidity, temperature });
            } else {
                console.error('Error: Valores de humedad o temperatura no numéricos:', parts[0], parts[1]);
            }
        } else {
            console.error('Error: Datos incompletos o en formato incorrecto:', line);
        }
    });

    return parsedData;
}

// Función para enviar datos a todos los clientes WebSocket
function enviarDatosWebSocket(dataString) {
    const parsedData = parseDataString(dataString);
    if (parsedData) {
        const { humidity, temperature } = parsedData;
        const data = { humidity, temperature };
    
        wss.clients.forEach(function(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
}



// Crear el servidor Bluetooth
const btServer = new btSerial.BluetoothSerialPort();
const btAddress = '00:18:E5:04:56:15'; // Dirección MAC del módulo HC-05
const btChannel = 1; // Canal por defecto para el módulo HC-05

btServer.findSerialPortChannel(btAddress, function(channel) {
    btServer.connect(btAddress, btChannel, function() {
        console.log('Conectado al dispositivo Bluetooth');

        btServer.on('data', function(buffer) {
            const dataString = buffer.toString(); // Convertir el buffer a cadena de texto
            enviarDatosWebSocket(dataString); // Enviar datos al cliente WebSocket
        });
    }, function() {
        console.error('No se pudo conectar al dispositivo Bluetooth');
    });
});

// Manejar conexiones WebSocket
wss.on('connection', function(ws) {
    console.log('Cliente WebSocket conectado');
});
