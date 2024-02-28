// Importar el módulo bluetooth-serial-port que permite la comunicación Bluetooth desde Node.js
const BluetoothSerialPort = require('bluetooth-serial-port');

// Crear una nueva instancia de BluetoothSerialPort para interactuar con dispositivos Bluetooth
const btSerial = new BluetoothSerialPort.BluetoothSerialPort();

// Dirección MAC del módulo HC-05 (debes reemplazarlo con la dirección MAC correcta de tu dispositivo)
const hc05Address = '98:D3:41:F6:C8:7E';

// Función para conectar con el dispositivo Bluetooth HC-05
function connectToHC05() {
    // Imprimir un mensaje indicando que se está intentando conectar al dispositivo Bluetooth
    console.log('Intentando conectar al dispositivo Bluetooth...');

    // Buscar el canal del puerto serie del dispositivo Bluetooth HC-05
    btSerial.findSerialPortChannel(hc05Address, function(channel) {
        // Imprimir el canal del puerto serie encontrado
        console.log('Canal encontrado:', channel);
        
        // Imprimir un mensaje indicando que se está conectando al dispositivo Bluetooth
        console.log('Conectando al dispositivo Bluetooth...');

        // Conectar al dispositivo Bluetooth HC-05 utilizando su dirección MAC y el canal del puerto serie
        btSerial.connect(hc05Address, channel, function() {
            // Imprimir un mensaje indicando que se ha establecido la conexión correctamente
            console.log('Conectado al dispositivo Bluetooth');
            
            // No es necesario realizar ninguna acción adicional aquí, ya que la recepción de datos se maneja por separado
        }, function(err) {
            // En caso de error al conectar, imprimir el error
            console.error('No se pudo conectar al dispositivo Bluetooth: ', err);
        });
    }, function(err) {
        // En caso de error al encontrar el canal del puerto serie, imprimir el error
        console.error('No se pudo encontrar el canal del puerto serie del dispositivo Bluetooth: ', err);
    });
}

// Evento que se activa cuando se encuentra un dispositivo Bluetooth durante la búsqueda
btSerial.on('found', function(address, name) {
    // Imprimir el nombre y la dirección MAC del dispositivo Bluetooth encontrado
    console.log('Dispositivo Bluetooth encontrado:', name, address);
    
    // Llamar a la función para conectar con el dispositivo Bluetooth
    connectToHC05();
});

// Evento de datos recibidos desde el dispositivo Bluetooth
btSerial.on('data', function(buffer) {
    // Imprimir los datos recibidos del Arduino convertidos a formato de cadena UTF-8
    console.log('Datos recibidos del Arduino: ', buffer.toString('utf-8'));
    
    // Debug: Verificar si los datos fueron recibidos correctamente
    if (buffer.length > 0) {
        console.log('Datos recibidos correctamente.');
    } else {
        console.log('No se recibieron datos o los datos están vacíos.');
    }

    // Debug: Verificar si los datos están en un formato específico (caso 2: valor numérico)
    let numericData = parseFloat(buffer.toString('utf-8'));
    if (!isNaN(numericData)) {
        console.log('Datos numéricos recibidos:', numericData);
    } else {
        console.log('Los datos no son numéricos.');
    }

    // Debug: Verificar si los datos contienen un prefijo específico (caso 3: prefijo "DIST:")
    if (buffer.toString('utf-8').startsWith('DIST:')) {
        let distance = buffer.toString('utf-8').substring(5); // Eliminar el prefijo "DIST:"
        console.log('Distancia recibida:', distance);
    } else {
        console.log('Los datos no contienen el prefijo esperado.');
    }
});

// Iniciar la búsqueda de dispositivos Bluetooth
btSerial.inquire();
