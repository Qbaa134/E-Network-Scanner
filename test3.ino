#include <Wire.h>
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

// Definicje pinów
#define TFT_CS     5
#define TFT_RST    4
#define TFT_DC     3

// Inicjalizacja ekranu ILI9341
Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC, TFT_RST);

void setup() {
  // Inicjalizacja komunikacji z wyświetlaczem
  Serial.begin(115200);
  tft.begin();
  
  // Wyczyść ekran i ustaw tło
  tft.fillScreen(ILI9341_BLACK);

  // Ustawienia tekstu
  tft.setTextColor(ILI9341_WHITE);
  tft.setTextSize(2);  // Rozmiar tekstu
  tft.setCursor(10, 10);  // Ustawienie kursora (pozycja tekstu)

  // Wyświetlenie tekstu na ekranie
  tft.println("Hello, ILI9341!");
  tft.setCursor(10, 40);
  tft.println("ESP32/ESP8266 Test");
}

void loop() {
  // Program nie robi nic w pętli
}
