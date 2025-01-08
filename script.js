// Funkcja do skanowania urządzeń Bluetooth
async function scanBluetoothDevices() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true
        });
        displayOutput(`<p>Bluetooth Device Found: ${device.name || 'Unknown Device'}</p>`);
    } catch (error) {
        displayOutput(`<p>Bluetooth scan failed: ${error.message}</p>`);
    }
}

// Funkcja do pobierania stacji radiowych na podstawie lokalizacji
async function getRadioStations(lat, lon) {
    try {
        const response = await fetch(`https://fr1.api.radio-browser.info/json/stations/bygeo?lat=${lat}&lon=${lon}`);
        const stations = await response.json();

        if (stations.length > 0) {
            displayOutput(`<h2>Nearby Radio Stations:</h2>`);
            stations.forEach(station => {
                displayOutput(`
                    <div class="station">
                        <p><strong>${station.name}</strong> (${station.country})</p>
                        <p>Stream: <a href="${station.url_resolved}" target="_blank">${station.url_resolved}</a></p>
                    </div>
                `);
            });
        } else {
            displayOutput("<p>No radio stations found nearby.</p>");
        }
    } catch (error) {
        displayOutput(`<p>Error fetching radio stations: ${error.message}</p>`);
    }
}

// Funkcja do pobierania lokalizacji użytkownika
function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            displayOutput(`<p>Your location: Lat ${lat}, Lon ${lon}</p>`);
            getRadioStations(lat, lon);
        }, error => {
            displayOutput(`<p>Error getting location: ${error.message}</p>`);
        });
    } else {
        displayOutput("<p>Geolocation is not supported by your browser.</p>");
    }
}

// Funkcja do wyświetlania danych na stronie
function displayOutput(data) {
    const output = document.getElementById('output');
    output.innerHTML += data;
}

// Obsługa przycisku do skanowania Bluetooth
document.getElementById('scan-bluetooth').addEventListener('click', scanBluetoothDevices);

// Obsługa przycisku do skanowania stacji radiowych
document.getElementById('scan-radio').addEventListener('click', getLocation);
