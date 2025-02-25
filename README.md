# Test wyswietlacza:
---
## Krok 1: Instalacja niezbędnych bibliotek

Zanim zaczniemy, musimy upewnić się, że wszystkie wymagane biblioteki są zainstalowane w Arduino IDE. Oto jak to zrobić:

1. Otwórz **Arduino IDE**.
2. Przejdź do **Plik > Preferencje**.
3. W polu **Dodatkowe menedżery płytek URL** dodaj:
   - Dla ESP32: `https://dl.espressif.com/dl/package_esp32_index.json`
   - Dla ESP8266: `http://arduino.esp8266.com/stable/package_esp8266com_index.json`
4. Zainstaluj odpowiednie płytki:
   - **ESP32**: **Narzędzia > Płytka > Menedżer płytek > ESP32**
   - **ESP8266**: **Narzędzia > Płytka > Menedżer płytek > ESP8266**

5. Zainstaluj bibliotekę dla wyświetlacza ILI9341:
   - Przejdź do **Szkic > Zarządzaj bibliotekami**.
   - Wyszukaj "Adafruit ILI9341" i zainstaluj tę bibliotekę.

6. Zainstaluj bibliotekę dla obsługi Wi-Fi:
   - **ESP32**: `WiFi.h`
   - **ESP8266**: `ESP8266WiFi.h`

## Krok 2: Wybór płytki

Wybierz odpowiednią płytkę w zależności od tego, czy używasz **ESP32** czy **ESP8266**.

1. **Dla ESP32**: 
   - Wybierz **Płytka > ESP32 Dev Module**.
2. **Dla ESP8266**:
   - Wybierz **Płytka > NodeMCU 1.0 (ESP-12E Module)**.

## Krok 3: Podłączenie wyświetlacza ILI9341

Podłącz wyświetlacz ILI9341 do płytki ESP32/ESP8266 zgodnie z poniższym schematem:

| Wyświetlacz ILI9341 | ESP32/ESP8266 |
|---------------------|---------------|
| VCC                 | 3V3           |
| GND                 | GND           |
| CS                  | D5            |
| RESET               | D4            |
| DC/RS               | D3            |
| SDI(MOSI)           | D23 (ESP32) / D7 (ESP8266) |
| SCK                 | D18 (ESP32) / D5 (ESP8266) |
| LED                 | 3V3 (opcjonalnie) |

## Krok 4: Kod źródłowy dla ESP32 i ESP8266

Teraz możemy przejść do wgrania programu, który ustawia ESP32/ESP8266 w trybie punktu AP (Access Point) i serwera WWW, a także wyświetla tekst na wyświetlaczu ILI9341.

### Wyjaśnienie kodu:

1. **Inicjalizacja wyświetlacza**: Ustawiamy wyświetlacz ILI9341, w tym piny CS, RESET i DC.
2. **Konfiguracja AP**: Ustawiamy ESP32/ESP8266 jako punkt dostępowy (AP), nadając mu nazwę sieci (`ESP_AP`) oraz hasło.
3. **Serwer WWW**: Tworzymy prosty serwer, który odpowiada na żądania HTTP i wysyła stronę HTML z formularzem, gdzie użytkownik może wpisać tekst.
4. **Wyświetlanie tekstu na ekranie**: Na wyświetlaczu ILI9341 wyświetlamy informacje o stanie, np. adres IP punktu AP.

## Krok 5: Wgrywanie programu

1. Podłącz ESP32/ESP8266 do komputera.
2. Wybierz odpowiednią płytkę w **Narzędzia > Płytka**.
3. Wybierz odpowiedni port w **Narzędzia > Port**.
4. Kliknij **Wgraj** w Arduino IDE.

## Krok 6: Testowanie

1. Po wgraniu programu, ESP32/ESP8266 powinien stworzyć punkt dostępowy (AP) o nazwie `ESP_AP`.
2. Podłącz się do tej sieci Wi-Fi z urządzenia (np. telefonu lub laptopa).
3. Otwórz przeglądarkę i przejdź do adresu: `http://192.168.4.1`.
4. Powinna pojawić się strona z formularzem, w którym można wpisać tekst.
5. Po wysłaniu formularza, ESP32/ESP8266 może wyświetlić na wyświetlaczu wprowadzony tekst lub inne informacje.

## Podsumowanie

W tym tutorialu przedstawiłem, jak wgrać program dla ESP32 i ESP8266, który obsługuje wyświetlacz ILI9341 oraz tworzy punkt AP z prostą stroną HTML. Dzięki temu możesz szybko uruchomić prosty interfejs do interakcji z użytkownikiem przez sieć Wi-Fi i przetestować płytkę.
