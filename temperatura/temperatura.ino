#include <SoftwareSerial.h>

#include <DHT.h>


#define DHTPIN 3       // Pin digital al que está conectado el sensor DHT11
#define DHTTYPE DHT11  // Tipo de sensor DHT

DHT dht(DHTPIN, DHTTYPE);
SoftwareSerial BTSerial(0, 1); // RX (0) y TX (1) para Bluetooth

void setup() {
  Serial.begin(9600);   // Iniciar comunicación serial con la consola
  BTSerial.begin(9600); // Iniciar comunicación serial con Bluetooth
  dht.begin();          // Iniciar el sensor DHT
}

void loop() {
 delay(900000); //15 MIN

  float humidity = dht.readHumidity();          // Leer humedad relativa
  float temperatureC = dht.readTemperature();   // Leer temperatura en grados Celsius
  float temperatureF = dht.readTemperature(true);  // Leer temperatura en grados Fahrenheit

  if (isnan(humidity) || isnan(temperatureC) || isnan(temperatureF)) {
    Serial.println("Error al leer datos del sensor DHT11");
    return;
  }

  float heatIndexF = dht.computeHeatIndex(temperatureF, humidity);   // Calcular índice de calor en Fahrenheit
  float heatIndexC = dht.computeHeatIndex(temperatureC, humidity, false); // Calcular índice de calor en Celsius

  // Imprimir datos por consola

Serial.print(humidity);
Serial.print(",");
Serial.println(temperatureC);







}
