
# Test wyswietlacza:
---
## Krok 1: Instalacja sterowników z plików ZIP

### 1.1 Instalacja sterowników na systemie Windows

1. **Rozpakowanie pliku ZIP**:
   - Rozpakuj plik ZIP, który zawiera sterowniki dla Twojego urządzenia (ESP32/ESP8266), do dogodnej lokalizacji na komputerze.

2. **Podłączenie ESP32/ESP8266**:
   - Podłącz płytkę ESP32 lub ESP8266 do portu USB w komputerze.

3. **Instalacja sterowników**:
   - Wejdź w **Menedżer urządzeń** na komputerze.
     - Aby to zrobić, naciśnij `Win + X`, a następnie wybierz **Menedżer urządzeń**.
   - W Menedżerze urządzeń znajdź swoje urządzenie (np. **ESP32** lub **ESP8266**). Pojawi się ono jako "Nieznane urządzenie" lub pod nazwą **CP210x USB to UART Bridge**.
   - Kliknij prawym przyciskiem myszy na nazwę urządzenia i wybierz **Zainstaluj sterownik** lub **Aktualizuj sterownik**.
   - Wybierz opcję **Wyszukaj sterowniki na moim komputerze**.
   - Wskaż folder, w którym rozpakowałeś plik ZIP z sterownikami.

4. **Zakończenie instalacji**:
   - Po zakończeniu instalacji sterowników urządzenie powinno zostać poprawnie rozpoznane w Menedżerze urządzeń.
   - Upewnij się, że urządzenie nie ma już żółtego wykrzyknika przy nazwie (co wskazywałoby na problem z instalacją sterownika).

### 1.2 Instalacja sterowników na systemie macOS

1. **Rozpakowanie pliku ZIP**:
   - Rozpakuj plik ZIP z sterownikami w dowolnym folderze.

2. **Podłączenie ESP32/ESP8266**:
   - Podłącz płytkę do portu USB w komputerze.

3. **Instalacja sterowników**:
   - Na macOS sterowniki mogą być zainstalowane automatycznie, ale w przypadku problemów musisz zainstalować odpowiednią wersję sterownika **CP210x** lub **CH340**.
   - Jeśli sterowniki nie zostały zainstalowane automatycznie, możesz zainstalować je ręcznie:
     - Dla **ESP32** użyj sterownika **CP210x**: [Sterowniki CP210x dla macOS](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers).
     - Dla **ESP8266** użyj sterownika **CH340**: [Sterowniki CH340 dla macOS](http://www.wch.cn/downloads/CH341SER_MAC_ZIP.html).

### 1.3 Instalacja sterowników na systemie Linux

1. **Rozpakowanie pliku ZIP**:
   - Rozpakuj plik ZIP z sterownikami w dowolnym folderze.

2. **Podłączenie ESP32/ESP8266**:
   - Podłącz płytkę do portu USB w komputerze.

3. **Instalacja sterowników**:
   - Na większości dystrybucji Linux, sterowniki dla urządzeń takich jak **CP210x** i **CH340** są już zainstalowane domyślnie. Jeśli urządzenie nie jest rozpoznawane, wykonaj następujące kroki:
     - Dla **ESP32**: Zainstaluj sterownik **CP210x** za pomocą terminala:
       ```bash
       sudo apt-get install cp210x
       ```
     - Dla **ESP8266**: Zainstaluj sterownik **CH340**:
       ```bash
       sudo apt-get install ch340
       ```

4. **Testowanie połączenia**:
   - Sprawdź, czy ESP32/ESP8266 jest widoczny na liście urządzeń:
     ```bash
     ls /dev/tty*
     ```
   - Upewnij się, że urządzenie jest widoczne jako `/dev/ttyUSB0` lub `/dev/ttyAMA0`.

## Krok 2: Instalacja niezbędnych bibliotek

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

## Krok 3: Wybór płytki

Wybierz odpowiednią płytkę w zależności od tego, czy używasz **ESP32** czy **ESP8266**.

1. **Dla ESP32**: 
   - Wybierz **Płytka > ESP32 Dev Module**.
2. **Dla ESP8266**:
   - Wybierz **Płytka > NodeMCU 1.0 (ESP-12E Module)**.

## Krok 4: Podłączenie wyświetlacza ILI9341

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

## Krok 5: Kod źródłowy dla ESP32 i ESP8266

Teraz możemy przejść do wgrania programu, który ustawia ESP32/ESP8266 w trybie punktu AP (Access Point) i serwera WWW, a także wyświetla tekst na wyświetlaczu ILI9341.

### Wyjaśnienie kodu:

1. **Inicjalizacja wyświetlacza**: Ustawiamy wyświetlacz ILI9341, w tym piny CS, RESET i DC.
2. **Konfiguracja AP**: Ustawiamy ESP32/ESP8266 jako punkt dostępowy (AP), nadając mu nazwę sieci (`ESP_AP`) oraz hasło.
3. **Serwer WWW**: Tworzymy prosty serwer, który odpowiada na żądania HTTP i wysyła stronę HTML z formularzem, gdzie użytkownik może wpisać tekst.
4. **Wyświetlanie tekstu na ekranie**: Na wyświetlaczu ILI9341 wyświetlamy informacje o stanie, np. adres IP punktu AP.

## Krok 6: Wgrywanie programu

1. Podłącz ESP32/ESP8266 do komputera.
2. Wybierz odpowiednią płytkę w **Narzędzia > Płytka**.
3. Wybierz odpowiedni port w **Narzędzia > Port**.
4. Kliknij **Wgraj** w Arduino IDE.

## Krok 7: Testowanie

1. Po wgraniu programu, ESP32/ESP8266 powinien stworzyć punkt dostępowy (AP) o nazwie `ESP_AP`.
2. Podłącz się do tej sieci Wi-Fi z urządzenia (np. telefonu lub laptopa).
3. Otwórz przeglądarkę i przejdź do adresu: `http://192.168.4.1`.
4. Powinna pojawić się strona z formularzem, w którym można wpisać tekst.
5. Po wysłaniu formularza, ESP32/ESP8266 może wyświetlić na wyświetlaczu wprowadzony tekst lub inne informacje.
---
# Finalne testy i debugowanie

- Jeśli po zainstalowaniu sterowników i wgraniu programu pojawią się problemy, sprawdź:
  - Połączenie USB (sprawdź kable i porty).
  - Ustawienia w **Arduino IDE** (płytka i port).
  - Jeśli pojawiają się komunikaty o błędach, poszukaj ich w dokumentacji i forach społecznościowych, np. na [StackOverflow](https://stackoverflow.com/) lub [forum Arduino](https://forum.arduino.cc/).
---
## Podsumowanie

W tym tutorialu przedstawiłem, jak wgrać program dla ESP32 i ESP8266, który obsługuje wyświetlacz ILI9341 oraz tworzy punkt AP z prostą stroną HTML. Dzięki temu możesz szybko uruchomić prosty interfejs do interakcji z użytkownikiem przez sieć Wi-Fi i przetestować płytkę.
