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

  // Rysowanie prostokąta
  tft.drawRect(20, 20, 100, 50, ILI9341_WHITE);  // (x, y, szerokość, wysokość, kolor)

  // Rysowanie wypełnionego prostokąta
  tft.fillRect(20, 100, 100, 50, ILI9341_RED);  // (x, y, szerokość, wysokość, kolor)

  // Rysowanie okręgu
  tft.drawCircle(160, 60, 30, ILI9341_BLUE);  // (x, y, promień, kolor)

  // Rysowanie wypełnionego okręgu
  tft.fillCircle(160, 160, 30, ILI9341_YELLOW);  // (x, y, promień, kolor)

  // Rysowanie linii
  tft.drawLine(10, 200, 300, 200, ILI9341_GREEN);  // (x1, y1, x2, y2, kolor)
}

void loop() {
  // Program nie robi nic w pętli
}
