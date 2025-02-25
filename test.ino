#include <WiFi.h>           // Dla ESP32 użyj WiFi.h
#include <Adafruit_GFX.h>    // Biblioteka graficzna Adafruit
#include <Adafruit_ILI9341.h> // Biblioteka dla ILI9341

// Definicja pinów dla wyświetlacza ILI9341
#define TFT_CS    5
#define TFT_RST   4
#define TFT_DC    3

// Stworzenie obiektu wyświetlacza
Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC, TFT_RST);

// Parametry sieci AP
const char *ssid = "ESP32_AP";  // Nazwa sieci Wi-Fi (możesz zmienić)
const char *password = "123456789"; // Hasło do sieci

// Adres IP dla AP
IPAddress local_ip(192, 168, 4, 1);  // Statyczny IP dla ESP

// Port dla serwera
WiFiServer server(80);

void setup() {
  // Inicjalizacja monitora portu szeregowego
  Serial.begin(115200);
  
  // Inicjalizacja wyświetlacza
  tft.begin();
  tft.setRotation(3);
  tft.fillScreen(ILI9341_WHITE);
  tft.setTextColor(ILI9341_BLACK);
  tft.setTextSize(2);
  tft.setCursor(10, 10);
  tft.println("Inicjalizowanie AP...");

  // Uruchomienie trybu AP
  WiFi.softAP(ssid, password);
  WiFi.softAPConfig(local_ip, local_ip, IPAddress(255, 255, 255, 0));
  
  Serial.println("AP uruchomiony");
  Serial.print("Adres IP AP: ");
  Serial.println(WiFi.softAPIP());

  // Rozpoczęcie serwera
  server.begin();

  tft.setCursor(10, 50);
  tft.println("Adres IP AP:");
  tft.println(WiFi.softAPIP());
  delay(1000);
}

void loop() {
  // Czekamy na klientów
  WiFiClient client = server.available();
  if (client) {
    Serial.println("Nowy klient!");
    String currentLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        if (c == '\n') {
          if (currentLine.length() == 0) {
            // Wysyłamy stronę HTML
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: text/html");
            client.println("Connection: close");
            client.println();
            client.println("<!DOCTYPE HTML>");
            client.println("<html>");
            client.println("<body>");
            client.println("<h1>Wpisz tekst:</h1>");
            client.println("<form action='/' method='GET'>");
            client.println("<input type='text' name='text' />");
            client.println("<input type='submit' value='Wyślij' />");
            client.println("</form>");
            client.println("</body>");
            client.println("</html>");
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }
    // Oczyszczamy połączenie z klientem
    client.stop();
    Serial.println("Klient rozłączony");
  }
}
